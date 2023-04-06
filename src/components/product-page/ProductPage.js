/* eslint-disable */
import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';
import ProductPagination from '../product-pagination/ProductPagination';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = ({ addToWishlist }) => {
  const [apiError, setApiError] = useState(false);

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <ProductPagination addToWishlist={addToWishlist} setApiError={setApiError} />
    </div>
  );
};

export default ProductPage;
