import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import Header from '../header/Header';
import Home from '../home/Home';
import TestSearchInput from '../testPages/TestSearchInput';
import SearchResults from '../search/SearchResults';
import TestSearchInHeader from '../testPages/TestSearchInHeader';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <TestSearchInHeader />
    {/* <Header /> */}
    <Switch>
      <Route exact path="/home" render={() => <Home />} />
      <Route exact path="/" render={() => <ProductPage />} />
      <Route exact path="/checkout" render={() => <CheckoutPage />} />
      <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
      <Route exact path="/search-results" render={() => <SearchResults />} />
      <Route exact path="/test" render={() => <TestSearchInput />} />
    </Switch>
  </BrowserRouter>
);

export default App;
