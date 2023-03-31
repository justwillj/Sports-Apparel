import React, { useEffect, useState } from 'react';
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

//   //conditional rendering for department and category
//   const search = (e) => {
//     if (api.department == "Men") {
//         setDepartment("Men");
//         //Nested if statement to select category
//         setCategory();
//     } 
//     else if (api.department == "Women") {
//         setDepartment("Women");
//         //Nested if statement to select category
//         setCategory();
//     }
//     else if (api.department == "Kids") {
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
