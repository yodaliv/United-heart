import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";

import { ErrorAlert } from '../../../components/Alerts';
import { TextInput, PasswordInput } from './components/Inputs';
import { BlackButton } from './components/Buttons';

import { login } from '../../../apis/auth';
import { getUserInfo } from '../../../apis/user';
import { getOrganizationCustomInfo } from '../../../apis/organization';
import { userTypes } from '../../../constants';
import { validateEmail } from '../../../utils';
import { useTranslations } from '../../../hooks/translations';
import { useAppContext } from '../../../context/AppContext';

function Login(props) {
  const { cookies, history } = props;
  const text = useTranslations('login');
  const { setLoading, setMessage } = useAppContext();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [validations, setValidations] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cookies.get('userInfo')) history.push('/');
  }, [cookies, history]);

  const handleChange = (prop, value) => {
    setValidations(prevState => ({ ...prevState, [prop]: '' }));
    setValues({ ...values, [prop]: value });
  };

  const checkvalidations = () => {
    if (values.email === '') {
      setValidations({ email: 'has-empty', password: '' });
      return false;
    } else if (!validateEmail(values.email)) {
      setValidations({ email: 'has-danger', password: '' });
      return false;
    } else if (values.password === '') {
      setValidations({ email: '', password: 'has-empty' });
      return false;
    } else if (values.password.length < 6) {
      setValidations({ email: '', password: 'has-danger' });
      return false;
    } else {
      setValidations({ email: '', password: '' });
    }

    return true;
  };

  const handleContinue = () => {
    if (!checkvalidations()) return;

    setLoading(true);
    login(values).then(res => {
      let decoded = jwt_decode(res.access_token);
      let userData = {
        ...res,
        firstname: decoded.firstname,
        lastname: decoded.lastname,
        role: decoded.role,
        org_id: decoded.org_id,
      };

      cookies.remove('userInfo', { path: '/' });
      cookies.set('userInfo', JSON.stringify(userData), { path: '/' });

      // Get user info
      getUserInfo().then(res => {
        userData = { ...userData, ...res };
        cookies.remove('userInfo', { path: '/' });
        cookies.set('userInfo', JSON.stringify(userData), { path: '/' });

        // Get organization custom info
        getOrganizationCustomInfo().then(res => {
          userData = { ...userData, ...res };
          cookies.remove('userInfo', { path: '/' });
          cookies.set('userInfo', JSON.stringify(userData), { path: '/' });

          if (userData.role === userTypes.uicAdmin) props.history.push('/admin');
          else props.history.push('/');
          setLoading(false);
        }).catch(() => {
          if (userData.role === userTypes.uicAdmin) props.history.push('/admin');
          else props.history.push('/');
          setLoading(false);
        });
      }).catch(() => {
        cookies.remove('userInfo', { path: '/' });
        setMessage({ open: true, title: text.error, description: text.failedLoadAccountInfo });
        setLoading(false);
      });

    }).catch(err => {
      const detail = err?.response?.data?.detail;
      if (detail?.error_code) {
        setError(text.failedLogin);
      } else {
        setMessage({ open: true, title: text.error, description: text.serviceUnavailable });
      }
      setLoading(false);
    });
  };

  return (
    <form className="lg:my-25 sm:w-3/5 w-4/5">
      <div className="w-full">
        <p className="text-3xl font-semibold">{text.login}</p>
      </div>
      <div className="mt-9 w-full">
        {error && <ErrorAlert severity="error" onClose={() => setError(null)}>{error}</ErrorAlert>}
      </div>
      <div className="mt-9 w-full">
        <TextInput
          label={text.email}
          value={values.email}
          onChange={val => handleChange('email', val)}
          error={validations.email !== ''}
          helperText={validations.email === 'has-empty' ? text.fieldRequired : validations.email === 'has-danger' ? text.emailInvalid : ''}
        />
      </div>
      <div className="mt-6 w-full">
        <PasswordInput
          label={text.password}
          value={values.password}
          onChange={val => handleChange('password', val)}
          onKeyUp={e => e.keyCode === 13 && handleContinue()}
          error={validations.password !== ''}
          helperText={validations.password === 'has-empty' ? text.fieldRequired : validations.password === 'has-danger' ? text.passwordInvalid : ''}
        />
      </div>
      <div className="w-full flex justify-end">
        <Link className="text-gray-400 underline" to="/auth/forgot">{text.forgotPassword}</Link>
      </div>
      <div className="mt-9 w-full">
        <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleContinue()}>{text.continue}</BlackButton>
      </div>
      <div className="mt-6 w-full flex justify-center">
        <span className="text-gray-400">{text.noAccount} <Link className="underline" to="/auth/signup">{text.signup}</Link></span>
      </div>
    </form>
  );
}

export default withCookies(Login);
