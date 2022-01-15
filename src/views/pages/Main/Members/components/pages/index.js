import React from 'react';

import { MainTabs } from '../../../../../../components/Tabs';
import Current from './Current';
import Requests from './Requests';
// import Activity from './Activity';

import { userTypes } from '../../../../../../constants';

function SubPages({ text, org_id, role, getRoleName, types, states }) {
  const tabs = role === userTypes.student ? [text.current] : [text.current, text.requests];

  return role === userTypes.student ? (
    <MainTabs tabs={tabs}>
      <Current text={text} org_id={org_id} getRoleName={getRoleName} />
      {/* <Activity text={text} org_id={org_id} types={types} states={states} /> */}
    </MainTabs>
  ) : (
    <MainTabs tabs={tabs}>
      <Current text={text} org_id={org_id} getRoleName={getRoleName} />
      <Requests text={text} />
      {/* <Activity text={text} org_id={org_id} types={types} states={states} /> */}
    </MainTabs>
  );
}

export default SubPages;
