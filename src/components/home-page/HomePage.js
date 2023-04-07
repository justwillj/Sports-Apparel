import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './homePage.css';
import Slideshow from '../slideshow/Slideshow';
import Constants from '../../utils/constants';
import PopularCard from '../popularCard/PopularCard';
import NewProductCard from '../newProductCard/NewProductCard';
import fetchAllProducts from '../product-page/FetchAllProducts';
/* eslint-disable */

/**
 * @name HomePage
 * @description fetches and displays an advertisement slideshow as well as
 * new and popular products
 * @returns component
 */
const HomePage = ({addErrorLog}) => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchAllProducts(setProducts, setApiError, addErrorLog);
  }, []);

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <Slideshow setApiError={() => setApiError} addErrorLog={addErrorLog} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="popular-main">
        <h1>Explore Products</h1>
        <div className="popular-products">
          {products.map((product) => (
            <div className="card" key={product.id}>
              {product.id === 1 ? (
                <NavLink style={{ textDecoration: 'none' }} to={`/products/${product.id}`} key={product.id}>
                  <PopularCard
                    productName="Nike React Infinity 3"
                    productImg="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e98d86bf-ee48-4e93-9e54-4f6aaec4c2d2/quest-4-mens-road-running-shoes-RlpLvS.png"
                  />
                </NavLink>
              ) : null}
              {product.id === 2 ? (
                <NavLink style={{ textDecoration: 'none' }} to={`/products/${product.id}`} key={product.id}>
                  <PopularCard
                    productName="Adidas Supernova 2.0"
                    productImg="https://cdn.shopify.com/s/files/1/0558/4169/products/RSRunners_BlackGum_1500_1000-2_fc7c88f0-77a8-4b06-bb46-924d9fa0b6c8.jpg?v=1625795310"
                  />
                </NavLink>
              ) : null}
              {product.id === 3 ? (
                <NavLink style={{ textDecoration: 'none' }} to={`/products/${product.id}`} key={product.id}>
                  <PopularCard
                    productName="Nike Running Pants"
                    productImg="https://i.ebayimg.com/images/g/TIoAAOSw2UpfrfZ1/s-l1600.jpg"
                  />
                </NavLink>
              ) : null}
              {product.id === 4 ? (
                <NavLink style={{ textDecoration: 'none' }} to={`/products/${product.id}`} key={product.id}>
                  <PopularCard
                    productName="Nike Shirt"
                    productImg="https://tracksmith-media.imgix.net/Fall21-Mens-VC-Tee-Black_92aa1400-f545-472a-96b7-7e871cdd6db3.png?auto=format,compress&crop=faces&dpr=2&fit=crop&h=640&w=640"
                  />
                </NavLink>
              ) : null}
            </div>

          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="new-main">
        <h1>New Products</h1>
        <div className="new-products">
          {products.map((product) => (
            <div className="card" key={product.id}>
              {product.id === 1 ? (
                <NewProductCard
                  productName="Pants"
                  productImg="https://cdn.shopify.com/s/files/1/0251/7377/products/Interval7_Black_Front_700x.png?v=1652373943"
                  productCategory={product.category}
                  productDepartment={product.demographic}
                  productDes="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id venenatis"
                  productId={product.id}
                />
              ) : null}
              {product.id === 2 ? (
                <NewProductCard
                  productName="Nike Hat"
                  productImg="https://i8.amplience.net/s/scvl/104780_186974_SET/1?fmt=auto&$webPdpProduct$"
                  productCategory={product.category}
                  productDepartment={product.demographic}
                  productDes="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id venenatis a."
                  productId={product.id}
                />
              ) : null}
              {product.id === 3 ? (
                <NewProductCard
                  productName="Loft Short"
                  productImg="https://cdn.shopify.com/s/files/1/0822/1457/products/LoftShort5.5Heather.png?v=1657313301&width=1080"
                  productCategory={product.category}
                  productDepartment={product.demographic}
                  productDes="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id venenatis a."
                  productId={product.id}
                />
              ) : null}
              {product.id === 4 ? (
                <NewProductCard
                  productName="Sweatshirt"
                  productImg="https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw969ff83b/images/hi-res/26346_WAVB.jpg?sw=512&sh=512&sfrm=png&q=95&bgcolor=f5f5f5"
                  productCategory={product.category}
                  productDepartment={product.demographic}
                  productDes="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id venenatis a."
                  productId={product.id}
                />
              ) : null}
              {product.id === 5 ? (
                <NewProductCard
                  productName="Wool Runner Mizzles"
                  productImg="https://cdn.allbirds.com/image/upload/f_auto,q_auto,w_533,b_rgb:f5f5f5/cms/4De0VQvzmMFIdXGhqySwSD/0ee54b6eba642a2a0b201d5e6ef4e971/AB0071M_SHOE_ANGLE_GLOBAL_MENS_WOOL_RUNNER_MIZZLE2_HAZY_BEIGE_RUGGED_KHAKI.png"
                  productCategory={product.category}
                  productDepartment={product.demographic}
                  productDes="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id venenatis a."
                  productId={product.id}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
