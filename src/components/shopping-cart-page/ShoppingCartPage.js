import React from 'react';
import './ShoppingCartPage.css';
import { useCart } from '../checkout-page/CartContext';
import ShoppingCartItem from '../shopping-cart-item/ShoppingCartItem';

/**
 * @name ShoppingCartPage
 * @description displays products that customer added to shopping cart
 * @return component
 */
const ShoppingCartPage = () => {
  const items = useCart();
  // console.log(items);
  // const totalPrice = items.reduce((total, x) => total + x.price, 0);

  if (items.length === 0) {
    return (
      <main className="body">
        <br />
        <h2 className="message">Nothing to see here. Add products to your cart to get started</h2>
      </main>
    );
  }
  return (
    <main className="body">
      {items.map((item) => (<ShoppingCartItem key={item.id} product={item} />))}
    </main>
  );
};

export default ShoppingCartPage;
