import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { amber } from '@mui/material/colors';

/**
 * @name WishlistIcon
 * @description displays wishlist icon
 * @return component
 */
const WishlistIcon = () => (
  <div>
    <IconButton aria-label="wishlist">
      <FavoriteBorderIcon sx={{ color: amber[100] }} />
    </IconButton>
  </div>
);

export default WishlistIcon;
