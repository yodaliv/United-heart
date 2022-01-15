import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { TextInput } from './components/Inputs';
import { BlackButton } from './components/Buttons';

import { useTranslations } from '../../../hooks/translations';

function Forgot(props) {
  const text = useTranslations('forgot');
  const [values, setValues] = useState({
    email: ''
  });

  const handleChange = (prop, value) => {
    setValues({ ...values, [prop]: value });
  };

  const handleClick = () => {
    props.history.push('/auth/reset');
  };

  return (
    <form className="lg:my-25 sm:w-3/5 w-4/5">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-800">{text.forgotPassword}</h1>
      </div>
      <div className="mt-4 w-full">
        <label className="text-gray-800">{text.enterEmail}</label>
      </div>
      <div className="mt-11 w-full">
        <TextInput label={text.email} value={values.email} onChange={val => handleChange('email', val)} />
      </div>
      <div className="mt-9 w-full">
        <BlackButton variant="contained" size="large" className="w-full" onClick={() => handleClick()}>{text.continue}</BlackButton>
      </div>
      <div className="mt-4 w-full flex justify-center">
        <span className="text-gray-400">{text.rememberPassword} <Link className="underline" to="/auth/login">{text.signin}</Link></span>
      </div>
    </form>
  );
}

export default Forgot;
