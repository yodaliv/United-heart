import React from 'react';

import SearchInput from '../../../../components/SearchInput';
import SubPages from './components/pages';

import { useTranslations } from '../../../../hooks/translations';

function Package() {
  const text = useTranslations('package');
  const states = [
    { id: 1, name: 'Fullfilled' },
    { id: 2, name: 'Requested' },
    { id: 3, name: 'Declined' },
  ];
  const orderStates = [
    { id: 1, name: 'Shipped' },
    { id: 2, name: 'Preparing' },
  ];

  return (
    <div className="w-full min-h-content bg-primary flex justify-center py-12">
      <div className="container">
        <div className="w-full h-full px-4 sm:px-6 xl:px-8">
          <div className="flex justify-between items-center">
            <span className="text-4xl font-semibold text-black">{text.title}</span>
            <SearchInput placeholder={text.searchLocations} />
          </div>
          <div className="mt-4">
            <SubPages text={text} states={states} orderStates={orderStates} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Package;
