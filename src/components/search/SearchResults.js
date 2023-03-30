import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import Constants from '../../utils/constants';
import fetchProducts from '../product-page/ProductPageService';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <div>
      {apiError && <p data-testid="errMsg">{Constants.API_ERROR}</p>}
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
