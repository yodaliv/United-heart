import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import UicAdminRegister from './components/UicAdminRegister';
import MasterAdminRegister from './components/MasterAdminRegister';
import AdminAmbassadorRegister from './components/AdminAmbassadorRegister';
import StudentRegister from './components/StudentRegister';

import { inviteStatus } from '../../../../apis/auth';
import { userTypes } from '../../../../constants';
import { useTranslations } from '../../../../hooks/translations';
import { useAppContext } from '../../../../context/AppContext';

function Signup(props) {
  const { history, location } = props;
  const params = new URLSearchParams(location.search);
  const invite_code = params.get('invite_code');
  const user_type = params.get('user_type');
  const text = useTranslations('signup');
  const { setLoading, setMessage } = useAppContext();
  const STEP = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
  };
  const PROGRESS = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState(null);
  const [progress, setProgress] = useState(PROGRESS.ONE);

  const checkProgress = useCallback((progress) => {
    switch (progress) {
      case 0:
        setStep(1);
        break;
      case 1:
        setStep(2);
        break;
      case 2:
        setStep(3);
        setProgress(2);
        break;
      case 3:
        setStep(4);
        setProgress(3);
        break;
      case 4:
        setStep(6);
        setProgress(4);
        break;
      case 5:
        setStep(7);
        setProgress(5);
        break;

      default:
        break;
    }
  }, []);

  const checkInvitedCode = useCallback(() => {
    setLoading(true);
    inviteStatus(invite_code, user_type).then(res => {
      checkProgress(res);
      setIsLoaded(true);
      setLoading(false);
    }).catch(err => {
      setMessage({ open: true, title: text.error, description: text.invitationIncorrect });
      setIsLoaded(true);
      setLoading(false);
    });
  }, [text, invite_code, user_type, checkProgress, setLoading, setMessage]);

  useEffect(() => {
    if (Boolean(invite_code) && Boolean(user_type)) {
      checkInvitedCode();
    } else {
      setStep(STEP.ONE);
      setIsLoaded(true);
    }
  }, [invite_code, user_type, STEP.ONE, checkInvitedCode]);

  return (
    <form className="lg:mt-25 lg:mb-20 sm:w-3/5 w-4/5">
      {isLoaded ? (
        step !== null ? (
          user_type === userTypes.uicAdmin ? (
            <UicAdminRegister
              text={text}
              invite_code={invite_code}
              user_type={user_type}
              STEP={STEP}
              step={step}
              setStep={setStep}
            />
          ) : user_type === userTypes.masterAdmin ? (
            <MasterAdminRegister
              text={text}
              invite_code={invite_code}
              user_type={user_type}
              STEP={STEP}
              step={step}
              setStep={setStep}
              progress={progress}
              setProgress={setProgress}
              history={history}
            />
          ) : user_type === userTypes.admin || user_type === userTypes.ambassador ? (
            <AdminAmbassadorRegister
              text={text}
              invite_code={invite_code}
              STEP={STEP}
              step={step}
              setStep={setStep}
              progress={progress}
              setProgress={setProgress}
              history={history}
            />
          ) : (
            <StudentRegister
              text={text}
              STEP={STEP}
              step={step}
              setStep={setStep}
              progress={progress}
              setProgress={setProgress}
              history={history}
            />
          )
        ) : (
          <>
            <div className="w-full">
              <span className="text-gray-400">{text.invitationIncorrect}</span>
            </div>
            <div className="mt-8 w-full flex justify-center">
              <span className="text-gray-400">{text.haveAccount} <Link className="underline" to="/auth/login">{text.signin}</Link></span>
            </div>
          </>
        )
      ) : (
        <div className="w-full flex justify-start">
          <span className="text-gray-400">{text.waiting}</span>
        </div>
      )}
    </form>
  );
}

export default Signup;
