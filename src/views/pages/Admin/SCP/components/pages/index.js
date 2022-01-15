import React, { useEffect, useCallback } from 'react';

import { getUsers } from '../../../../../../apis/user';
import { useAppContext } from '../../../../../../context/AppContext';
import { useSCPContext } from '../../../../../../context/SCPContext';

import CustomTabs from '../CustomTabs';
import Orders from './Orders';
import Templates from './Templates';
import Events from './Events';
import Inventories from './Inventories';
import Products from './Products';
import Categories from './Categories';

function SubPages({ text }) {
  const tabs = [text.activeEvents, text.orders, text.templates, text.inventories, text.products, text.categories];
  const { setLoading, setMessage } = useAppContext();
  const { setCategories, setProducts } = useSCPContext();

  const loadData = useCallback(() => {
    setLoading(true);
    // Load the categories
    getUsers().then(res => {
      // setCategories(res);
      setCategories([{ id: 1, name: 'Clothing', description: 'Clothing tool' }, { id: 2, name: 'Cleaning', description: 'Cleaning tool' }]);
      // Load the products
      getUsers().then(res => {
        // setProducts(res);
        setProducts([
          { id: 1, category_id: 1, name: 'Socks', description: 'Socks product' },
          { id: 2, category_id: 1, name: 'Gloves', description: 'Gloves product' },
          { id: 3, category_id: 2, name: 'Soap', description: 'Soap product' },
          { id: 4, category_id: 2, name: 'Toothpaste', description: 'Toothpaste product' }
        ]);
        setLoading(false)
      }).catch(err => {
        setProducts([]);
        setMessage({ open: true, title: text.error, description: text.failedLoadProducts });
        setLoading(false)
      });
    }).catch(err => {
      setCategories([]);
      setMessage({ open: true, title: text.error, description: text.failedLoadCategories });
      setLoading(false)
    });
  }, [text, setCategories, setProducts, setLoading, setMessage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <CustomTabs items={tabs}>
      <div className="w-full">
        <Events text={text} />
      </div>
      <div className="w-full">
        <Orders text={text} />
      </div>
      <div className="w-full">
        <Templates text={text} />
      </div>
      <div className="w-full">
        <Inventories text={text} />
      </div>
      <div className="w-full">
        <Products text={text} />
      </div>
      <div className="w-full">
        <Categories text={text} />
      </div>
    </CustomTabs>
  );
}

export default SubPages;
