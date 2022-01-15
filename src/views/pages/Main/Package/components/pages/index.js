import React from 'react';

import { MainTabs } from '../../../../../../components/Tabs';
import Locations from './Locations';
import Activity from './Activity';

function SubPages({ text, states, orderStates }) {
  const tabs = [text.locations, text.activity];

  return (
    <MainTabs tabs={tabs}>
      <Locations text={text} orderStates={orderStates} />
      <Activity text={text} states={states} />
    </MainTabs>
  );
}

export default SubPages;
