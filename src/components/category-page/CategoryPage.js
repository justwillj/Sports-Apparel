/* eslint-disable */
import React, { useEffect, useState } from 'react';
import HttpHelper from '../../utils/HttpHelper';
import ProductCard from '../product-card/ProductCard';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from '../product-page/ProductPageService';

//PAGE LAYOUT

//Header
//Breadcrumb: Department | Category
//Search Results
//API GET by search results (utilize searchbar functionality)
//Footer

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




  useEffect(() => {
    async function fetchFilteredProducts(prod, setApiError) {
      await HttpHelper(`/products?demographic=${props.category}&category=Running`, 'GET')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(Constants.API_ERROR);
        })
        .then(prod)
        .catch(() => {
          apiError(true);
        });
    }
    fetchFilteredProducts(setProducts, setApiError);
  }, []);

  return (
    <div className='page'>
        <br/>
        <h2>{department} | {category}</h2>
        <h3>SEARCH RESULTS</h3>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <div className={styles.app}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
