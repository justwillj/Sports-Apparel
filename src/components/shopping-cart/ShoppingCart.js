import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@mui/material/Badge';
import { amber } from '@mui/material/colors';
import { useCart } from '../checkout-page/CartContext';
import styles from './ShoppingCart.module.css';

/**
 * @name ShoppingCart
 * @description displays shopping cart icon and updates badge to reflect number of items in cart
 * @return component
 */
const ShoppingCart = () => {
  const items = useCart();

  return (
    <div className={styles.shoppingCart}>
      <IconButton aria-label="cart">
        <Badge badgeContent={items.length} color="error">
          <ShoppingCartOutlinedIcon sx={{ color: amber[100] }} />
        </Badge>
      </IconButton>
    </div>
  );
};

export default ShoppingCart;
