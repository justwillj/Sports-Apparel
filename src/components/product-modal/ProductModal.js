import React from 'react';
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
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Constants from '../../utils/constants';
import { useCart } from '../checkout-page/CartContext';
import { Modal } from '@material-ui/core';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';

//White Background with darkgrey bar at top, light grey bar at bottom
//Rounded corners
//All content justified left except X

//Image at top
//"Department Category Type" underneath in dark blue
//The words Color Choice
//The colors in circles
//Description within transparent border
//Price at bottom


/**
 * @name useStyles
 * @description Material-ui styling for ProductModal component
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
 * @name ProductModal
 * @description displays single product modal component
 * @param {*} props product
 * @return component
 */
const ProductModal = ({ product }) => {
  const classes = useStyles();

//   const { dispatch } = useCart();

//   const onAdd = () => {
//     dispatch(
//       {
//         type: 'add',
//         product: {
//           id: product.id,
//           title: product.name,
//           price: product.price,
//           description: product.description,
//           quantity: 1
//         }
//       }
//     );
//   };

  return (
    <Modal className='ProductModal'>
        <img src={PLACEHOLDER_IMAGE}></img>
        <h2>{product.department} {product.category} {product.type}</h2>
        <h4>Color Choice</h4>
        
        <div className='ProductDescription'>
            <p>{product.description}</p>
        </div>
        <div>
            <h2>{product.price}</h2>
        </div>
    </Modal>

    // <Modal className={classes.root}>
    //   <ModalHeader
    //     avatar={(
    //       <Avatar aria-label="department" className={classes.avatar}>
    //         {product.department.charAt(0)}
    //       </Avatar>
    //     )}
    //     action={(
    //       <IconButton aria-label="settings">
    //         <MoreVertIcon />
    //       </IconButton>
    //     )}
    //     title={product.name}
    //     subheader={`${product.department} ${product.category} ${product.type}`}
    //   />
    //   <ModalMedia
    //     className={classes.media}
    //     image={Constants.PLACEHOLDER_IMAGE}
    //     title="placeholder"
    //   />
    //   <ModalContent>
    //     <Typography variant="body2" color="textSecondary" component="p">
    //       {product.description}
    //     </Typography>
    //     <br />
    //     <Typography variant="body2" color="textSecondary" component="p">
    //       Price: $
    //       {product.price}
    //     </Typography>
    //   </ModalContent>
    //   <ModalActions disableSpacing>
    //     <IconButton aria-label="add to favorites">
    //       <FavoriteIcon />
    //     </IconButton>
    //     <IconButton aria-label="share">
    //       <ShareIcon />
    //     </IconButton>
    //     <IconButton aria-label="add to shopping cart" onClick={onAdd}>
    //       <AddShoppingCartIcon />
    //     </IconButton>
    //   </ModalActions>
    // </Modal>
  );
};

export default ProductModal;
