import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchProductsById
 * @description Utilizes HttpHelper to make a get request to an API for advertisement products
 * @param {*} setProducts sets state for products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchProductsById(setProducts, productIds) {

    Promise.all([
        HttpHelper(`/products/${productIds[0]}`, 'GET'),
        HttpHelper(`/products/${productIds[1]}`, 'GET'),
        HttpHelper(`/products/${productIds[2]}`, 'GET'),
    ])
    .then((response) => {
        if(response[0].ok && response[1].ok && response[2].ok) {
            return ([response[0].json(), response[1].json(), response[2].json()]);
        }
        throw new Error(Constants.API_ERROR);
    })
    .then(setProducts)
    .catch((err) => {
        console.log(err);
        // figure out how to pass error status
    });
}
