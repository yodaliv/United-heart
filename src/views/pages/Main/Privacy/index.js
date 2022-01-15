import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  appName,
  contactEmail,
  contactAddress,
  referCookieFrom,
  referShopifyPrivacyFrom,
  referGooglePrivacyFrom,
  referGoogleAnalyticsOptOutFrom,
  referHowTargetedAdvertisingWorksFrom,
  referDigitalAdvertisingOptOutFrom
} from '../../../../constants';
import { useTranslations } from '../../../../hooks/translations';

function Privacy() {
  const text = useTranslations('privacy');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-content bg-primary flex justify-center py-12">
      <div className="container">
        <div className="w-full h-full px-4 sm:px-6 xl:px-8">
          <p className="text-4xl font-semibold text-black">{text.title}</p>
          <p className="text-2xl font-semibold mt-8">{text.subtitle}</p>
          <p className="font-light mt-4">{text.overview} <Link to="/" className="text-blue-cornflower font-semibold">{appName}</Link>.</p>
          <p className="text-2xl font-semibold my-4">{text.section_1}</p>
          <p className="font-light">{text.section_1_1}</p>
          <p className="font-light mt-2">{text.section_1_2}</p>
          <div className="ml-2">
            <p className="font-light mt-2">{text.section_1_2_1} <a href={referCookieFrom} target="_blank" rel="noreferrer" className="text-blue-cornflower font-semibold">{referCookieFrom}</a>.</p>
            <p className="font-light mt-2">{text.section_1_2_2}</p>
            <p className="font-light mt-2">{text.section_1_2_3}</p>
          </div>
          <p className="font-light mt-2">{text.section_1_3}</p>
          <p className="font-light mt-2">{text.section_1_4}</p>
          <p className="text-2xl font-semibold my-4">{text.section_2}</p>
          <p className="font-light">{text.section_2_1}</p>
          <p className="font-light mt-2">{text.section_2_2}</p>
          <p className="font-light mt-2">{text.section_2_3}</p>
          <p className="text-2xl font-semibold my-4">{text.section_3}</p>
          <p className="font-light">{text.section_3_1} <a href={referShopifyPrivacyFrom} target="_blank" rel="noreferrer" className="text-blue-cornflower font-semibold">{referShopifyPrivacyFrom}</a>.</p>
          <p className="font-light mt-2">{text.section_3_2} <a href={referGooglePrivacyFrom} target="_blank" rel="noreferrer" className="text-blue-cornflower font-semibold">{referGooglePrivacyFrom}</a>.</p>
          <p className="font-light mt-2">{text.section_3_3} <a href={referGoogleAnalyticsOptOutFrom} target="_blank" rel="noreferrer" className="text-blue-cornflower font-semibold">{referGoogleAnalyticsOptOutFrom}</a>.</p>
          <p className="font-light mt-2">{text.section_3_4}</p>
          <p className="font-light mt-2">{text.section_3_5} <a href={referHowTargetedAdvertisingWorksFrom} target="_blank" rel="noreferrer" className="text-blue-cornflower font-semibold">{referHowTargetedAdvertisingWorksFrom}</a>.</p>
          <p className="font-light mt-2">{text.section_3_6}</p>
          <p className="font-light mt-2">{text.section_3_7} <a href={referDigitalAdvertisingOptOutFrom} target="_blank" rel="noreferrer" className="text-blue-cornflower font-semibold">{referDigitalAdvertisingOptOutFrom}</a>.</p>
          <p className="text-2xl font-semibold my-4">{text.section_4}</p>
          <p className="font-light">{text.section_4_1}</p>
          <p className="text-2xl font-semibold my-4">{text.section_5}</p>
          <p className="font-light">{text.section_5_1}</p>
          <p className="font-light mt-2">{text.section_5_2}</p>
          <p className="text-2xl font-semibold my-4">{text.section_6}</p>
          <p className="font-light">{text.section_6_1}</p>
          <p className="text-2xl font-semibold my-4">{text.section_7}</p>
          <p className="font-light">{text.section_7_1}</p>
          <p className="text-2xl font-semibold my-4">{text.section_8}</p>
          <p className="font-light">{text.section_8_1_1} <a href={`mailto:${contactEmail}`} className="text-blue-cornflower font-semibold">{contactEmail}</a> {text.section_8_1_2}</p>
          <p className="font-light mt-2">{contactAddress}</p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
