import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import WishlistPage from '../wishlist-page/WishlistPage';
import Header from '../header/Header';
import HomePage from '../home-page/HomePage';
import SingleProduct from '../product-page/SingleProduct';
import Footer from '../footer/Footer';
import Home from '../home/Home';
import SearchResults from '../search/SearchResults';

/**
 * @name App
 * @returns component
 */
const App = () => {
  const [user, setUser] = useState({});
  const [wishlist, setWishList] = useState([]);

  const updateWishlist = (item) => {
    setWishList([...wishlist, item]);
  };

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      {/* <Header /> */}
      <Switch>
        <Route exact path="/home" render={() => <Home />} />
        <Route exact path="/" render={() => <ProductPage addToWishlist={updateWishlist} />} />
        <Route exact path="/checkout" render={() => <CheckoutPage />} />
        <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
        <Route exact path="/home" render={() => <HomePage />} />
        <Route exact path="/products/:id" render={() => <SingleProduct />} />
        <Route exact path="/search-results" render={() => <SearchResults />} />
        <Route exact path="/wishlist" render={() => <WishlistPage list={wishlist} />} />
        {/* <Route exact path="/test" render={() => <TestSearchInput />} /> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
