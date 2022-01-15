import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const SCPContext = createContext();

const SCPContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [templates, setTemplates] = useState([]);

  const getCategoryName = (category_id) => {
    return categories.find(category => category.id === category_id)?.name || ''
  };

  const getProductName = (product_id) => {
    return products.find(product => product.id === product_id)?.name || ''
  };

  const getTemplateName = (id) => {
    return templates.find(t => t.id === id)?.name || 'Custom';
  };

  const getProductsData = (items) => {
    return items.map((item, index) => (
      index === 0
        ? getProductName(item.product_id) + ': ' + item.qty
        : ', ' + getProductName(item.product_id) + ': ' + item.qty
    ));
  };

  return (
    <SCPContext.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        templates,
        setTemplates,
        getCategoryName,
        getProductName,
        getTemplateName,
        getProductsData,
      }}
    >
      {children}
    </SCPContext.Provider>
  );
};

SCPContextProvider.propTypes = {
  children: PropTypes.node,
};

export default SCPContextProvider;
export const useSCPContext = () => useContext(SCPContext);