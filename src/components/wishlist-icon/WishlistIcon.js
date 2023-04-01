import React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './WishlistIcon.module.css';

/**
 * @name WishlistIcon
 * @description displays wishlist icon
 * @return component
 */
const WishlistIcon = () => {
  
    return (
      <div className={styles.wishlist}>
        <IconButton aria-label="wishlist">
            <NavLink to="/wishlist">
                <FavoriteBorderIcon />
            </NavLink>
        </IconButton>
      </div>
    );
  };
  
  export default WishlistIcon;