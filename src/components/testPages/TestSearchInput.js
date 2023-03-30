import React, { useEffect, useState } from 'react';
// import ProductCard from '../product-card/ProductCard';
import Constants from '../../utils/constants';
import fetchProducts from '../product-page/ProductPageService';
import SiteSearch from '../search/SiteSearch';
import searchFilter from '../../utils/utilFunctions';
import MapResults from '../search/MapResults';

/**
 * @name TestSearchInput
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const TestSearchInput = () => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [query, setQuery] = useState('');

  const clickHandler = () => {
    const filteredProducts = searchFilter(products, query);
    setSearchResults(filteredProducts);
    return searchResults;
  };

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <div>
      {apiError && <p data-testid="errMsg">{Constants.API_ERROR}</p>}
      <SiteSearch
        value={query}
        handleOnChange={(e) => setQuery(e.target.value)}
        handleOnClick={clickHandler}
      />
      <div>
        {/* {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))} */}
        {searchResults.length > 0
          ? <MapResults productList={searchResults} /> : <MapResults productList={products} />}
      </div>
    </div>
  );
};

export default TestSearchInput;
