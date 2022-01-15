import React from 'react';
import SubPages from './components/pages';

import { useTranslations } from '../../../../hooks/translations';
import SCPContextProvider from '../../../../context/SCPContext';

function SCP() {
  const text = useTranslations('scpManagement');

  return (
    <SCPContextProvider>
      <div>
        <div className="mb-6 flex justify-start items-center">
          <p className="text-xl font-bold">{text.title}</p>
        </div>
        <div className="w-full">
          <SubPages text={text} />
        </div>
      </div>
    </SCPContextProvider>
  );
}

export default SCP;
