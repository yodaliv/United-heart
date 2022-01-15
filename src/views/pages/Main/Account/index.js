import React from 'react';

import SubPages from './components/pages';

import { useTranslations } from '../../../../hooks/translations';
import { useUserContext } from '../../../../context/UserContext';

function Account() {
  const text = useTranslations('account');
  const { userInfo } = useUserContext();
  const { org_id, role } = userInfo;

  return (
    <div className="w-full min-h-content bg-primary flex justify-center py-12">
      <div className="container">
        <div className="w-full h-full px-4 sm:px-6 xl:px-8">
          <p className="text-4xl font-semibold text-black">{text.title}</p>
          <div className="mt-4">
            <SubPages text={text} org_id={org_id} role={role} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
