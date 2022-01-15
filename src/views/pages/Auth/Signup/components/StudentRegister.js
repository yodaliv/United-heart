import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Box, Select } from '@material-ui/core';

import { ErrorAlert } from '../../../../../components/Alerts';
import { TextInput, PasswordInput, SelectInput, PhoneInput } from '../../components/Inputs';
import { BlackButton } from '../../components/Buttons';
import { StudentRegisterStepper } from './Steppers';

import { getUICOrganization, getOrganizations } from '../../../../../apis/organization';
import { studentSignup } from '../../../../../apis/auth';
import { validateEmail } from '../../../../../utils';
import { useAppContext } from '../../../../../context/AppContext';

const RegisterContainer = styled(Box)({
  width: '100%',
  height: 'calc(100% - 24px)',
  overflowY: 'auto',
  '-ms-overflow-style': 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

function StudentRegister({ text, STEP, step, setStep, progress, setProgress }) {
  const { setLoading, setMessage } = useAppContext();

  const [orgs, setOrgs] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    occupation: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });
  const [validations, setValidations] = useState({
    firstname: '',
    lastname: '',
    email: '',
    occupation: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState(null);

  const loadOrgs = useCallback((org_id, level) => {
    setLoading(true);
    getOrganizations(org_id).then(res => {
      if (res.length > 0) {
        if (level === 0) {
          setOrgs([{ selected: '', values: res }]);
        } else {
          setOrgs(prevState => [...prevState.slice(0, level), { selected: '', values: res }]);
        }
      } else {
        setOrgs(prevState => prevState.slice(0, level));
      }

      setLoading(false);
    }).catch(err => {
      setOrgs(prevState => prevState.slice(0, level));

      setLoading(false);
      setMessage({ open: true, title: text.error, description: text.failedLoadOrgs });
    });
  }, [text, setLoading, setMessage]);

  const loadData = useCallback(() => {
    setLoading(true);
    getUICOrganization().then(res => {
      loadOrgs(res.id, null);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedLoadOrgs });
      setLoading(false);
    });
  }, [text, loadOrgs, setLoading, setMessage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onChangeOrg = (val, idx) => {
    setSelectedOrg(val);
    setOrgs(orgs.map((org, index) => index === idx ? ({ ...org, selected: val }) : org));
    loadOrgs(val, idx + 1);
  };

  const handleChange = (prop, value) => {
    setValidations(prevState => ({ ...prevState, [prop]: '' }));
    setValues(prevState => ({ ...prevState, [prop]: value }));
  };

  const handleSignUp = () => {
    setLoading(true);
    const params = {
      org_id: selectedOrg,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      occupation: values.occupation,
      phone_number: values.phone_number,
      password: values.password,
    };
    studentSignup(params).then(res => {
      setLoading(false);
      setStep(step + 1);
    }).catch(err => {
      const detail = err?.response?.data?.detail;
      if (detail?.error_code) {
        setError(text.failedRegister);
      } else {
        setMessage({ open: true, title: text.error, description: text.serviceUnavailable });
      }
      setLoading(false);
    });
  };

  const handleContinue = () => {
    switch (step) {
      case STEP.ONE:
        setStep(step + 1);
        setProgress(progress + 1);

        break;
      case STEP.TWO:
        if (values.firstname === '') setValidations(prevState => ({ ...prevState, firstname: 'has-empty' }));
        else if (values.lastname === '') setValidations(prevState => ({ ...prevState, lastname: 'has-empty' }));
        else if (values.email === '') setValidations(prevState => ({ ...prevState, email: 'has-empty' }));
        else if (!validateEmail(values.email)) setValidations(prevState => ({ ...prevState, email: 'has-error' }));
        else if (values.occupation === '') setValidations(prevState => ({ ...prevState, occupation: 'has-empty' }));
        else if (values.phone_number === '') setValidations(prevState => ({ ...prevState, phone_number: 'has-empty' }));
        else if (values.phone_number.length < 10) setValidations(prevState => ({ ...prevState, phone_number: 'has-error' }));
        else if (values.password === '') setValidations(prevState => ({ ...prevState, password: 'has-empty' }));
        else if (values.confirm_password === '') setValidations(prevState => ({ ...prevState, confirm_password: 'has-empty' }));
        else if (values.password !== values.confirm_password) setValidations(prevState => ({ ...prevState, confirm_password: 'has-error' }));
        else if (values.password.length < 6) setValidations(prevState => ({ ...prevState, password: 'has-error' }));
        else handleSignUp();

        break;
      default:
        break;
    }
  };

  return (
    <>
      <RegisterContainer>
        {step === STEP.ONE && (
          <>
            <div className="w-full">
              <p className="text-3xl font-semibold">{text.signup}</p>
            </div>
            <div className="mt-4 w-full">
              <p className="text-gray-400">{text.selectOrganization}</p>
            </div>
            {orgs.map((org, index) => (
              <div key={index} className="mt-4 w-full">
                <Select
                  native
                  value={org.selected}
                  input={<SelectInput />}
                  onChange={e => onChangeOrg(parseInt(e.target.value), index)}
                >
                  {org.values.map((group, index) => (
                    <optgroup key={index} label={group.org_type_name}>
                      {group.organizations.map((subOrg, idx) => (
                        <option key={idx} value={subOrg.id}>{subOrg.org_name}</option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="" hidden />
                </Select>
              </div>
            ))}
            <div className="mt-9 w-full">
              <BlackButton variant="contained" size="large" className="w-full" disabled={!Boolean(selectedOrg)} onClick={() => handleContinue()}>{text.continue}</BlackButton>
            </div>
          </>
        )}
        {step === STEP.TWO && (
          <>
            <div className="w-full">
              <p className="text-3xl font-semibold">{text.registration}</p>
            </div>
            <div className="mt-10 w-full">
              {error && <ErrorAlert severity="error" onClose={() => setError(null)}>{error}</ErrorAlert>}
            </div>
            <div className="mt-6 w-full">
              <TextInput
                label={text.firstname}
                value={values.firstname}
                onChange={val => handleChange('firstname', val)}
                error={validations.firstname !== ''}
                helperText={validations.firstname === 'has-empty' ? text.fieldRequired : ''}
              />
            </div>
            <div className="mt-6 w-full">
              <TextInput
                label={text.lastname}
                value={values.lastname}
                onChange={val => handleChange('lastname', val)}
                error={validations.lastname !== ''}
                helperText={validations.lastname === 'has-empty' ? text.fieldRequired : ''}
              />
            </div>
            <div className="mt-6 w-full">
              <TextInput
                label={text.email}
                value={values.email}
                onChange={val => handleChange('email', val)}
                error={validations.email !== ''}
                helperText={validations.email === 'has-empty' ? text.fieldRequired : validations.email === 'has-error' ? text.emailInvalid : ''}
              />
            </div>
            <div className="mt-6 w-full">
              <TextInput
                label={text.occupation}
                value={values.occupation}
                onChange={val => handleChange('occupation', val)}
                error={validations.occupation !== ''}
                helperText={validations.occupation === 'has-empty' ? text.fieldRequired : ''}
              />
            </div>
            <div className="mt-6 w-full">
              <PhoneInput
                label={text.phone}
                value={values.phone_number}
                onChange={val => handleChange('phone_number', val.replace(/[^0-9]/g, ''))}
                error={validations.phone_number !== ''}
                errorMessage={validations.phone_number === 'has-empty' ? text.fieldRequired : text.phoneInvalid}
              />
            </div>
            <div className="mt-6 w-full">
              <PasswordInput
                label={text.password}
                value={values.password}
                onChange={val => handleChange('password', val)}
                error={validations.password !== ''}
                helperText={validations.password === 'has-empty' ? text.fieldRequired : validations.password === 'has-error' ? text.passwordInvalid : ''}
              />
            </div>
            <div className="mt-6 w-full">
              <PasswordInput
                label={text.confirmPassword}
                value={values.confirm_password}
                onChange={val => handleChange('confirm_password', val)}
                error={validations.confirm_password !== ''}
                helperText={validations.confirm_password === 'has-empty' ? text.fieldRequired : validations.confirm_password === 'has-error' ? text.confirmPasswordInvalid : ''}
              />
            </div>
            <div className="mt-6 w-full">
              <span className="text-gray-400">{text.agreeTo} <Link className="underline" to="/terms">{text.terms}</Link> {text.and} <Link className="underline" to="/privacy">{text.privacy}</Link>.</span>
            </div>
            <div className="mt-9 w-full">
              <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleContinue()}>{text.continue}</BlackButton>
            </div>
            <div className="mt-4 w-full flex justify-center">
              <span className="text-gray-400">{text.haveAccount} <Link className="underline" to="/auth/login">{text.signin}</Link></span>
            </div>
          </>
        )}
        {step === STEP.THREE && (
          <>
            <div className="w-full">
              <p className="text-3xl font-semibold">{text.thankyou}</p>
            </div>
            <div className="mt-4 w-full">
              <p className="text-gray-400">{text.linkSent}</p>
            </div>
            <div className="mt-4 w-full">
              <p className="text-gray-400">{text.checkEmail}</p>
            </div>
            {/* <div className="mt-14 w-full">
              <GrayButton variant="contained" size="large" className="w-full" onClick={() => handleContinue()}>{text.resendLink}</GrayButton>
            </div> */}
          </>
        )}
      </RegisterContainer>
      <div className="mt-8">
        <StudentRegisterStepper step={progress} />
      </div>
    </>
  );
}

export default StudentRegister;
