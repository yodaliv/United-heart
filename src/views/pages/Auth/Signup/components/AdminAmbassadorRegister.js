import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import { ErrorAlert } from '../../../../../components/Alerts';
import { TextInput, PasswordInput, PhoneInput, CodeInput } from '../../components/Inputs';
// import { BlackButton, GrayButton } from '../../components/Buttons';
import { BlackButton } from '../../components/Buttons';
import { AdminAmbassadorRegisterStepper } from './Steppers';

import { signup, sendSMS, verifyPhone, setupPassword } from '../../../../../apis/auth';
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

function AdminAmbassadorRegister({ text, invite_code, STEP, step, setStep, progress, setProgress, history }) {
  const { setLoading, setMessage } = useAppContext();

  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    occupation: '',
    phone_number: '',
    code: '',
    password: '',
    confirm_password: '',
  });
  const [validations, setValidations] = useState({
    firstname: '',
    lastname: '',
    email: '',
    occupation: '',
    phone_number: '',
    code: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (prop, value) => {
    setValidations(prevState => ({ ...prevState, [prop]: '' }));
    setValues(prevState => ({ ...prevState, [prop]: value }));
  };

  const handleSignUp = () => {
    setLoading(true);
    const params = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      occupation: values.occupation,
      invite_code: invite_code || '',
    };
    signup(params).then(res => {
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

  const handleSendSMS = () => {
    setLoading(true);
    const params = {
      phone_number: values.phone_number,
      invite_code: invite_code || '',
    };
    sendSMS(params).then(res => {
      setLoading(false);
      setStep(step + 1);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedSendSMS });
      setLoading(false);
    });
  };

  const handleVerifyPhone = () => {
    setLoading(true);
    const params = {
      phone_number: values.phone_number,
      verify_code: values.code,
      invite_code: invite_code || '',
    };
    verifyPhone(params).then(res => {
      setLoading(false);
      setStep(step + 1);
      setProgress(progress + 1);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedVerifyPhone });
      setLoading(false);
    });
  };

  const handleSetupPassword = () => {
    setLoading(true);
    const params = {
      password: values.password,
      invite_code: invite_code || '',
    };
    setupPassword(params).then(res => {
      setLoading(false);
      setStep(step + 1);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.failedSetupPassword });
      setLoading(false);
    });
  };

  const handleContinue = () => {
    switch (step) {
      case STEP.ONE:
        if (values.firstname === '') setValidations(prevState => ({ ...prevState, firstname: 'has-empty' }));
        else if (values.lastname === '') setValidations(prevState => ({ ...prevState, lastname: 'has-empty' }));
        else if (values.email === '') setValidations(prevState => ({ ...prevState, email: 'has-empty' }));
        else if (!validateEmail(values.email)) setValidations(prevState => ({ ...prevState, email: 'has-error' }));
        else if (values.occupation === '') setValidations(prevState => ({ ...prevState, occupation: 'has-empty' }));
        else handleSignUp();

        break;
      case STEP.TWO:
        handleSignUp();

        break;
      case STEP.THREE:
        setStep(STEP.FOUR);
        setProgress(progress + 1);

        break;
      case STEP.FOUR:
        if (values.phone_number === '') setValidations(prevState => ({ ...prevState, phone_number: 'has-empty' }));
        else if (values.phone_number.length < 10) setValidations(prevState => ({ ...prevState, phone_number: 'has-error' }));
        else handleSendSMS();

        break;
      case STEP.FIVE:
        if (values.code.length < 6) setValidations(prevState => ({ ...prevState, code: 'has-error' }));
        else handleVerifyPhone();

        break;
      case STEP.SIX:
        if (values.password === '') setValidations(prevState => ({ ...prevState, password: 'has-empty' }));
        else if (values.confirm_password === '') setValidations(prevState => ({ ...prevState, confirm_password: 'has-empty' }));
        else if (values.password !== values.confirm_password) setValidations(prevState => ({ ...prevState, confirm_password: 'has-error' }));
        else if (values.password.length < 6) setValidations(prevState => ({ ...prevState, password: 'has-error' }));
        else handleSetupPassword();

        break;
      case STEP.SEVEN:
        history.push('/auth/login');

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
        {step === STEP.TWO && (
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
        {step === STEP.THREE && (
          <>
            <div className="w-full">
              <p className="text-3xl font-semibold">{text.emailVerified}</p>
            </div>
            <div className="mt-4 w-full">
              <p className="text-gray-400">{text.emailVerifiedSuccess}</p>
            </div>
            <div className="mt-14 w-full">
              <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleContinue()}>{text.continue}</BlackButton>
            </div>
          </>
        )}
        {step === STEP.FOUR && (
          <>
            <div className="w-full">
              <p className="text-3xl font-semibold">{text.smsVerification}</p>
            </div>
            <div className="mt-4 w-full">
              <p className="text-gray-400">{text.enterPhoneNumber}:</p>
            </div>
            <div className="mt-14 w-full">
              <PhoneInput
                label={text.phone}
                value={values.phone_number}
                onChange={val => handleChange('phone_number', val.replace(/[^0-9]/g, ''))}
                error={validations.phone_number !== ''}
                errorMessage={validations.phone_number === 'has-empty' ? text.fieldRequired : text.phoneInvalid}
              />
            </div>
            <div className="mt-9 w-full">
              <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleContinue()}>{text.continue}</BlackButton>
            </div>
          </>
        )}
        {step === STEP.FIVE && (
          <>
            <div className="w-full">
              <p className="text-3xl font-semibold">{text.enterCode}</p>
            </div>
            <div className="mt-9 w-full">
              <CodeInput error={validations.code === 'has-error'} autoFocus onChange={val => handleChange('code', val)} />
              {validations.code === 'has-error' && <span className="ml-2 text-xs text-red-bright">{text.codeIncorrect}</span>}
            </div>
            <div className="mt-9 w-full">
              <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleContinue()}>{text.continue}</BlackButton>
            </div>
            {/* <div className="mt-4 w-full">
              <GrayButton variant="contained" size="large" className="w-full" onClick={() => handleSendSMS()}>{text.resendLink}</GrayButton>
            </div> */}
          </>
        )}
        {step === STEP.SIX && (
          <>
            <div className="w-full">
              <p className="text-3xl font-semibold">{text.passwordSetup}</p>
            </div>
            <div className="mt-9 w-full">
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
            <div className="mt-9 w-full">
              <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleContinue()}>{text.done}</BlackButton>
            </div>
          </>
        )}
        {step === STEP.SEVEN && (
          <>
            <div className="w-full">
              <p className="text-3xl font-semibold">{text.registrationSuccess}</p>
            </div>
            <div className="mt-4 w-full">
              <p className="text-gray-400">{text.registeredSuccess}</p>
            </div>
            <div className="mt-14 w-full">
              <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleContinue()}>{text.login}</BlackButton>
            </div>
          </>
        )}
      </RegisterContainer>
      <div className="mt-8">
        <AdminAmbassadorRegisterStepper step={progress} />
      </div>
    </>
  );
}

export default AdminAmbassadorRegister;
