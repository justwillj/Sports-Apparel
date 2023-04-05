/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './productPagination.css';
import ProductCard from '../product-card/ProductCard';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
import axios from 'axios';

const ProductPagination = ({ query, setApiError, addToWishlist }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const stringIndex = () => {
      return `&startIndex=${startIndex}`;
    }

    const fetchProductPage = async () => {
      // await HttpHelper(`${Constants.PRODUCT_PAGE}/startIndex/${startIndex}`, 'GET')
      //   .then((response) => {
      //     console.log(response);
      //     if (response.ok) {
      //       return response.json();
      //     }
      //     throw new Error(Constants.API_ERROR);
      //   })
      //   .then(setProducts)
      //   .catch((err) => {
      //     console.log(err);
      //     // setApiError(true);
      //   });
      axios.get(Constants.BASE_URL_API + Constants.PRODUCT_PAGE, {params: query, 'startIndex': startIndex})
        .then(resposne => {
          console.log(response);
        })
    };

    fetchProductPage();

    // const countProducts = async () => {
    //   await HttpHelper(Constants.COUNT_PRODUCTS + query, 'GET')
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //       }
    //       throw new Error(Constants.API_ERROR);
    //     })
    //     .then(setTotalProducts)
    //     .catch(() => {
    //       setApiError(true);
    //     });
    // };

    // countProducts();
  }, [startIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // const prevPage = () => {
  //   if(!startIndex === 0) {
  //     setStartIndex(...startIndex - 20);
  //   }
  // };

  // const nextPage = () => {
  //   if(!startIndex + products.length === totalProducts) {
  //     setStartIndex(...startIndex + 20);
  //   }
  // };

  return (
    <div className="productPage">
      {products.length > 0 && products.map((product) => (
        <ProductCard key={product.id} product={product} onClick={addToWishlist} />
      ))}
    </div>
  );
};

export default ProductPagination;
