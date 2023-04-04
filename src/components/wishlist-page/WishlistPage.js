import React from 'react';
import WishlistCard from '../wishlist-card/WishlistCard';
import styles from './WishlistPage.module.css';

/**
 * @name WishlistPage
 * @description displays user's favorite products
 * @return component
 */
const WishlistPage = ({ list }) => (
  <div>
    <div className={styles.app}>
      {list.map((item) => (
        <div key={item.id}>
          <WishlistCard product={item} />
        </div>
      ))}
    </div>
  </div>
);

export default WishlistPage;
