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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function fetchFilteredProducts(prod, error) {
      await HttpHelper(Constants.PRODUCT_ENDPOINT, 'GET')
        .then((response) => {
          if (response.ok) {
            setQuery(sessionStorage.getItem('userSearch'));

            return response.json();
          }
          throw new Error(Constants.API_ERROR);
        })
        .then(prod)
        .then(() => { setLoading(false); })
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
      {loading === true && (
      <div className={styles.ldsContainer}>
        <div className={styles.ldsDualRing} />
      </div>
      )}
      {loading === false && (
      <div className="result-counter">
        <h4>
          {searchFilter(products, query).length === 0 ? 'No matches for your search'
            : `${searchFilter(products, query).length} search results for "${sessionStorage.getItem('userSearch')}"`}
        </h4>
      </div>
      )}
      <div className={styles.app}>
        {loading === false && searchFilter(products, query).map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
