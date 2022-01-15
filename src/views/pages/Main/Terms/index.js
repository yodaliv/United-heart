import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';

import { contactEmail } from '../../../../constants';
import { useTranslations } from '../../../../hooks/translations';

function Terms() {
  const text = useTranslations('terms');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-content bg-primary flex justify-center py-12">
      <div className="container">
        <div className="w-full h-full px-4 sm:px-6 xl:px-8">
          <p className="text-4xl font-semibold text-black">{text.title}</p>
          <p className="text-2xl font-semibold mt-8">{text.overview}</p>
          <p className="font-light mt-4">{text.overview_1}</p>
          <p className="font-light mt-2">{text.overview_2}</p>
          <p className="font-light mt-2">{text.overview_3}</p>
          <p className="font-light mt-2">{text.overview_4}</p>
          <p className="font-light mt-2 mb-6">{text.overview_5}</p>
          <Divider />
          <p className="text-2xl font-semibold mt-6">{text.section_1}</p>
          <p className="font-light mt-4">{text.section_1_1}</p>
          <p className="font-light mt-2">{text.section_1_2}</p>
          <p className="font-light mt-2">{text.section_1_3}</p>
          <p className="font-light mt-2">{text.section_1_4}</p>
          <p className="text-2xl font-semibold my-4">{text.section_2}</p>
          <p className="font-light">{text.section_2_1}</p>
          <p className="font-light mt-2">{text.section_2_2}</p>
          <p className="font-light mt-2">{text.section_2_3}</p>
          <p className="font-light mt-2">{text.section_2_4}</p>
          <p className="text-2xl font-semibold my-4">{text.section_3}</p>
          <p className="font-light">{text.section_3_1}</p>
          <p className="font-light mt-2">{text.section_3_2}</p>
          <p className="text-2xl font-semibold my-4">{text.section_4}</p>
          <p className="font-light">{text.section_4_1}</p>
          <p className="font-light mt-2">{text.section_4_2}</p>
          <p className="font-light mt-2">{text.section_4_3}</p>
          <p className="text-2xl font-semibold my-4">{text.section_5}</p>
          <p className="font-light">{text.section_5_1}</p>
          <p className="font-light mt-2">{text.section_5_2}</p>
          <p className="font-light mt-2">{text.section_5_3}</p>
          <p className="font-light mt-2">{text.section_5_4}</p>
          <p className="text-2xl font-semibold my-4">{text.section_6}</p>
          <p className="font-light">{text.section_6_1}</p>
          <p className="font-light mt-2">{text.section_6_2}</p>
          <p className="font-light mt-2">{text.section_6_3} <Link to="/privacy" className="text-blue-cornflower font-semibold">{text.returnsPolicy}</Link>.</p>
          <p className="text-2xl font-semibold my-4">{text.section_7}</p>
          <p className="font-light">{text.section_7_1}</p>
          <p className="font-light mt-2">{text.section_7_2}</p>
          <p className="font-light mt-2">{text.section_7_3}</p>
          <p className="font-light mt-2">{text.section_7_4}</p>
          <p className="text-2xl font-semibold my-4">{text.section_8}</p>
          <p className="font-light">{text.section_8_1}</p>
          <p className="font-light mt-2">{text.section_8_2}</p>
          <p className="font-light mt-2">{text.section_8_3}</p>
          <p className="text-2xl font-semibold my-4">{text.section_9}</p>
          <p className="font-light">{text.section_9_1}</p>
          <p className="font-light mt-2">{text.section_9_2}</p>
          <p className="font-light mt-2">{text.section_9_3}</p>
          <p className="text-2xl font-semibold my-4">{text.section_10}</p>
          <p className="font-light">{text.section_10_1} <Link to="/privacy" className="text-blue-cornflower font-semibold">{text.privacyPolicy}</Link>.</p>
          <p className="text-2xl font-semibold my-4">{text.section_11}</p>
          <p className="font-light">{text.section_11_1}</p>
          <p className="font-light mt-2">{text.section_11_2}</p>
          <p className="text-2xl font-semibold my-4">{text.section_12}</p>
          <p className="font-light">{text.section_12_1}</p>
          <p className="text-2xl font-semibold my-4">{text.section_13}</p>
          <p className="font-light">{text.section_13_1}</p>
          <p className="font-light mt-2">{text.section_13_2}</p>
          <p className="font-light mt-2">{text.section_13_3}</p>
          <p className="font-light mt-2">{text.section_13_4}</p>
          <p className="font-light mt-2">{text.section_13_5}</p>
          <p className="text-2xl font-semibold my-4">{text.section_14}</p>
          <p className="font-light">{text.section_14_1}</p>
          <p className="text-2xl font-semibold my-4">{text.section_15}</p>
          <p className="font-light">{text.section_15_1}</p>
          <p className="text-2xl font-semibold my-4">{text.section_16}</p>
          <p className="font-light">{text.section_16_1}</p>
          <p className="font-light mt-2">{text.section_16_2}</p>
          <p className="font-light mt-2">{text.section_16_3}</p>
          <p className="text-2xl font-semibold my-4">{text.section_17}</p>
          <p className="font-light">{text.section_17_1}</p>
          <p className="font-light mt-2">{text.section_17_2}</p>
          <p className="font-light mt-2">{text.section_17_3}</p>
          <p className="text-2xl font-semibold my-4">{text.section_18}</p>
          <p className="font-light">{text.section_18_1}</p>
          <p className="text-2xl font-semibold my-4">{text.section_19}</p>
          <p className="font-light">{text.section_19_1}</p>
          <p className="font-light mt-2">{text.section_19_2}</p>
          <p className="text-2xl font-semibold my-4">{text.section_20}</p>
          <p className="font-light">{text.section_20_1} <a href={`mailto:${contactEmail}`} className="text-blue-cornflower font-semibold">{contactEmail}</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
