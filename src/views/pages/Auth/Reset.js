import React, { useState } from 'react';

import { PasswordInput } from './components/Inputs';
import { BlackButton } from './components/Buttons';

import { useTranslations } from '../../../hooks/translations';

function Reset(props) {
  const text = useTranslations('reset');
  const [values, setValues] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (prop, value) => {
    setValues({ ...values, [prop]: value });
  };

  const handleClick = () => {
    props.history.push('/auth/login');
  };

  return (
    <form className="lg:my-25 sm:w-3/5 w-4/5">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800">{text.resetPassword}</h1>
      </div>
      <div className="mt-4 w-full">
        <label className="text-gray-800">{text.enterPassword}:</label>
      </div>
      <div className="mt-9 w-full">
        <PasswordInput label={text.newPassword} value={values.newPassword} onChange={val => handleChange('newPassword', val)} />
      </div>
      <div className="mt-6 w-full">
        <PasswordInput label={text.confirmPassword} value={values.confirmPassword} onChange={val => handleChange('confirmPassword', val)} />
      </div>
      <div className="mt-9 w-full">
        <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleClick()}>{text.continue}</BlackButton>
      </div>
    </form>
  );
}

export default Reset;
