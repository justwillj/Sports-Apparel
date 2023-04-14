import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useCartDispatch } from '../checkout-page/CartContext';
import './WishlistCard.css';

/**
 * @name useStyles
 * @description Material-ui styling for WishlistCard component
 * @return styling
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px'
  },
  row: {
    display: 'flex'
  },
  icon: {
    position: 'relative',
    bottom: '20px',
    left: '165px'
  },
  media: {
    height: 40,
    paddingTop: '75%'
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
    dispatch({
      type: 'add',
      product: {
        id: item.id,
        name: item.name,
        description: item.description,
        demographic: item.demographic,
        category: item.category,
        type: item.type,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: 1
      }
    });
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.imageUrl}
        title="placeholder"
      />
      <CardContent>
        <div className={classes.row}>
          <Typography variant="body2" color="textSecondary" component="p">
            <b className="color">
              {`${product.demographic} ${product.category} ${product.type}`}
            </b>
          </Typography>
          <br />
        </div>
        <div className={classes.row}>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: $
            {product.price}
          </Typography>
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
