import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import WishlistPage from '../wishlist-page/WishlistPage';
import Header from '../header/Header';

/**
 * @name App
 * @returns component
 */
const App = () => {
  const [wishlist, setWishList] = useState([]);

  const updateWishlist = (item) => {
    setWishList([...wishlist, item]);
  }
  
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <ProductPage addToWishlist={updateWishlist} />} />
        <Route exact path="/checkout" render={() => <CheckoutPage />} />
        <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
        <Route exact path="/wishlist" render={() => <WishlistPage list={wishlist} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
