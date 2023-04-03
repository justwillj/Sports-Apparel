import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Constants from '../../utils/constants';
import { useCartDispatch } from '../checkout-page/CartContext';

/**
 * @name useStyles
 * @description Material-ui styling for WishlistCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  row: {
    display: 'flex'
  },
  column: {
    flex: '50%',
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    bottom: '0',
    right: '0'
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
  }
}));

/**
 * @name WishlistCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const WishlistCard = ({ product }) => {
  const classes = useStyles();

  const dispatch = useCartDispatch();

  const addToCart = (item) => {
    // console.log(item);
    dispatch({ type: 'add', item });
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={Constants.PLACEHOLDER_IMAGE}
        title="placeholder"
      />
      <CardContent className={classes.row}>
        <div className={classes.column}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`${product.demographic} ${product.category} ${product.type}`}
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            Price: $
            {product.price}
          </Typography>
        </div>
        <div className={classes.column}>
          <div className={classes.icon}>
            <CardActions disableSpacing>
              <IconButton aria-label="add to shopping cart" onClick={() => addToCart(product)}>
                <AddShoppingCartIcon />
              </IconButton>
            </CardActions>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistCard;
