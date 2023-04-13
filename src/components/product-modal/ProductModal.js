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
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Modal } from '@material-ui/core';
import Constants, { PLACEHOLDER_IMAGE } from '../../utils/constants';
import { useCart } from '../checkout-page/CartContext';
/* eslint-disable */
import './ProductModal.css';
import { useCartDispatch } from '../checkout-page/CartContext';

// Design:
// White Background with darkgrey bar at top, light grey bar at bottom
// Rounded corners
// All content justified left except X

// Image at top
// "Department Category Type" underneath in dark blue
// The words Color Choice
// The colors in circles
// Description within transparent border
// Price at bottom

// TO DO:
// Plug in to program, get displaying non-hardcoded data
// Second swatch display
// Swatches display colors pulled from API
// Make sure the css page is properly linked

/**
 * @name ProductModal
 * @description displays single product modal component
 * @param {*} product product
 * @return component
 */
const ProductModal = ({ open,  product, close, onClick }) => {
    //placeholder data, change values to display from API
    // console.log(product);
    // console.log("Here I am")

    const department = product.demographic;
    const category = product.category;
    const type = product.type;
    const image = {PLACEHOLDER_IMAGE};
    const primaryColor = "Red"
    const secondaryColor = "Blue"
    const description = product.description;
    const price = "$19.99"


    const dispatch = useCartDispatch();

    const addToCart = (item) => {
      dispatch({ type: 'add', item });
    };

  return (
  <Modal open={open} onClose={close}>
    <div className="modal-container">
      <div className='topContainer'>
        <div className='top-bar'/>
        <button className='close' onClick={close}>X</button>
        <img className='productImg' alt="Product Image" src={product.imageUrl} />
      </div>
      <h2 className='name'>{department} {category} {type}</h2>
      
      <h3 className='swatchHeader'>Color Choice</h3>
      <div className='swatchContainer'>
        <div className= 'colorSwatch' id='primarySwatch' style={{backgroundColor: "Red"}}/>
        <div className= 'colorSwatch' id='secondarySwatch' style={{backgroundColor: "Blue"}}/>
      </div>
      
      <div className= 'description'>{description}</div>
      
      <div className='bottom-bar'>
        <div className= 'price'>{price}</div>
        <div className='icon'>
          <IconButton aria-label="add to shopping cart" onClick={() => addToCart(product)}>
            <AddShoppingCartIcon />
          </IconButton>
        </div>
        <div className='wishlist'>
        <IconButton aria-label="add to favorites" onClick={() => onClick(product)}>
          <FavoriteIcon />
        </IconButton>
        </div>
      </div>
    </div>
  </Modal>
  );
};

export default ProductModal;
