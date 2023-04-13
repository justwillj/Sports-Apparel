/* eslint-disable */
import React, { useState, useEffect} from 'react';
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
  const [shoppingCart, setShoppingCart] = useState([]);

  const getAllData = () => {
    // Link that helped me with this
    // https://medium.com/@jdhawks/make-fetch-s-happen-5022fcc2ddae
    fetch('http://localhost:8085/shopping-cart', {
    })
      .then((res) => {
        if (!res.ok) {
          throw Error;
        }
        return res.json();
      })
      .then((data) => {
        setShoppingCart(data);
    
      })
      .catch(() => {
      });
  };

  /**
   * Loads the getAllData function when the page is opened
   */
  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(shoppingCart);

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
      <h1 className="title">Shopping Cart</h1>
      {items.map((item) => (<ShoppingCartItem key={item.id} product={item} />))}
    </main>
  );
};

export default ShoppingCartPage;
