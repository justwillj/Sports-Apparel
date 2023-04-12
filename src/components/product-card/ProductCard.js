/* eslint-disable */
import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { RemoveRedEyeRounded } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Constants from '../../utils/constants';
import ProductModal from '../product-modal/ProductModal';
import { useCartDispatch } from '../checkout-page/CartContext';
import './ProductCard.css';


/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({ product, onClick }) => {
  const classes = useStyles();
  const [productModal, setProductModal] = useState(false)

  const dispatch = useCartDispatch();

  const addToCart = (item) => {
    // console.log(item);
    dispatch({ type: 'add', item });
  };

  const openProductModal = () => {
    setProductModal(true);
  }
  const closeProductModal = () => {
    setProductModal(false);
  }

  return (
    <div>
      <ProductModal open={productModal} product={product} close={closeProductModal} />
      <Card className={classes.root}>
        <CardHeader
          avatar={(
            <Avatar aria-label="demographics" className={classes.avatar}>
              {product.demographic.charAt(0)}
            </Avatar>
          )}
          action={(
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )}
          title={product.name}
          subheader={`${product.demographic} ${product.category} ${product.type}`}
        />
        <CardMedia
          className={classes.media}
          image={product.imageUrl}
          title="placeholder"
        />
           {console.log(product.imageUrl)}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            $
            {product.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton aria-label="open modal" onClick={openProductModal}>
            <RemoveRedEyeRounded />
          </IconButton>
          <IconButton className='wishlist' aria-label="add to favorites" onClick={() => onClick(product)}>
            <FavoriteIcon />
          </IconButton>
        <IconButton aria-label="add to shopping cart" onClick={() => addToCart(product)}>
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
