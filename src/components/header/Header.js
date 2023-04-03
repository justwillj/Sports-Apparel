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
    <div style={{ backgroundColor: 'darkgrey', position: 'sticky', top: 0 }}>
      <Grid container direction="row" spacing={2} justify="space-between">
        <Grid item xs={4}>
          <SiteSearch
            value={query}
            handleOnChange={(e) => setQuery(e.target.value)}
            handleOnClick={clickHandlerForSearch}
          />
        </Grid>
        <Grid item xs={1}>
          {user.email
            ? (
              <span>
                <span>
                  (
                  {user.email}
                  )
                </span>
                <button type="button" onClick={handleClick}>Logout</button>
              </span>
            )
            : <NavLink to="/login">Login</NavLink>}
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={3} justify="center" alignItems="center">
        <Grid item>
          {}
          <NavLink to="/home">Logo</NavLink>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={9} justify="center">
        <Grid item className="dropdown">
          <button className="dropbtn">Men</button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </Grid>
        <Grid item className="dropdown">
          <button className="dropbtn">Women</button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>

        </Grid>
        <Grid item className="dropdown">
          <button className="dropbtn">Kids</button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>

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
