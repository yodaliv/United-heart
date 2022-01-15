import React, { useState, useEffect, useCallback } from 'react';

import CustomTabs from './components/CustomTabs';
import TabContent from './components/TabContent';

import { getUICOrganization, getOrganizationTypes } from '../../../../apis/organization';
import { useTranslations } from '../../../../hooks/translations';
import { useAppContext } from '../../../../context/AppContext';

function Organization() {
  const text = useTranslations('orgManagement');
  const { setLoading, setMessage } = useAppContext();
  const [uicOrgId, setUicOrgId] = useState(null);
  const [orgTypes, setOrgTypes] = useState([]);

  const loadData = useCallback(() => {
    setLoading(true);
    getUICOrganization().then(res => {
      setUicOrgId(res.id);
      getOrganizationTypes(res.id).then(res => {
        setOrgTypes(res);
      }).catch(err => {
        setOrgTypes([]);
        setMessage({ open: true, title: text.error, description: text.failedLoadOrgTypes });
        setLoading(false);
      });
    }).catch(err => {
      setOrgTypes([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadOrgTypes });
      setLoading(false);
    });
  }, [text, setLoading, setMessage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-xl font-bold">{text.title}</p>
      </div>
      <CustomTabs items={orgTypes.map(orgType => orgType.org_type)}>
        {orgTypes.map((orgType, index) => (
          <TabContent key={index} text={text} org_id={uicOrgId} type_id={orgType.id} />
        ))}
      </CustomTabs>
    </div>
  );
}

export default Organization;
