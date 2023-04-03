import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
<<<<<<< HEAD
import CategoryPage from '../category-page/CategoryPage';
=======
import WishlistPage from '../wishlist-page/WishlistPage';
>>>>>>> b9c73a54e8ba25eddbb38b76e1f954d62db41c51
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
<<<<<<< HEAD
        <Route exact path="/men" render={(Men) => <CategoryPage />} />
=======
        <Route exact path="/wishlist" render={() => <WishlistPage list={wishlist} />} />
>>>>>>> b9c73a54e8ba25eddbb38b76e1f954d62db41c51
        {/* <Route exact path="/test" render={() => <TestSearchInput />} /> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
