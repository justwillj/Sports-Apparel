import React from 'react';
import ProductCard from '../product-card/ProductCard';

const MapResults = ({ productList, styles, results }) => (
  <div className={styles}>
    {results}
    {productList.map((product) => (
      <div key={product.id}>
        <ProductCard product={product} />
      </div>
    ))}
  </div>
);
export default MapResults;
