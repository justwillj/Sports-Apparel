import { React, useState, useEffect } from 'react';
import fetchProducts from '../product-page/ProductPageService';
import Constants from '../../utils/constants';

const SiteSearch = () => {
  const [query, setquery] = useState('');
  const [products, setProducts] = useState([]);
  const [
    apiError,
    setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);
  const handleOnClick = () => {
    const results = products.filter(() => {
      console.log(products);
      if (query === '') return products;
      return products.toLowerCase().includes(query.toLowerCase());
    });
    // setstate({
    //   query,
    //   list: results
    // });
    console.log(results);
  };
  return (
    <div>
      {apiError && <p data-testid="errMsg">{Constants.API_ERROR}</p>}
      <form>
        <label htmlFor="q">
          Search
          <input type="search" name="q" value={query} onChange={(e) => setquery(e.target.value)} />
        </label>
        <button type="submit" value="submit" onSubmit={handleOnClick}>Submit</button>
      </form>
    </div>
  );
};

export default SiteSearch;
