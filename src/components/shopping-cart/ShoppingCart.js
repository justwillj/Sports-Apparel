import React, {
  useState
  // useEffect
} from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@mui/material/Badge';
import { amber } from '@mui/material/colors';
import { useCart } from '../checkout-page/CartContext';

/**
 * @name ShoppingCart
 * @description displays shopping cart icon and updates badge to reflect number of items in cart
 * @return component
 */
const ShoppingCart = () => {
  const items = useCart();
  // eslint-disable-next-line
  const [shoppingCart, setShoppingCart] = useState([]);
  // eslint-disable-next-line
  const [products, setProducts] = useState([]);

  // Work on over the weekend to not make continuous API calls
  // const getAllData = () => {
  //   // Link that helped me with this
  //   // https://medium.com/@jdhawks/make-fetch-s-happen-5022fcc2ddae
  //   Promise.all([
  //     fetch('http://localhost:8085/products', {
  //     }),
  //     fetch('http://localhost:8085/shopping-cart', {
  //     })
  //   ])
  //     .then(([resProd, resShop]) => {
  //       if (!resProd.ok || !resShop.ok) {
  //         throw Error;
  //       }
  //       return Promise.all([resProd.json(), resShop.json()]);
  //     })
  //     .then(([dataProd, dataShop]) => {
  //       setProducts(dataProd);
  //       setShoppingCart(dataShop);
  //     });
  // };

  // /**
  //  * Loads the getAllData function when the page is opened
  //  */
  // useEffect(() => {
  //   getAllData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [shoppingCart]);

  return (
    <div>
      <IconButton aria-label="cart">
        <Badge badgeContent={items.length} color="error">
          <ShoppingCartOutlinedIcon sx={{ color: amber[100] }} />
        </Badge>
      </IconButton>
    </div>
  );
};

export default ShoppingCart;
