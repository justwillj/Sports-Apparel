/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Grid, Modal, Box
} from '@material-ui/core';
import './Header.css';


// import loginUser from './HeaderService';
// import constants from '../../utils/constants';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = ({ user, setUser,logout,email,setEmail }) => {
  const [modalOn, setModalOn] = useState(false);

  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const history = useHistory();


  const handleClick = (e) => {
    axios
      .get(` http://localhost:8085/users/${email}`)
      .then((response) => {
        // sessionStorage.setItem('hotelToken', response.data.token);
        // setToken(response.data.token);
        // const loggedInUser = jwtDecode(response.data.token);
        // setUser(loggedInUser);
        console.log(response);
        return response.data;
      })
      .then((user) => {
        setUser(user);
        console.log(user);
        history.push('/home');
      })
      .catch((error) => {
        console.log(error);
        setError(true);     
      });
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
      <div style={{ backgroundColor: 'darkgrey', position: 'sticky', top: 0 }}>
        <Grid container direction="row" spacing={2} justify="space-between">
          <Grid item xs={4}>
            Search Bar
          </Grid>
          <Grid item xs={1}>
            {sessionStorage.getItem("email") === ""? <button type="button" onClick={()=> setModalOn(true)}>Login</button>: (
              <div>
                {sessionStorage.getItem("email")}
                <button type="button" onClick={logout}>Logout</button>
              </div>
            ) }
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
    </div>
  );
};

export default Header;
