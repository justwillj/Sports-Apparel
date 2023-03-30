import React from 'react';
/**
 * @name SiteSearch
 * @description Filters products from API
 * @return component
 */
const SiteSearch = ({ query, handleOnClick, handleOnChange }) => (
  <div>
    <label htmlFor="q">
      Search
      <input type="search" name="q" value={query} onChange={handleOnChange} />
    </label>
    <button type="button" value="search" onClick={handleOnClick}>Search</button>
  </div>
);
// Handle onChange
// (e) => setquery(e.target.value)
export default SiteSearch;
