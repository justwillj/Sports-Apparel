/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DepartmentPage.module.css';
import Constants from '../../utils/constants';
import ProductPagination from '../product-pagination/ProductPagination';
import { Button, ButtonGroup } from '@material-ui/core';

/**
 * @name DepartmentPage
 * @description fetches products from API based on department and displays products
 * @param addToWishlist method passed on to ProductPagination
 * @param addErrorLog method passed on to ProductPagination
 * @return component
 */
const DepartmentPage = ({ addToWishlist, addErrorLog }) => {
  const [apiError, setApiError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [query, setQuery] = useState({ department: '', categories: [], types: [] });
  const { dept } = useParams();

  /**
   * useEffect sets the department name when switching params
   */
  useEffect(() => {
    setQuery({ ...query, department: `?demographic=${dept}`, categories: [], types: [] });
  },[dept, sessionStorage.getItem('userSearch')]);

  /**
   * @name addCategory
   * @description this method adds a category to filter by to the query object
   * used in categories list
   * @param {*} category - category to filter results by
   */
  const addCategory = (category) => {
    const newCategories = query.categories;
    if (!query.categories.includes(category)) {
      newCategories.push(category);
    }
    setQuery({...query, categories: newCategories});
  }

  /**
   * @name addType
   * @description this method adds a type to filter by to the query object
   * used in types list
   * @param {*} type - type to filter results by
   */
  const addType = (type) => {
    const newTypes = query.types;
    if (!query.types.includes(type)) {
      newTypes.push(type);
    }
    setQuery({...query, types: newTypes});
  }

  /**
   * @name selectCategory
   * @description this method sets category filter to only this category
   * used in breadcrumb buttons
   * @param {*} category - category to filter results by
   */
  const selectCategory = (category) => {
    setQuery({ ...query, categories: [category], types: []});
  }

  /**
   * @name selectType
   * @description this method sets type filter to only this type
   * used in breadcrumb buttons
   * @param {*} type - type to filter results by
   */
  const selectType = (type) => {
    setQuery({ ...query, types: [type]});
  }

  /**
   * @name resetFilter
   * @description this method clears category and type filters
   * used in department breadcrumb
   */
  const resetFilter = () => {
    setQuery({ ...query, types: [], categories: []});
  }

  return (
    <div className={styles.page}>
      <br />
      <div className={styles.filterList}>
        <h2>{dept === 'Pets' ? 'Breed' : 'Categories'}</h2>
        {categories && categories.map((category, index) => (
          <div key={index}>
            <Button variant="text" onClick={() => addCategory(category)}>{category}</Button>
          </div>
        ))}
        <h2>Types</h2>
        {types && types.map((type, index) => (
          <div key={index}>
            <Button variant="text" onClick={() => addType(type)}>{type}</Button>
          </div>
        ))}
      </div>
      <div className={styles.products}>
        {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
        <div className={styles.breadcrumb}>
          <Button variant='text' onClick={resetFilter}>
            {dept === 'Search' ? `${dept} results for ${sessionStorage.getItem('userSearch')}` : dept }
          </Button>
          {query.categories.length > 0 && <span>|</span>}
          {query.categories.length > 0 && query.categories.map((category, index) => (
            <Button key={index} variant='text' onClick={() => selectCategory(category)}>{category}</Button>
          ))}
          {query.types.length > 0 && <span>|</span>}
          {query.types.length > 0 && query.types.map((type, index) => (
            <Button key={index} variant='text' onClick={() => selectType(type)}>{type}</Button>
          ))}
        </div>
        {query.department && <ProductPagination
          addToWishlist={addToWishlist}
          addErrorLog={addErrorLog}
          setApiError={setApiError}
          setCategories={setCategories}
          setTypes={setTypes}
          query={query}
        />}
      </div>
    </div>
  );
};

export default DepartmentPage;
