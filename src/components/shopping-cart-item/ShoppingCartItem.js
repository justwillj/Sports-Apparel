import React from 'react';
import { Divider, List, ListItem } from '@material-ui/core';
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
        <img src={product.imageUrl} className="photo" alt="product" />
      </div>
      <div className="length">
        <b className="name">
          {product.name}
        </b>
        <br />
        <i className="dept-category-type">
          {product.demographic}
          {' '}
          {product.category}
          {' '}
          {product.type}
        </i>
        <br />
        {product.description}
        <br />
        <span className="amount">$10.99</span>
        {' '}
        {product.price}
        <br />
        Quantity:
        {' '}
        {product.quantity}
        <br />
        <i>Delete</i>
      </div>
    </ListItem>
    <Divider />
  </List>
);

export default ShoppingCartItem;
