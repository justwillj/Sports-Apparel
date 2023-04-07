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
import DepartmentPage from '../department-page/DepartmentPage';
import ShoppingCartPage from '../shopping-cart-page/ShoppingCartPage';

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
        <Route exact path="/ads/:id" render={() => <AdPage />} />
        <Route exact path="/search-results" render={() => <SearchResults addToWishlist={updateWishlist} />} />
        <Route exact path="/Men/Running" render={() => <CategoryPage department={"Men"} category={"Running"} addToWishlist={updateWishlist} />} />
        <Route exact path="/wishlist" render={() => <WishlistPage list={wishlist} />} />
        <Route exact path="/shoppingcart" render={() => <ShoppingCartPage />} />
        <Route exact path="/results/:dept" render={() => <DepartmentPage addToWishlist={updateWishlist} />} />
        {/* <Route exact path="/test" render={() => <TestSearchInput />} /> */}
        {/* <Route exact path="/pageTest" render={() => <ProductPagination addToWishlist={updateWishlist} />} /> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
