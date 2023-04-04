import React, { useEffect, useState } from 'react';
import HttpHelper from '../../utils/HttpHelper';
import ProductCard from '../product-card/ProductCard';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from '../product-page/ProductPageService';
import constants, { WOMEN_ENDPOINT } from '../../utils/constants';
// import "./CategoryPage.module,css"

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
    const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [department, setDepartment] = useState(props.category);
  const [category, setCategory] =  useState('Running');
  
    console.log(department);

//   '/products?demographic=Men&category=Running&type=Short'
  //conditional rendering for department and category


  useEffect(() => {
    if (department == "Men") {
        setQuery('/products?demographic=Men');
        //Nested if statement to select category
    } 
    if (department == "Women") {
        setQuery('/products?demographic=Women');
        //Nested if statement to select category
    }
    if (department == "Kids") {
        setQuery('/products?demographic=Kids');
        //Nested if statement to select category
    }

    console.log(query);

    async function fetchFilteredProducts(prod, setApiError) {
      await HttpHelper(query, 'GET')
        .then((response) => {
          if (response.ok) {
            // setQuery(sessionStorage.getItem('userSearch'));
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

//   async function fetchProducts(setProducts, setApiError) {
//     await HttpHelper(searchPath, 'GET')
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error(Constants.API_ERROR);
//       })
//       .then(setProducts)
//       .catch(() => {
//         setApiError(true);
//       });
//   }

  useEffect(() => {
    fetchProducts(setProducts, setApiError, setDepartment, setCategory);
  }, []);

  return (
    <div className='page'>
        <br/>
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
