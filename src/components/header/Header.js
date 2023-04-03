import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import SiteSearch from '../search/SiteSearch';
import './Header.css';
import WishlistIcon from '../wishlist-icon/WishlistIcon';
import ShoppingCart from '../shopping-cart/ShoppingCart';

// import loginUser from './HeaderService';
// import constants from '../../utils/constants';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = ({ user, setUser }) => {
  const pathName = window.location.pathname;
  const [query, setQuery] = useState('');
  const history = useHistory();
  const clickHandlerForSearch = () => {
    sessionStorage.setItem('userSearch', query);
    console.log(pathName);
    if (pathName !== '/search-results') {
      history.push('/search-results');
    }
    if (pathName === '/search-results') {
      window.location.reload(false);
    }
  };
  const handleClick = () => {
    setUser({});
    history.push('/home');
  };

  return (
    <div style={{
      backgroundColor: '#1C2964', position: 'sticky', top: 0, zIndex: 3, marginBottom: 5
    }}
    >
      <Grid container direction="row" spacing={2} justify="space-between" border="2px white">
        <Grid item>
          <NavLink to="/home">
            <img className="logo" src="/Apparel Logo just.png" alt="Site logo" />
          </NavLink>
        </Grid>
        <Grid item xs={1}>
          {user.email ? (
            <span>
              <span>
                (
                {user.email}
                )
              </span>
              <button type="button" onClick={handleClick}>
                Logout
              </button>
            </span>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </Grid>
      </Grid>
      <Grid>
        <Grid item container direction="row" xs={11} spacing={10} justify="flex-end">
          <SiteSearch
            value={query}
            handleOnChange={(e) => setQuery(e.target.value)}
            handleOnClick={clickHandlerForSearch}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={10} justify="center">
        <Grid item>
<<<<<<< HEAD
          <NavLink to="/men">Men</NavLink>
=======
          <NavLink to="/Men" className="department">Men</NavLink>
>>>>>>> b9c73a54e8ba25eddbb38b76e1f954d62db41c51
        </Grid>
        <Grid item>
          <NavLink to="/Women" className="department">Women</NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/Kids" className="department">Kids</NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/wishlist"><WishlistIcon /></NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/shoppingcart"><ShoppingCart /></NavLink>
        </Grid>
      </Grid>

      {/* <NavLink to="/home">Home</NavLink>
      <NavLink to="/checkout">Cart</NavLink>
      {user && <span>{user.firstName}</span>}
      {user && <span>{user.lastName}</span>}
      {apiError && <span>Api Error</span>} */}
    </div>
  );
};

export default Header;
