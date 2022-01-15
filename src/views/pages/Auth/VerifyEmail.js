import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from "react-router-dom";

import { verifyEmail } from '../../../apis/auth';
import { userTypes } from '../../../constants';
import { useTranslations } from '../../../hooks/translations';
import { useAppContext } from '../../../context/AppContext';

function VerifyEmail(props) {
  const { history } = props;
  const text = useTranslations('verify');
  const query = new URLSearchParams(useLocation().search);
  const code = query.get('code');
  const { setLoading } = useAppContext();
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);

  const startVerify = useCallback(() => {
    if (code) {
      setLoading(true);
      verifyEmail(code).then(res => {
        const { invite_code, user_type } = res;
        if (user_type === userTypes.uicAdmin) {
          setSuccess(true);
          setLoading(false);
        } else if (Boolean(invite_code) && Boolean(user_type)) {
          history.push(`/auth/signup?invite_code=${invite_code}&user_type=${user_type}`);
        } else {
          setSuccess(true);
          setLoading(false);
        }
      }).catch(err => {
        setInvalid(true);
        setLoading(false);
      });
    } else {
      setInvalid(true);
    }
  }, [history, code, setLoading]);

  useEffect(() => {
    startVerify();
  }, [startVerify]);

  return (
    <form className="lg:my-25 sm:w-3/5 w-4/5 flex">
      {invalid ? (
        <label className="font-medium tracking-0.28 text-gray-400">{text.failedVerify}</label>
      ) : success ? (
        <label className="font-medium tracking-0.28 text-gray-800">{text.verifiedSuccess} <Link to="/auth/login" className="text-blue-cornflower font-semibold cursor-pointer hover:opacity-80">{text.here}</Link> {text.toLogin}</label>
      ) : (
        <label className="font-medium tracking-0.28 text-gray-800">{text.verifying}</label>
      )}
    </form>
  );
}

export default VerifyEmail;
