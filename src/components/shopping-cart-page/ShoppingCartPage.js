/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './ShoppingCartPage.css';
import ShoppingCartItem from '../shopping-cart-item/ShoppingCartItem';
import styles from '../search/SiteSearch.module.css';

/**
 * @name ShoppingCartPage
 * @description displays products that customer added to shopping cart
 * @return component
 */
const ShoppingCartPage = () => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllData = () => {
    setLoading(true);
    // Link that helped me with this
    // https://medium.com/@jdhawks/make-fetch-s-happen-5022fcc2ddae
    Promise.all([
      fetch('http://localhost:8085/products', {
      }),
      fetch('http://localhost:8085/shopping-cart', {
      })
    ])
      .then(([resProd, resShop]) => {
        if (!resProd.ok || !resShop.ok) {
          setLoading(false);
          throw Error;
        }
        return Promise.all([resProd.json(), resShop.json()]);
      })
      .then(([dataProd, dataShop]) => {
        setProducts(dataProd);
        setShoppingCart(dataShop);
        setLoading(false);
      });
  };

  /**
   * Loads the getAllData function when the page is opened
   */
  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(shoppingCart);
  console.log(products);

  // const totalPrice = shoppingCart.reduce((total, x) => total + x.price, 0);

  return (
    <main className="body">
      <h1 className="title">Shopping Cart</h1>
      {loading && (
        <div className={styles.ldsContainer}>
          <div className={styles.ldsDualRing} />
        </div>
      )}
      {!loading && (
        <main className="body">
          <br />
          {shoppingCart.length === 0 ? <h2 className="message">Nothing to see here. Add products to your cart to get started</h2> : shoppingCart.map((shop) => (
            <div>
              {products.map((product) => (
                <div>
                  {shop.customerId === sessionStorage.getItem('customerId') && shop.productId === product.id ? <ShoppingCartItem key={product.id} product={product} /> : null}
                </div>
              ))}
            </div>
          ))}
        </main>
      )}
    </main>
  );
};

export default ShoppingCartPage;
