/* eslint-disable */
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setProducts sets state for products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */

// Used to get the time for the error logs
const currDate = new Date().toLocaleDateString();
const currTime = new Date().toLocaleTimeString();
export default async function fetchAllProducts(setProducts, setApiError, addErrorLog) {
  await HttpHelper(Constants.PRODUCT_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProducts)
    .catch((err) => {
      addErrorLog(currDate +" "+  currTime + " " +" " + err.message)
      setApiError(true);
    });
}
