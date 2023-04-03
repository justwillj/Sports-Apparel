import React, { useEffect, useState } from 'react';
import HttpHelper from '../../utils/HttpHelper';
import ProductCard from '../product-card/ProductCard';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from '../product-page/ProductPageService';
// import "./CategoryPage.module,css"

//PAGE LAYOUT
//Determine what Categories exist

//Header
//Breadcrumb: Department | Category
//Search Results
//API GET by search results (grid)
//Footer

/**
 * @name CategoryPage
 * @description fetches products from API based on department and category and displays products as product cards
 * @return component
 */
const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [department, setDepartment] = useState('Men');
  const [category, setCategory] = useState('Running');

  async function fetchProducts(setProducts, setApiError) {
    await HttpHelper('/products?demographic=Men&category=Running&type=Short', 'GET')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(Constants.API_ERROR);
      })
      .then(setProducts)
      .catch(() => {
        setApiError(true);
      });
  }

//   //conditional rendering for department and category
//   const search = (e) => {
//     if (product.demographic == "Men") {
//         setDepartment("Men");
//         //Nested if statement to select category
//         setCategory();
//     } 
//     else if (product.department == "Women") {
//         setDepartment("Women");
//         //Nested if statement to select category
//         setCategory();
//     }
//     else if (product.department == "Kids") {
//         setDepartment("Kids");
//         //Nested if statement to select category
//         setCategory();
//     }
//     else {
//         return error;
//     }
//   };

  useEffect(() => {
    fetchProducts(setProducts, setApiError, setDepartment, setCategory);
  }, []);

  return (
    <div className='page'>
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
