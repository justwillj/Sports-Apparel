/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import WishlistPage from '../wishlist-page/WishlistPage';
import CategoryPage from '../category-page/CategoryPage';
import Header from '../header/Header';
import HomePage from '../home-page/HomePage';
import SingleProduct from '../product-page/SingleProduct';
import Footer from '../footer/Footer';
import SearchResults from '../search/SearchResults';
import AdPage from '../slideshow/AdPage';

/**
 * @name App
 * @returns component
 */
const App = () => {
  const [user, setUser] = useState({});
  const [wishlist, setWishList] = useState([]);
  const [email, setEmail] = useState('');
  const history = useHistory();

  const logoutForm = () => {
    sessionStorage.setItem("email","");
    setEmail("");
    history.push("/home");
  } 

  const updateWishlist = (item) => {
    if (sessionStorage.getItem('email') !== "") {
      setWishList([...wishlist, item]);
    }
  };

  const pagePush = () =>{
    history.push(`/${category}`);
  }

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} logout={logoutForm} email={email} setEmail={setEmail} />
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" render={() => <ProductPage addToWishlist={updateWishlist} />} />
        <Route exact path="/checkout" render={() => <CheckoutPage />} />
        <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
        <Route exact path="/home" render={() => <HomePage />} />
        <Route exact path="/products/:id" render={() => <SingleProduct />} />
        <Route exact path="/search-results" render={() => <SearchResults />} />
        <Route exact path="/Men" render={() => <CategoryPage category={"Men"} />} />
        <Route exact path="/Women" render={() => <CategoryPage category={"Women"}/>} />
        <Route exact path="/kids" render={() => <CategoryPage category={"Kids"}/>} />
        <Route exact path="/wishlist" render={() => <WishlistPage list={wishlist} />} />
        {/* <Route exact path="/test" render={() => <TestSearchInput />} /> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
