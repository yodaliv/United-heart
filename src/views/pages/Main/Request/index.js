import moment from 'moment';
import React, { useEffect, useState, useCallback } from 'react';

import { BlueButton } from '../../../../components/Buttons';
import { InventoryCard } from './components/Cards';

import { getDonation } from '../../../../apis/donation';
import { useTranslations } from '../../../../hooks/translations';
import { getInventories } from '../../../../apis/inventory';
import { getMyRequest, createRequest, updateRequest } from '../../../../apis/request';
import { useAppContext } from '../../../../context/AppContext';

function Request(props) {
  const { history, match } = props;
  const donationID = match.params.id;
  const text = useTranslations('request');
  const { setLoading, setMessage } = useAppContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [donation, setDonation] = useState(null);
  const [hasRequest, setHasRequest] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);

  const loadData = useCallback(() => {
    if (!Boolean(donationID)) history.push('/');

    setLoading(true);
    // Load donation by id
    getDonation(donationID).then(res => {
      setDonation(res);
      // Load inventories by donation id
      getInventories(donationID).then(res => {
        let inventories = res.filter(item => item.is_active === true);
        // Load my request
        getMyRequest(donationID).then(res => {
          let requests = res.inventory_requests;
          if (requests.length === 0) {
            setInventoryList(inventories.map(inventory => ({ ...inventory, count: 0 })));
            setHasRequest(false);
          } else {
            setInventoryList(inventories.map(inventory => {
              let match = requests.find(request => request.product_id === inventory.id);
              if (match) return { ...inventory, count: match.product_quantity };
              else return { ...inventory, count: 0 };
            }));
            setHasRequest(true);
          }

          setLoading(false);
          setIsLoaded(true);
        }).catch(err => {
          setInventoryList([]);
          setDonation(null);
          setMessage({ open: true, title: text.error, description: text.failedLoadRequests });
          setLoading(false);
          setIsLoaded(true);
        });
      }).catch(err => {
        setInventoryList([]);
        setDonation(null);
        setMessage({ open: true, title: text.error, description: text.failedLoadInventories });
        setLoading(false);
        setIsLoaded(true);
      });
    }).catch(err => {
      setInventoryList([]);
      setDonation(null);
      setMessage({ open: true, title: text.error, description: text.failedLoadDonation });
      setLoading(false);
      setIsLoaded(true);
    });
  }, [donationID, history, text, setLoading, setMessage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChangeRequest = (type, val, index) => {
    if (type === 'step')
      setInventoryList(inventoryList.map((item, i) => i === index ? { ...item, count: parseInt(item.count) + parseInt(val) } : item));
    else if (!isNaN(val)) {
      if (!isNaN(parseInt(val)))
        setInventoryList(inventoryList.map((item, i) => i === index ? { ...item, count: parseInt(val) } : item));
      else
        setInventoryList(inventoryList.map((item, i) => i === index ? { ...item, count: 0 } : item));
    }
  };

  const handleRequest = () => {
    let param = inventoryList.filter(inventory => inventory.count > 0).map(item => ({ product_id: item.id, product_quantity: item.count }));
    if (param.length > 0) {
      setLoading(true);
      if (hasRequest) {
        updateRequest(donationID, param).then(res => {
          loadData();
          setMessage({ open: true, title: text.success, description: text.successRequest });
        }).catch(err => {
          setMessage({ open: true, title: text.error, description: text.failedUpdateRequest });
          setLoading(false);
        });
      } else {
        createRequest(donationID, param).then(res => {
          loadData();
          setMessage({ open: true, title: text.success, description: text.successRequest });
        }).catch(err => {
          setMessage({ open: true, title: text.error, description: text.failedCreateRequest });
          setLoading(false);
        });
      }
    } else {
      setMessage({ open: true, title: text.warning, description: text.selectProduct });
    }
  };

  return (
    <div className="w-full min-h-content bg-white flex justify-center py-12">
      {isLoaded && donation && (
        <div className="container">
          <div className="w-full h-full px-4 sm:px-6 xl:px-8">
            <div className="flex justify-center items-center relative">
              <p className="text-3xl font-bold text-black">{donation.name}</p>
              <p className="text-xs absolute right-0 md:block hidden">{moment(donation.from_date).format('MMMM DD, YYYY')} ~ {moment(donation.to_date).format('MMMM DD, YYYY')}</p>
            </div>
            <div className="md:hidden block relative">
              <p className="text-xs absolute right-0">{moment(donation.from_date).format('MMMM DD, YYYY')} ~ {moment(donation.to_date).format('MMMM DD, YYYY')}</p>
            </div>
            <div className="flex justify-start mt-2">
              <p>{donation.description}</p>
            </div>
            <div className="flex flex-col items-center mb-8">
              {inventoryList.length > 0 ? (
                <>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 my-8 lg:my-12.5">
                    {inventoryList.map((item, index) => (
                      <div key={`request-${index}`}>
                        <InventoryCard
                          text={text}
                          images={item.product_urls}
                          name={item.product_name}
                          quantity={item.product_quantity}
                          description={item.product_description}
                          count={item.count}
                          onChangeCount={(type, val) => handleChangeRequest(type, val, index)}
                        />
                      </div>
                    ))}
                  </div>
                  <BlueButton onClick={() => handleRequest()}>{hasRequest ? text.updateRequest : text.createRequest}</BlueButton>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Request;
