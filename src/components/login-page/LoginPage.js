/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Input from '../input/Input';


const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();

  /* event listener for login click */
  const handleClick = () => {
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

  console.log(email);

  return (
    <Grid container justify="center">
      <Grid item xs={8}>
        <form>
          <Grid
            container
            justify="center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', border: '2px solid gray' }}
          >
            {error && (
              <div>
                <h2>Invalid email or password</h2>
              </div>
            )}
            <Grid item xs={12} container justify="center">
              <Input label="Email: " type="email" name="email" value={email} onChange={setEmail} />
            </Grid>
            <Grid item xs={12} container justify="center">
              <Input label="Password: " type="password" name="password" value={password} onChange={setPassword} />
            </Grid>
            <Grid item xs={12} container justify="center">
              <button type="button" onClick={handleClick} style={{ display: 'block' }}>
                Login
              </button>
            </Grid>
          </Grid>
        </form>
      </Grid>

    </Grid>
  );
};

export default LoginPage;
