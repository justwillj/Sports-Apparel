import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import './footer.css';

const Footer = () => {
  const [year, setYear] = useState();
  const history = useHistory();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const refresh = (dept) => {
    switch (dept) {
      case 'Men':
        history.push('/results/Men');
        break;
      case 'Women':
        history.push('/results/Women');
        break;
      case 'Kids':
        history.push('/results/Kids');
        break;
      case 'Pets':
        history.push('/results/Pets');
        break;
      default:
    }
  };

  return (
    <div className="footer-container">
      <Grid item xs={1} container direction="row" justify="center" alignItems="flex-start">
        <Grid item className="title">
          <NavLink to="/home">
            <img className="footer-logo" src="/Apparel Logo just.png" alt="Site logo" />
          </NavLink>
        </Grid>
      </Grid>

      <Grid container direction="row" justify="center" alignItems="flex-end">
        <Grid item xs={6} container spacing={10} justify="center">
          <Grid item>
            <NavLink to="/results/Men" className="nav-links" onClick={() => refresh('Men')}>Men</NavLink>
          </Grid>
          <Grid item>
            <NavLink to="/results/Women" className="nav-links" onClick={() => refresh('Women')}>Women</NavLink>
          </Grid>
          <Grid item>
            <NavLink to="/results/Kids" className="nav-links" onClick={() => refresh('Kids')}>Kids</NavLink>
          </Grid>
          <Grid item>
            <NavLink to="/results/Pets" className="nav-links" onClick={() => refresh('Pets')}>Pets</NavLink>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={2} container direction="row" justify="center" alignItems="flex-end">
        <Grid item className="inc">
          <h2 className="inc">
            {`${year} Sports Apparel Inc `}
            &#169;
          </h2>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
