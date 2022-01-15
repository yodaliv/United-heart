import React from 'react';

import { MainTabs } from '../../../../../../components/Tabs';
import General from './General';
import Organization from './Organization';
// import Preferences from './Preferences';
import Apply from './Apply';
// import Support from './Support';

import { userTypes } from '../../../../../../constants';

function SubPages({ text, org_id, role }) {
  const tabs = role === userTypes.admin ? [text.general, text.organization] :
    role === userTypes.student ? [text.general, text.apply] : [text.general];

  return role === userTypes.admin ? (
    <MainTabs tabs={tabs}>
      <General text={text} />
      <Organization text={text} org_id={org_id} />
      {/* <Preferences text={text} />
      <Support text={text} /> */}
    </MainTabs>
  ) : role === userTypes.student ? (
    <MainTabs tabs={tabs}>
      <General text={text} />
      {/* <Preferences text={text} /> */}
      <Apply text={text} />
      {/* <Support text={text} /> */}
    </MainTabs>
  ) : (
    <MainTabs tabs={tabs}>
      <General text={text} />
      {/* <Preferences text={text} />
      <Support text={text} /> */}
    </MainTabs>
  );
}

export default SubPages;
