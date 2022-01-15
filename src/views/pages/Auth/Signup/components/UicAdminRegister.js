import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import { ErrorAlert } from '../../../../../components/Alerts';
import { TextInput, PasswordInput, PhoneInput } from '../../components/Inputs';
// import { BlackButton, GrayButton } from '../../components/Buttons';
import { BlackButton } from '../../components/Buttons';

import { adminSignup } from '../../../../../apis/auth';
import { validateEmail } from '../../../../../utils';
import { useAppContext } from '../../../../../context/AppContext';

const RegisterContainer = styled(Box)({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  '-ms-overflow-style': 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const UicAdminRegister = ({ text, invite_code, user_type, STEP, step, setStep }) => {
  const { setLoading, setMessage } = useAppContext();

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

  const handleChange = (prop, value) => {
    setValidations(prevState => ({ ...prevState, [prop]: '' }));
    setValues(prevState => ({ ...prevState, [prop]: value }));
  };

  const handleSignup = () => {
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
    else {
      setLoading(true);
      adminSignup({ ...values, invite_code, user_type }).then(res => {
        setLoading(false);
        setStep(step + 1);
      }).catch(err => {
        setMessage({ open: true, title: text.error, description: text.invitationIncorrect });
        setLoading(false);
      });
    }
  };

  return (
    <RegisterContainer>
      {step === STEP.ONE ? (
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
            <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleSignup()}>{text.continue}</BlackButton>
          </div>
          <div className="mt-4 w-full flex justify-center">
            <span className="text-gray-400">{text.haveAccount} <Link className="underline" to="/auth/login">{text.signin}</Link></span>
          </div>
        </>
      ) : step === STEP.TWO ? (
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
            <GrayButton variant="contained" size="large" className="w-full" onClick={() => handleSignup()}>{text.resendLink}</GrayButton>
          </div> */}
        </>
      ) : (
        <>
          <div className="w-full">
            <span className="text-gray-400">{text.invitationIncorrect}</span>
          </div>
          <div className="mt-8 w-full flex justify-center">
            <span className="text-gray-400">{text.haveAccount} <Link className="underline" to="/auth/login">{text.signin}</Link></span>
          </div>
        </>
      )}
    </RegisterContainer>
  );
}

export default UicAdminRegister;
