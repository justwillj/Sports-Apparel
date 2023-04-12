/* eslint-disable */
import React, { useState } from 'react';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import ProductPagination from '../product-pagination/ProductPagination';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = ({ addToWishlist, addErrorLog }) => {
  const [apiError, setApiError] = useState(false);

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <ProductPagination addToWishlist={addToWishlist} setApiError={setApiError} addErrorLog={addErrorLog} deptIndex={0} />
    </div>
  );
};

export default ProductPage;
