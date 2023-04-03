import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import CategoryPage from '../category-page/CategoryPage';
import Header from '../header/Header';
import HomePage from '../home-page/HomePage';
import SingleProduct from '../product-page/SingleProduct';
import Footer from '../footer/Footer';
import LoginPage from '../login-page/LoginPage';
import Home from '../home/Home';
import SearchResults from '../search/SearchResults';

/**
 * @name App
 * @returns component
 */
const App = () => {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      {/* <Header /> */}
      <Switch>
        <Route exact path="/home" render={() => <Home />} />
        <Route exact path="/" render={() => <ProductPage />} />
        <Route exact path="/login" render={() => <LoginPage setUser={setUser} />} />
        <Route exact path="/checkout" render={() => <CheckoutPage />} />
        <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
        <Route exact path="/home" render={() => <HomePage />} />
        <Route exact path="/products/:id" render={() => <SingleProduct />} />
        <Route exact path="/search-results" render={() => <SearchResults />} />
        <Route exact path="/men" render={(Men) => <CategoryPage />} />
        {/* <Route exact path="/test" render={() => <TestSearchInput />} /> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
