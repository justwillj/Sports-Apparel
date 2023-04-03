/* eslint-disable */
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Grid,Modal,Box } from '@material-ui/core';
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
const Header = ({ user, setUser,email,setEmail,logout }) => {
  const [modalOn, setModalOn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

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

  const formCheck = (e)=>{
    let validForm = true;
    setError(false);
  
    if(password !== "password"){
      e.preventDefault();
      setError(true);
      validForm = false;
    }

    if(email !== "amir@amir.com"){
      e.preventDefault();
      setError(true);
      validForm = false;
    }
    console.log(validForm)
    if(validForm){
      setModalOn(false);
      setError(false);
      sessionStorage.setItem("email",email);
    }
  }

  return (
    <div>
       <Modal closeAfterTransition open={modalOn} onClose={()=> setModalOn(false)}>
      <div className='login-main'>
        <Box>
          <form>
            <h1 className='form-header'>Login</h1>
            {error? <p className='error'>Incorrect email or password</p>:null }
           
            <div className='input-box'>
            <input type='email' placeholder='Email Address'  value={email} onChange={(e) => setEmail(e.target.value)}></input>

            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

            <button className='button-1' onClick={formCheck}>Submit</button>
            </div>
          </form>
          </Box>
          </div>
      </Modal>
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
        {sessionStorage.getItem("email") === ""? <button type="button" onClick={()=> setModalOn(true)}>Login</button>: (
              <div>
                <p className='login-name'>{sessionStorage.getItem("email")}</p>
                <br></br>
                <button type="button" onClick={logout}>Logout</button>
              </div>
            ) }
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
          <NavLink to="/Men" className="department">Men</NavLink>
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
    </div>
  );
};

export default Header;
