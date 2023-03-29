import React, { useEffect, useState } from 'react';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchProducts
 * @description Utilizes HttpHelper to make a get request to an API, Start by filtering by Department, then filter further by category
 * @param {*} setProducts sets state for products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */

export default async function fetchProductsByCategory(setProducts, setApiError) {

    const [department, setDepartment] = useState('');
    const [category, setCategory] = useState('');
    const [endpoint, setEndpoint] = useState('');

    //switch statement to set department
    //if accessed from men
        //if statement to set category and final endpoint
    //if accessed from women
        //if statement to set category and final endpoint
    //if accessed from kids
        //if statement to set category and final endpoint

  await HttpHelper(Constants.RUNNING_SHORTS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProducts)
    .catch(() => {
      setApiError(true);
    });
}
