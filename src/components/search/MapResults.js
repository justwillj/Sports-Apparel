import React from 'react';
import ProductCard from '../product-card/ProductCard';

const MapResults = ({ productList }) => (
  <div>
    {productList.map((product) => (
      <div key={product.id}>
        <ProductCard product={product} />
      </div>
    ))}
  </div>
);
export default MapResults;
