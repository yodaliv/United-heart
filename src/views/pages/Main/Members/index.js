import React from 'react';

import SearchInput from '../../../../components/SearchInput';
import SubPages from './components/pages';

import { userTypes } from '../../../../constants';
import { useTranslations } from '../../../../hooks/translations';
import { useUserContext } from '../../../../context/UserContext';

function Members() {
  const text = useTranslations('members');
  const { userInfo } = useUserContext();
  const { org_id, role } = userInfo;
  const types = [
    { id: 1, name: 'Student in Need' },
    { id: 2, name: 'Ambassador' },
    { id: 3, name: 'Student' },
  ];
  const states = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Paused' },
    { id: 3, name: 'Inactive' },
    { id: 4, name: 'Closed' },
  ];

  const getRoleName = (role) => {
    switch (role) {
      case userTypes.uicAdmin:
        return text.uicAdmin;
      case userTypes.admin:
        return text.admin;
      case userTypes.ambassador:
        return text.ambassador;
      case userTypes.student:
        return text.student;

      default:
        return '';
    }
  };

  return (
    <div className="w-full min-h-content bg-primary flex justify-center py-12">
      <div className="container">
        <div className="w-full h-full px-4 sm:px-6 xl:px-8">
          <div className="md:flex justify-between items-center">
            <span className="text-4xl font-semibold text-black">{text.title}</span>
            <SearchInput placeholder={text.searchMembers} />
          </div>
          <div className="mt-4">
            <SubPages text={text} org_id={org_id} role={role} getRoleName={getRoleName} types={types} states={states} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Members;
