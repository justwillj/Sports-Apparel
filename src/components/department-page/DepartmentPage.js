import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DepartmentPage.module.css';
import Constants from '../../utils/constants';
import ProductPagination from '../product-pagination/ProductPagination';

/**
 * @name DepartmentPage
 * @description fetches products from API based on department and displays products
 * @return component
 */
const DepartmentPage = ({ addToWishlist }) => {
  const [apiError, setApiError] = useState(false);
  const { dept } = useParams();

  return (
    <div className={styles.page}>
      <br />
      <h2 className={styles.name}>{dept}</h2>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <ProductPagination addToWishlist={addToWishlist} setApiError={setApiError} query={`?demographic=${dept}`} />
    </div>
  );
};

export default DepartmentPage;
