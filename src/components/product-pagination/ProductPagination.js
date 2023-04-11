import React, { useEffect, useState } from 'react';
import './productPagination.css';
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
 * @param searchResults - products passed from SearchResults
 * @returns - a div of product cards with UI to navigate back and forth
 * between pages of products
 */
const ProductPagination = ({
  query,
  setApiError,
  addToWishlist,
  searchResults,
  searchQuery,
  setCategories,
  setTypes,
  deptIndex,
  addErrorLog
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);

  // Used to get the time for the error logs
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();

  useEffect(() => {
    setStartIndex(deptIndex);
  },[query])

  useEffect(() => {

    /**
     * @name setCategoriesAndTypes
     * @description this method sets all possible category and type filters
     * @param {*} array - array of products
     */
    const setCategoriesAndTypes = (array) => {
      const tempCategories = [];
      const tempTypes = [];
      
      array.forEach(product => {
        if (!tempCategories.includes(product.category)) {
          tempCategories.push(product.category);
        }
        if (!tempTypes.includes(product.type)) {
          tempTypes.push(product.type);                
        }
      });

      tempCategories.sort();
      tempTypes.sort();
      setCategories(tempCategories);
      setTypes(tempTypes)
    };

    /**
     * @name sliceProducts
     * @description this method slices a product array into a page of 20 products
     * @param {*} array - filtered array of products
     */
    const sliceProducts = (array) => {
      setProducts(array.slice(startIndex, startIndex + 20));
    };

    /**
     * @name filterProducts
     * @description this method takes a product array and filters by any
     * query.categories or query.types. If no filters are included, returns all products.
     * @param {*} array - array of objects
     */
    const filterProducts = (array) => {
      const tempProducts = [];
      const finalProducts = [];

      // check for search
      if (searchQuery) {
        array = searchFilter(array, searchQuery);
      }

      // check for category filters
      if (query.categories.length > 0) {
        array.forEach(product => {
          if (query.categories.includes(product.category)) {
            tempProducts.push(product);
          }
        });
      }

      // check for type filters
      if (query.types.length > 0) {
        tempProducts.forEach(product => {
          if(query.types.includes(product.type)) {
            finalProducts.push(product);
          }
        });
        // pagination
        sliceProducts(finalProducts);
        setTotalProducts(finalProducts.length);
      } else if (query.categories.length > 0) {
        sliceProducts(tempProducts);
        setTotalProducts(tempProducts.length);
      } else {
        sliceProducts(array);
        setTotalProducts(array.length);
      }

      // sets possible category and type filters on deptartment page
      setCategoriesAndTypes(array);
    }

    /**
     * @name fetchDeptProducts
     * @description this method fetches all products by query department
     * and filters by any category or type included in query object
     */
    const fetchDeptProducts = async () => {
      await HttpHelper(`${Constants.PRODUCT_ENDPOINT}/${query.department || ''}`, 'GET')
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
        });
    }
    // function call
    fetchDeptProducts();

    /**
     * all old below here, not used, need to replace search functionality
     */
    // used for deprtment/category/type/etc pages
    if (!searchResults) {
      /**
       * @name fetchProductPage
       * @description This get request fetches a page worth of products from the api
       * @param query - query used to filter product results
       * @param startIndex - index to start retreiving products from
       * @returns - setsProducts
       */
      const fetchProductPage = async () => {
        // await HttpHelper(`${Constants.PRODUCT_PAGE}/${startIndex}${query || ''}`, 'GET')
        await HttpHelper(`${Constants.PRODUCT_ENDPOINT}/${query || ''}`, 'GET')
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(Constants.API_ERROR);
          })
          // .then(setProducts)
          .then(sliceProducts)
          .catch((err) => {
            addErrorLog(currDate +" "+  currTime + " " + err.message)
            setApiError(true);
          });
      };
      // call to fetch products
      // fetchProductPage();

      /**
      * @name countProducts
      * @description This get request counts the total number of products available
      * @param query - query used to filter count results
      * @returns - setsTotalProducts
      */
      const countProducts = async () => {
        await HttpHelper(`${Constants.COUNT_PRODUCTS}${query || ''}`, 'GET')
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(Constants.API_ERROR);
          })
          .then(setTotalProducts)
          .catch(() => {
            setApiError(true);
          });
      };
      // call to count products
      // countProducts();
    } else {
      // used for SearchResults
      setProducts(searchFilter(searchResults, query).slice(startIndex, startIndex + 20));
      setTotalProducts(searchFilter(searchResults, query).length);
    }
  }, [startIndex, query]); // eslint-disable-line react-hooks/exhaustive-deps

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
    if (!(startIndex + products.length === totalProducts)) {
      setStartIndex(startIndex + 20);
    }
  };

  return (
    <div className="productPage">
      <PaginationInterface
        startIndex={startIndex}
        totalProducts={totalProducts}
        nextButton={nextPage}
        prevButton={prevPage}
      />
      <div className="cards">
        {products.length > 0 && products.map((product) => (
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
  );
};

export default ProductPagination;
