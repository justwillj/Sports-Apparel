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
const Header = ({ user, setUser,email,setEmail,logout,addErrorLog }) => {
  const [modalOn, setModalOn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const pathName = window.location.pathname;
  const [query, setQuery] = useState('');
  const history = useHistory();

  //Used to get the time for the error logs
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();

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
      addErrorLog(currDate +" "+  currTime + " " + "You have entered a invalid email or password!")
      validForm = false;

    }

    if(email !== "amir@amir.com"){
      e.preventDefault();
      setError(true);
      validForm = false;
    }
    if(validForm){
      setModalOn(false);
      setError(false);
      history.push("/home")
      sessionStorage.setItem("email",email);
    }
  }
  const logoutButton = ()=>{
    sessionStorage.setItem("email","");
    setEmail("");
    history.push("/home");
  }

  return (
    <div style={{
      backgroundColor: '#1C2964', position: 'sticky', top: 0, zIndex: 3, marginBottom: 5, opacity: "0.95"
    }}
    >
        <div style={{
            position: 'relative'
        }}>
            <div 
            style={{
            position: 'absolute', top: 0, left:0
        }}><NavLink to="/home">
            <img className="logo" src="/Apparel Logo just.png" alt="Site logo" />
          </NavLink>
          </div>
      <Grid container direction="row" spacing={2} justify="flex-end" border="2px white" >
        <Grid item xs={1} container justify="center" className='login-gird'>
        
                {sessionStorage.getItem("email") === ""? <button type="button" className="loginButton" onClick={()=> setModalOn(true)}>Login</button>: (
              <div>
                <p className='login-name'>{sessionStorage.getItem("email")}</p>
                <button type="button" className="loginButton" onClick={logoutButton}>Logout</button>
              </div>
            ) }        
        </Grid>
      </Grid>
      
        
      <Grid className='department-container' container direction="row" justify="center">
        <Grid item xs={3}></Grid>
        <Grid item xs={6} container spacing={10} justify="center">
          <Grid item>
          <NavLink to="/Men" className="department">Men</NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/Women" className="department">Women</NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/Kids" className="department">Kids</NavLink>
        </Grid>  
        </Grid>
        <Grid item xs={3} container justify="flex-end">
        <Grid item>
          <SiteSearch
            value={query}
            handleOnChange={(e) => setQuery(e.target.value)}
            handleOnClick={clickHandlerForSearch}
          />
      </Grid>
      <Grid item>
          <NavLink to="/wishlist"><WishlistIcon /></NavLink>
        </Grid>
        <Grid item>
          <NavLink to="/shoppingcart"><ShoppingCart /></NavLink>
        </Grid>
        </Grid>

      </Grid>

      <div>
       <Modal closeAfterTransition open={modalOn} onClose={()=> setModalOn(false)}>
      <div className='login-main'>
        <Box>
          <form>
            <h1 className='form-header'>Login</h1>
            {error? <p className='error'>Incorrect email or password</p>:null }
           
            <div className='input-box'>
            <input className='form-input' type='email' placeholder='Email Address'  value={email} onChange={(e) => setEmail(e.target.value)}></input>

            <input className='form-input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

            <button className='button-1' onClick={formCheck}>Submit</button>
            </div>
          </form>
          </Box>
          </div>
      </Modal>
      </div>

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
