//PAGE LAYOUT
//Determine what Categories exist

//Header
//Breadcrumb: Department | Category
//Search Results
//API GET by search results (grid)
//Footer

import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from '../product-page/ProductPageService';

/**
 * @name CategoryPage
 * @description fetches products from API based on department and category and displays products as product cards
 * @return component
 */
const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <div>
        <h2>Department | Category</h2>
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
