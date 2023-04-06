import React, { useEffect, useState } from 'react';
import './productPagination.css';
import ProductCard from '../product-card/ProductCard';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
import PaginationInterface from './PaginationInterface';
import searchFilter from '../../utils/utilFunctions';

/**
 * @name ProductPagination
 * @description this component builds a quickly loadable page of at most 20 products
 * @param query - query value to filter products
 * @param setApiError - function passthrough to set error message
 * @param addToWishlist - fuction passthrough to ProductCard
 * @returns - a div of product cards with UI to navigate back and forth
 * between pages of products
 */
const ProductPagination = ({
  query,
  setApiError,
  addToWishlist,
  searchResults
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
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
        await HttpHelper(`${Constants.PRODUCT_PAGE}/${startIndex}${query || ''}`, 'GET')
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
      };
      // call to fetch products
      fetchProductPage();

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
      countProducts();
    } else {
      // used for SearchResults
      setProducts(searchFilter(searchResults, query).slice(startIndex, startIndex + 20));
      setTotalProducts(searchFilter(searchResults, query).length);
    }
  }, [startIndex]); // eslint-disable-line react-hooks/exhaustive-deps

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
