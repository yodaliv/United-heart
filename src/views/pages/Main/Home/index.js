import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
import { Divider } from '@material-ui/core';

import { MainTabs } from '../../../../components/Tabs';
import { NewsCard, DonationCard } from './components/Cards';
import { HeartIcon, GiftIcon } from './components/Icons';

import { getDonations } from '../../../../apis/donation';
import { useTranslations } from '../../../../hooks/translations';
import { useAppContext } from '../../../../context/AppContext';
import { useUserContext } from '../../../../context/UserContext';

function Home(props) {
  const { history } = props;
  const text = useTranslations('home');
  const { setLoading, setMessage } = useAppContext();
  const { userInfo } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [donationList, setDonationList] = useState([]);
  const tabs = [[text.news, text.donations], [text.news]];

  const loadDonations = useCallback(() => {
    setLoading(true);
    getDonations().then(res => {
      setDonationList(res);
      setLoading(false);
      setIsLoaded(true);
      // Embed survey monkey
      let el = document.createElement("script");
      el.append('(function(t,e,s,o){var n,c,l;t.SMCX=t.SMCX||[],e.getElementById(o)||(n=e.getElementsByTagName(s),c=n[n.length-1],l=e.createElement(s),l.type="text/javascript",l.async=!0,l.id=o,l.src="https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd8s9HIunBUErJPz6qrg2eF1PCYxXFxfDyx3TjS_2FZE6Jz.js",c.parentNode.insertBefore(l,c))})(window,document,"script","smcx-sdk");');
      document.body.appendChild(el);
    }).catch(err => {
      setDonationList([]);
      // setMessage({ open: true, title: text.error, description: text.failedLoadDonations });
      setMessage({ open: false, title: text.error, description: text.failedLoadDonations });
      setLoading(false);
      setIsLoaded(true);
    });
  }, [text, setLoading, setMessage]);

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

    if (userInfo) {
      loadDonations();
    } else {
      setLoading(false);
      setIsLoaded(true);
    }
  }, [text, userInfo, loadDonations, setLoading, setMessage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="w-full min-h-content bg-white flex justify-center py-12">
      <div className="container">
        <div className="w-full h-full px-4 sm:px-6 xl:px-8">
          <p className="xs:text-4xl text-3xl font-semibold text-black">{`${text.title}${userInfo ? ', ' + userInfo.firstname + ' ' + userInfo.lastname : ''}`}</p>
          <p className="opacity-50 mt-5 font-medium">{text.subTitle}</p>
          <div className="my-12.5 w-full lg:flex">
            <div className="lg:w-3/5">
              <div className="w-full shadow-card rounded-9 relative pt-pc-67.53 overflow-hidden select-none">
                <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-20">
                  <div className="flex justify-center items-center text-center">
                    <div className="flex flex-col justify-center items-center">
                      <p className="2xl:text-6xl sm:text-5xl xs:text-4xl text-3xl font-semibold text-white">{Boolean(userInfo?.welcome_title) ? userInfo.welcome_title : text.comingDate}</p>
                      <p className="2xl:text-3xl sm:text-2xl xs:text-xl text-lg xs:mt-4 mt-2 font-medium text-white">{Boolean(userInfo?.welcome_message) ? userInfo.welcome_message : text.instant + text.program}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full bg-dark absolute top-0 left-0 z-10 opacity-60" />
                {Boolean(userInfo?.org_background_url) ? (
                  <img className="w-full h-full absolute top-0 left-0 object-cover object-top" src={userInfo.org_background_url} alt="Home logo" />
                ) : (
                  <img className="w-full h-full absolute top-0 left-0 object-cover object-top" src="https://www.utoronto.ca/sites/default/files/QS%20world%20university%20rankings%20-weblead.jpg" alt="Home logo" />
                )}
              </div>
            </div>
            <div className="lg:w-2/5 lg:pl-5 lg:pt-0 pt-6 flex lg:flex-col sm:flex-row flex-col justify-between">
              <div className="flex-1 flex flex-col justify-center items-center text-center rounded-9 bg-gray-200 p-4 overflow-hidden">
                <HeartIcon />
                <p className="2xl:text-3xl sm:text-2xl text-xl mt-4 font-semibold tracking-0.28">{text.annualDonated}</p>
                <p className="2xl:mt-5 mt-3 sm:text-base text-sm font-light">{text.annualDonation}</p>
              </div>
              <div className="2xl:mt-5 lg:mt-3 sm:mt-0 mt-3 lg:ml-0 sm:ml-3 ml-0 flex-1 flex flex-col justify-center items-center text-center rounded-9 bg-gray-200 p-4 overflow-hidden">
                <GiftIcon />
                <p className="2xl:text-3xl sm:text-2xl text-xl mt-4 font-semibold tracking-0.28">{text.communityPartner}</p>
                <div className="2xl:mt-5 mt-3 sm:text-base text-sm font-light flex justify-space items-center">
                  <div>
                    <p>{text.communitySchools}</p>
                    <p>{text.schools}</p>
                  </div>
                  <p className="mx-4 sm:text-3xl text-2xl opacity-50">{' > '}</p>
                  <div>
                    <p>{text.communityCharities}</p>
                    <p>{text.charities}</p>
                  </div>
                  <p className="mx-4 sm:text-3xl text-2xl opacity-50">{' > '}</p>
                  <div>
                    <p>{text.communityBrands}</p>
                    <p>{text.brands}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isLoaded ? (
            <div className="mt-4">
              <MainTabs tabs={tabs[1]}>
                <div className="flex flex-col items-center my-12.5">
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {newsList.map((item, index) => (
                      <div key={`news-${index}`}>
                        <NewsCard text={text} image={item.image} title={item.title} description={item.description} link={item.link} />
                      </div>
                    ))}
                  </div>
                  {/* <GrayButton>Load more</GrayButton> */}
                </div>
                {userInfo && (
                  <div className="flex flex-col items-center my-12.5">
                    <div className="w-full">
                      <p className="text-3xl font-bold mb-4">{text.active}</p>
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                        {donationList.filter(item => item.is_active === true).map((item, index) => (
                          <div key={`donation-active-${index}`}>
                            <DonationCard
                              text={text}
                              images={item.images}
                              name={item.name}
                              date={`${moment(item.from_date).format('MMMM DD, YYYY')} ~ ${moment(item.to_date).format('MMMM DD, YYYY')}`}
                              onClick={() => history.push(`/donation/${item.id}/request`)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full"><Divider /></div>
                    <div className="w-full mt-8">
                      <p className="text-3xl font-bold">{text.closed}</p>
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                        {donationList.filter(item => item.is_active === false).map((item, index) => (
                          <div key={`donation-closed-${index}`}>
                            <DonationCard
                              text={text}
                              images={item.images}
                              name={item.name}
                              date={`${moment(item.from_date).format('MMMM DD, YYYY')} ~ ${moment(item.to_date).format('MMMM DD, YYYY')}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </MainTabs>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
