import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [query, setquery] = useState('');
  // const [state, setstate] = useState(
  //   {
  //     query: '',
  //     list: []
  //   }
  // );
  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);
  const newList = [];
  const handleOnClick = () => {
    console.log(products);
    products.filter((product) => {
      switch (query) {
        case product.name === query:
          newList.push(product);
          break;
        case product.demographic === query:
          console.log(product);
          newList.push(product);
          break;
        case product.description === query:
          newList.push(product);
          break;
        case product.catagory === query:
          newList.push(product);
          break;
        case product.type === query:
          newList.push(product);
          break;
        default: return products;
      }
      if (newList.length === 0) {
        return 'Nothing Found';
      }

      return newList;

      // if (product.demographic === query) {
      //   newList.push(product);

      //   return newList;
      // }
    });
    console.log(newList);
    return newList;
  };
  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <label htmlFor="q">
        Search
        <input type="search" name="q" value={query} onChange={(e) => setquery(e.target.value)} />
      </label>
      <button type="button" value="search" onClick={handleOnClick}>Search</button>
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

export default ProductPage;
