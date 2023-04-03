import React, {
  useEffect,
  useState
} from 'react';
import styles from './SiteSearch.module.css';
import ProductCard from '../product-card/ProductCard';
import Constants from '../../utils/constants';
import HttpHelper from '../../utils/HttpHelper';
import searchFilter from '../../utils/utilFunctions';

/**
 * @name SearchResults
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [query, setQuery] = useState('');
  useEffect(() => {
    async function fetchFilteredProducts(prod, error) {
      await HttpHelper(Constants.RUNNING_SHORTS_ENDPOINT, 'GET')
        .then((response) => {
          if (response.ok) {
            setQuery(sessionStorage.getItem('userSearch'));
            return response.json();
          }
          throw new Error(Constants.API_ERROR);
        })
        .then(prod)
        .catch(() => {
          error(true);
        });
    }
    fetchFilteredProducts(setProducts, setApiError);
  }, []);

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <div />
      {/* <div className="result-counter">
        <h4>
          Results:
          {' '}
          {searchFilter(products, query).length === 0 ? 'No matches for your search' :
          searchFilter(products, query).length}
        </h4>
      </div> */}
      <div className={styles.app}>
        <h4 className="result-counter">
          Results:
          {' '}
          {searchFilter(products, query).length === 0 ? 'No matches for your search'
            : searchFilter(products, query).length}
        </h4>
        {searchFilter(products, query).map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
