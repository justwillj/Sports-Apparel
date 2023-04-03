import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import SiteSearch from '../search/SiteSearch';

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
      backgroundColor: '#1C2964', position: 'sticky', top: 0, zIndex: 3
    }}
    >
      <Grid container direction="row" spacing={2} justify="space-between">
        <Grid item>
          <NavLink to="/home">
            <img src="https://ibb.co/tPHLLQw" alt="Site logo" />
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
        <Grid item container direction="row" alignItems="center">
          <SiteSearch
            value={query}
            handleOnChange={(e) => setQuery(e.target.value)}
            handleOnClick={clickHandlerForSearch}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={10} justify="center">
        <Grid item>
          <NavLink to="/endpoint">Men</NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/endpoint">Women</NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/endpoint">Kids</NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/endpoint">Wish List</NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/endpoint">Cart</NavLink>
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
