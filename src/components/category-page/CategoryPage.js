/* eslint-disable */
import React, { useEffect, useState } from 'react';
import HttpHelper from '../../utils/HttpHelper';
import ProductCard from '../product-card/ProductCard';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
/* eslint-disable */
import fetchProducts from '../product-page/ProductPageService';
import ProductPagination from '../product-pagination/ProductPagination';

// PAGE LAYOUT

// Header
// Breadcrumb: Department | Category
// Search Results
// API GET by search results (utilize searchbar functionality)
// Footer

/**
 * @name CategoryPage
 * @description fetches products from API based on department and category and displays products as product cards
 * @return component
 */
const CategoryPage = (props) => {
  
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [department, setDepartment] = useState(props.category);
  const [category, setCategory] =  useState('Running');

  return (
    <div className='page'>
        <br/>
        <h2>{department} | {category}</h2>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <ProductPagination addToWishlist={props.addToWishlist} setApiError={setApiError} query={`?demographic=${props.category}&category=Running`} />
    </div>
  );
};

export default CategoryPage;
