import React from 'react';
import { Divider, List, ListItem } from '@material-ui/core';
import Constants from '../../utils/constants';
import './ShoppingCartItem.css';

/**
 * @name ShoppingCartItem
 * @description displays a product as a list item within a list
 * @return component
 */
const ShoppingCartItem = ({ product }) => (
  <List>
    <ListItem>
      <div>
        <img src={Constants.PLACEHOLDER_IMAGE} className="photo" alt="product iamge" />
      </div>
      <div>
        <b>
          {product.name}
        </b>
        <br />
        <i>
          {product.demographic}
          {' '}
          {product.category}
          {' '}
          {product.type}
        </i>
        <br />
        {product.description}
        <br />
        Price:
        {' '}
        {product.price}
      </div>
    </ListItem>
    <Divider />
  </List>
);

export default ShoppingCartItem;
