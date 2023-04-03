import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';
import ShoppingCart from '../shopping-cart/ShoppingCart';
import WishlistIcon from '../wishlist-icon/WishlistIcon';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = ({ addToWishlist }) => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);
  console.log(products);
  return (
    <div>
      <WishlistIcon />
      <ShoppingCart />
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <div className={styles.app}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} onClick={addToWishlist} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
