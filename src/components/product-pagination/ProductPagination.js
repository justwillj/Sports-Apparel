import React, { useEffect, useState } from 'react';
import './productPagination.css';
import styles from '../search/SiteSearch.module.css';
import ProductCard from '../product-card/ProductCard';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
import PaginationInterface from './PaginationInterface';
import searchFilter from '../../utils/utilFunctions';
/* eslint-disable */

/**
 * @name ProductPagination
 * @description this component builds a quickly loadable page of at most 20 products
 * @param query - query value to filter products
 * @param setApiError - function passthrough to set error message
 * @param addToWishlist - fuction passthrough to ProductCard
 * @param setCategories - function to set available category filters
 * @param setTypes - function to set available type filters
 * @param addErrorLog - function to log front end errors
 * @returns - a div of product cards with UI to navigate back and forth
 * between pages of products
 */
const ProductPagination = ({
  query,
  setApiError,
  addToWishlist,
  setCategories,
  setTypes,
  addErrorLog
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState([]);

  // Used to get the time for the error logs
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();

  // resets startIndex when changing filters/departments
  useEffect(() => {
    // lets "/" page load
    if (query) {
      setStartIndex(0);
    }
  },[query]);

  // sets filtered products
  useEffect(() => {
    setLoading(true);
    /**
     * @name setCategoriesAndTypes
     * @description this method sets all possible category and type filters
     * @param allProducts - array of products from back end/search filter
     * used to find all available categories
     * @param filteredProducts - array of products filtered by category
     * used to find all available types
     */
    const setCategoriesAndTypes = (allProducts, filteredProducts) => {
      const tempCategories = [];
      const tempTypes = [];
      
      allProducts.forEach(product => {
        if (!tempCategories.includes(product.category)) {
          tempCategories.push(product.category);
        }
      });

      filteredProducts.forEach(product => {
        if (!tempTypes.includes(product.type)) {
          tempTypes.push(product.type);                
        }
      })

      // keeps filter lists looking organized
      tempCategories.sort();
      tempTypes.sort();
      
      // sets available filters
      setCategories(tempCategories);
      setTypes(tempTypes)
    };

    /**
     * @name sliceProducts
     * @description this method slices a product array into a page of 20 products
     * @param {*} array - filtered array of products
     */
    const sliceProducts = (array) => {
      setPage(array.slice(startIndex, startIndex + 20));
      setTotalProducts(array.length);
    };

    /**
     * @name categoryFilter
     * @description this method takes a product array and filters it by query.categories
     * @param productArray - product array
     * @returns - filtered product array
     */
    const categoryFilter = (productArray) => {
      const tempProducts = [];

      if (query.categories.length > 0) {
        productArray.forEach(product => {
          if (query.categories.includes(product.category)) {
            tempProducts.push(product);
          }
        });
        return tempProducts;
      }
    return productArray;
    }

    /**
     * @name typeFilter
     * @description this method takes a product array and filters it by query.types
     * @param productArray - product array
     * @returns - filtered product array
     */
    const typeFilter = (productArray) => {
      const finalProducts = [];

      if (query.types.length > 0) {
        productArray.forEach(product => {
          if(query.types.includes(product.type)) {
            finalProducts.push(product);
          }
        });
        return finalProducts;
      }
      return productArray;
    }

    /**
     * @name filterProducts
     * @description this method takes a product array and filters by any
     * query.categories or query.types. If no filters are included, returns all products.
     * @param productArray - array of objects
     */
    const filterProducts = (productArray) => {
      // so "/" page still loads
      if (!query) {
        console.log('huh');
        sliceProducts(productArray);
        setLoading(false);
      } else {
        let searchArray = [];
        let tempProducts = [];
        let finalProducts = [];

        if (query.department === '?demographic=Search') {
          searchArray = searchFilter(productArray, sessionStorage.getItem('userSearch'));
        } else {
          searchArray = [...productArray];
        }
  
        // check for category filters
        tempProducts = categoryFilter(searchArray);
  
        // check for type filters
        finalProducts = typeFilter(tempProducts);
  
        // setup page
        sliceProducts(finalProducts);
  
        // sets possible category and type filters on deptartment page
        setCategoriesAndTypes(searchArray, tempProducts);
        setLoading(false);
      }
    }

    /**
     * @name fetchDeptProducts
     * @description this method fetches all products by query department
     * and filters by any category or type included in query object
     */
    const fetchDeptProducts = async () => {
      await HttpHelper(`${query ? `${Constants.PRODUCT_ENDPOINT}${query.department !== '?demographic=Search' ? query.department : ''}` : `${Constants.PRODUCT_ENDPOINT}`}`, 'GET')
        .then((response) => {
          if (response.ok) {
            console.log(response);
            return response.json();
          }
          throw new Error(Constants.API_ERROR);
        })
        // filter by category or type
        .then(filterProducts)
        .catch((err) => {
          addErrorLog(currDate +" "+  currTime + " " + err.message)
          setApiError(true);
        });
    }
    // function call
    fetchDeptProducts();

  }, [startIndex, sessionStorage.getItem('userSearch'), query]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * @name prevPage
   * @description this method lowers the start index to get the previous page of products
   * used for PREV button in PaginationInterface
   * @param startIndex - checks if index is able to be lowered
   * @returns - setsStartIndex to previous page if able
   */
  const prevPage = () => {
    if (!(startIndex === 0)) {
      setStartIndex(startIndex - 20);
    }
  };

  /**
   * @name nextPage
   * @description this method increases the start index to get the next page of products
   * used for NEXT button in PaginationInterface
   * @param startIndex - checks if index is able to be increased
   * @returns - setsStartIndex to next page if able
   */
  const nextPage = () => {
    if (!(startIndex + page.length === totalProducts)) {
      setStartIndex(startIndex + 20);
    }
  };

  return (
    <div>
    {loading && (
      <div className={styles.ldsContainer}>
        <div className={styles.ldsDualRing} />
      </div>
    )}
    {!loading && (
      <div className="productPage">
        <PaginationInterface
          startIndex={startIndex}
          totalProducts={totalProducts}
          nextButton={nextPage}
          prevButton={prevPage}
        />
        <div className="cards">
          {page.length > 0 && page.map((product) => (
            <ProductCard key={product.id} product={product} onClick={addToWishlist} />
          ))}
        </div>
        <PaginationInterface
          startIndex={startIndex}
          totalProducts={totalProducts}
          nextButton={nextPage}
          prevButton={prevPage}
        />
      </div>
    )}
    </div>
  );
};

export default ProductPagination;
