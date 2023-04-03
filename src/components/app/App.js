/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import Header from '../header/Header';
import HomePage from '../home-page/HomePage';
import SingleProduct from '../product-page/SingleProduct';
import Footer from '../footer/Footer';
import LoginPage from '../login-page/LoginPage';

/**
 * @name App
 * @returns component
 */
const App = () => {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const history = useHistory();
 
  const logoutForm = ()=>{
    sessionStorage.setItem("email","");
    setEmail("");
    history.push("/home");
  } 


  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} logout={logoutForm} email={email} setEmail={setEmail} />
      <Switch>
        <Route exact path="/" render={() => <ProductPage />} />
        <Route exact path="/login" render={() => <LoginPage setUser={setUser} />} />
        <Route exact path="/checkout" render={() => <CheckoutPage />} />
        <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
        <Route exact path="/home" render={() => <HomePage />} />
        <Route exact path="/products/:id" render={() => <SingleProduct />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
