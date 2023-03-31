import React, { useState } from 'react';
import styles from './homePage.css';
import Slideshow from '../slideshow/Slideshow';
import Constants from '../../utils/constants';

/**
 * @name HomePage
 * @description fetches and displays an advertisement slideshow as well as
 * new and popular products
 * @returns component
 */
const HomePage = () => {
  const [apiError, setApiError] = useState(false);

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <Slideshow setApiError={setApiError} />
    </div>
  );
};

export default HomePage;
