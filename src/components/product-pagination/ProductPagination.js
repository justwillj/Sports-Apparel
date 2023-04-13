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
 * @param setFilters - function to set available category and type filters
 * @param addErrorLog - function to log front end errors
 * @returns - a div of product cards with UI to navigate back and forth
 * between pages of products
 */
const ProductPagination = ({
  query,
  setApiError,
  addToWishlist,
  setFilters,
  addErrorLog
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
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
      
      // finds available categories to filter by
      allProducts.forEach(product => {
        if (!tempCategories.includes(product.category)) {
          // if there is a type filter, uses that to find available categories
          if (query.types.length > 0) {
            if (query.types.includes(product.type)) {
              tempCategories.push(product.category);
            }
          } else {
            // if no type filter, add category
            tempCategories.push(product.category);
          }
        }
      });

      // uses product array filtered by any category filters to find
      // available types to filter by
      filteredProducts.forEach(product => {
        if (!tempTypes.includes(product.type)) {
          tempTypes.push(product.type);                
        }
      })

      // keeps filter lists looking organized
      tempCategories.sort();
      tempTypes.sort();
      
      // sets available filters
      setFilters({categories: tempCategories, types: tempTypes});
    };

    /**
     * @name sliceProducts
     * @description this method slices a product array into a page of 20 products
     * @param ProductArray - array of products
     */
    const sliceProducts = (productArray) => {
      setPage(productArray.slice(startIndex, startIndex + 20));
      setTotalProducts(productArray.length);
    };

    /**
     * @name categoryFilter
     * @description this method takes a product array and filters it by query.categories
     * @param productArray - product array
     * @returns - filtered product array
     */
    const categoryFilter = (productArray) => {
      const tempProducts = [];

      // filters product by any active category filters
      if (query.categories.length > 0) {
        productArray.forEach(product => {
          if (query.categories.includes(product.category)) {
            tempProducts.push(product);
          }
        });
        // returns filtered array
        return tempProducts;
      }
    // if no active category filter, return array as is 
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

      // filters product by any active type filters
      if (query.types.length > 0) {
        productArray.forEach(product => {
          if(query.types.includes(product.type)) {
            finalProducts.push(product);
          }
        });
        // returns filtered array
        return finalProducts;
      }
      // if no active type filter, return array as is
      return productArray;
    }

    /**
     * @name filterProducts
     * @description this method takes a product array and filters by any
     * query.categories or query.types. If no filters are included, returns all products.
     * @param productArray - array of products
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

        // uses search filter if returning search results
        if (query.department === '?demographic=Search') {
          searchArray = searchFilter(productArray, sessionStorage.getItem('userSearch'));
        } else {
          // if not returning search results, keeps original products
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
        /* PRESSON
        setTimeout is for a special case, only shows one api call when page refreshes twice
        i.e. when switching departments when startIndex != 0
        trying to fix repetitious api calls but at least it looks right for now
        */
        setTimeout(() => {setLoading(false)}, 75);
      }
    }

    /**
     * @name fetchDeptProducts
     * @description this method fetches all products by query department
     * if no query, it fetches all products
     */
    const fetchDeptProducts = async () => {
      await HttpHelper(`${query ? `${Constants.PRODUCT_ENDPOINT}${query.department !== '?demographic=Search' ? query.department : ''}` : `${Constants.PRODUCT_ENDPOINT}`}`, 'GET')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(Constants.API_ERROR);
        })
        // filter by category or type
        .then(filterProducts)
        .catch((err) => {
          addErrorLog(currDate +" "+  currTime + " " + err.message)
          setApiError(true);
          setLoading(false);
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
