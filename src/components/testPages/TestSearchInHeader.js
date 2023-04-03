import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import loginUser from '../header/HeaderService';
import constants from '../../utils/constants';
import SiteSearch from '../search/SiteSearch';

/**
 * @name TestSearchInHeader
 * @description Displays the navigation header
 * @return component
 */
const TestSearchInHeader = () => {
  const pathName = window.location.pathname;
  const [user, setUser] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [apiError, setApiError] = useState(false);
  const [query, setQuery] = useState('');

  const history = useHistory();

  const handleClick = () => {
    sessionStorage.setItem('userSearch', query);
    console.log(pathName);
    if (pathName !== '/search-results') {
      history.push('/search-results');
    }
    if (pathName === '/search-results') {
      history.push('/');
    }
  };
  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was successful
   * @param {Object} response Response object from google
   */
  const handleGoogleLoginSuccess = (response) => {
    sessionStorage.setItem('token', response.getAuthResponse().id_token);
    const googleUser = {
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName
    };
    loginUser(googleUser, setUser, setApiError);
    setGoogleError('');
  };

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was unsuccessful
   */
  const handleGoogleLoginFailure = () => {
    setGoogleError('There was a problem logging in with Google. Please wait and try again later.');
  };

  /**
   * @name handleGoogleLogoutSuccess
   * @description Function to run if google logout was successful
   */
  const handleGoogleLogoutSuccess = () => {
    setUser('');
    setGoogleError('');
  };

  /**
   * @name handleGoogleLogoutFailure
   * @description Function to run if google logout was unsuccessful
   */
  const handleGoogleLogoutFailure = () => {
    setGoogleError('There was a problem logging out with Google. Please wait and try again later.');
  };
  return (
    <div>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/checkout">Cart</NavLink>
      <SiteSearch
        value={query}
        handleOnChange={(e) => setQuery(e.target.value)}
        handleOnClick={handleClick}
      />
      {user && <span>{user.firstName}</span>}
      {user && <span>{user.lastName}</span>}
      {googleError && <span>{googleError}</span>}
      {apiError && <span>Api Error</span>}
      {!user ? (
        <GoogleLogin
          clientId={constants.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
        />
      ) : (
        <GoogleLogout
          clientId={constants.GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleGoogleLogoutSuccess}
          onFailure={handleGoogleLogoutFailure}
        />
      )}
    </div>
  );
};

export default TestSearchInHeader;
