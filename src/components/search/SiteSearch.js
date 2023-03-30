import React from 'react';
import style from './SiteSearch.module.css';
/**
 * @name SiteSearch
 * @description Filters products from API
 * @return component
 */
const SiteSearch = ({ query, handleOnClick, handleOnChange }) => (
  <div className={style.topnav}>
    <div className={style.search}>
      <label htmlFor="q">
        <input type="search" name="q" value={query} onChange={handleOnChange} />
      </label>
      <button type="button" value="Search" onClick={handleOnClick}>Search</button>
    </div>
  </div>
);
export default SiteSearch;
