import './Home.css';
import React, { useEffect, useState } from 'react';
import fetchProducts from '../product-page/ProductPageService';
import PopularProductCard from '../product-card/PopularProductCard copy';

/* eslint-disable */
const Home = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <div>
      <h1 className='header'>Home</h1>
      <div className='popular-main'>
      <h1>Popular Products</h1>
      <div className="popular-products" > 
      {products.map((product) => (
        <div className='card' key={product.id}>
            {product.id <= 4? <PopularProductCard product={product} />: null}
        </div>
      ))}
      </div>
      </div>
    </div>
  );
};
export default Home;
