import React, { useState, useEffect, useCallback } from 'react';

import { NewsCard } from '../../../../components/Cards';

import { useTranslations } from '../../../../hooks/translations';
import { useAppContext } from '../../../../context/AppContext';

function News() {
  const text = useTranslations('news');
  const { setLoading, setMessage } = useAppContext();

  const [newsList, setNewsList] = useState([]);

  const loadData = useCallback(() => {
    setLoading(true);
    setNewsList([
      {
        image: 'https://images.squarespace-cdn.com/content/v1/5eea24348a805341f465633f/1616778375426-RSH7BDNN583PLJ2CPHIC/ke17ZwdGBToddI8pDm48kNqsfxj6_8VPv8yvtrBakqAUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcFGed0jndwJ0lKecHSmZ4uc35KpzkeAITvRjWo3bJTvHbY-E5ljz3Jb0M8l-0lug_/12oz-Hands-Free-Gel-Fruit.jpg?format=500w',
        title: 'AG Donates 10,000+ Units of AG Hand Sanitizer',
        description: 'AG is a made-in-Canada brand producing naturally-derived hair and body care collections on-site in British Columbia, Canada.',
        link: 'ag-donates-10000-units-of-ag-hand-sanitizer'
      },
      {
        image: 'https://images.squarespace-cdn.com/content/v1/5eea24348a805341f465633f/1615979794595-JNWPP6W5E5J8FRA58IXS/ke17ZwdGBToddI8pDm48kA_SSaoz4elkj-HsZd8gX3Z7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UWPwZyNcweDIvdeL5kotwkIXjs9g0WibSO_cU-Ijy4Pwg6poS-6WGGnXqDacZer4yQ/gap+header+.jpeg?format=500w',
        title: 'Gap Donates Clothing & Accessories',
        description: 'Thank you GAP for donating men’s & women’s clothing & accessories last month. We are grateful to Canadian brands that help us to help…',
        link: 'gap-donates-clothing-amp-accessories'
      },
      {
        image: 'https://images.squarespace-cdn.com/content/v1/5eea24348a805341f465633f/1615556481452-1ZIGB1S98MSE8EKMASCN/ke17ZwdGBToddI8pDm48kI71QxgNmucHZbYBGbmXm5AUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKczHgOuXAPJ68LyYmffZuERQ-QVhge4oTcLPv0y4CrenPIMsMAvXfS-E294mrduAc5/Screen+Shot+2021-03-11+at+1.56.51+PM.png?format=500w',
        title: 'Church & Dwight Canada Donate 4,900 Lbs',
        description: 'Their donation of 9,768 units of toothpaste and 6,600 toothbrushes will be distributed to Canadians in need through our United Hearts for Canada... ',
        link: 'church-and-dwight'
      },
      {
        image: 'https://images.squarespace-cdn.com/content/v1/5eea24348a805341f465633f/1615233011525-9GWAPDP73ISD5HCV9496/ke17ZwdGBToddI8pDm48kLCovw03k15TbhcX5wyT7AoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKchTbOn7UmVeXivqqDV6hxmWJgOoD2iLlenzXI1YwWp2IIr0C816M8TN57QNx_awdI/Screen+Shot+2021-03-08+at+2.23.26+PM.png?format=500w',
        title: 'TJX Donates 4,000 Lbs',
        description: 'The TJX Companies, Inc are the leading off-price apparel and home fashion retailer worldwide and were ranked 80 in the 2020 Fortune 500 company...',
        link: 'jb8tikjpc2d9myq9lda6sn2alkzxzd'
      },
      {
        image: 'https://images.squarespace-cdn.com/content/v1/5eea24348a805341f465633f/1614798853745-5HKEGYTJJCH0JDUYG4Y6/ke17ZwdGBToddI8pDm48kC-d3wH2k85eK5PdyBRBGJ97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UQLtmM9sWXkmb_TRmYh2cSC-A9HEqv8a-vc0A81Y2i0zW07ycm2Trb21kYhaLJjddA/Screen+Shot+2021-03-03+at+2.09.38+PM.png?format=500w',
        title: 'Kol-Kid Donates 300 Lbs',
        description: 'Thank you Kol-Kid for donating 300 Lbs of kids’ clothing and accessories last month. We are grateful for donations from Canadian brands...',
        link: 'thank-you-rbc-rbc-giving-champions'
      },
      {
        image: 'https://images.squarespace-cdn.com/content/v1/5eea24348a805341f465633f/1612809961448-SYXXOV4F0KBK3M8Q72V0/ke17ZwdGBToddI8pDm48kMWgYM0lWBesvdEw1SKVCxB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmQyViSO8WVy1F2YAzXWvEVHxE6n5nLym3b5mnlOEwNJWEqXH71Li0iR_0-43N_sYo/IMG_2620.jpg?format=500w',
        title: 'Thank You RBC & RBC Giving Champions',
        description: 'A big thankyou to  and “RBC Giving Champions” for picking up almost 5,000 donated watches from locations across Manitoba as part of the...',
        link: 'aritzia-donates-4000-lbs'
      },
    ]);
    setMessage({ open: false, title: text.error, description: text.failedLoadNews });
    setLoading(false);
  }, [text, setLoading, setMessage]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <div className="w-full min-h-content bg-primary flex justify-center py-12">
      <div className="container">
        <div className="w-full h-full px-4 sm:px-6 xl:px-8">
          <p className="text-4xl font-semibold text-black">{text.title}</p>
          <div className="mt-8">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {newsList.map((item, index) => (
                <div key={`news-${index}`}>
                  <NewsCard text={text} image={item.image} title={item.title} description={item.description} link={item.link} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
