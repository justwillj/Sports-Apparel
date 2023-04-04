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
import './ProductModal.css';
import { useState } from 'react';

//Design:
//White Background with darkgrey bar at top, light grey bar at bottom
//Rounded corners
//All content justified left except X

//Image at top
//"Department Category Type" underneath in dark blue
//The words Color Choice
//The colors in circles
//Description within transparent border
//Price at bottom


//TO DO: 
//Plug in to program, get displaying non-hardcoded data
//Second swatch display
//Swatches display colors pulled from API
//Make sure the css page is properly linked

/**
 * @name ProductModal
 * @description displays single product modal component
 * @param {*} props product
 * @return component
 */
const ProductModal = ({ product, handleOpen }) => {
    //placeholder data, change values to display from API
    handleOpen={open}
    onClose={handleClose}
    const department = product.demographic;
    const category = product.category;
    const type = product.type;
    const image = {PLACEHOLDER_IMAGE};
    const primaryColor = "Red"
    const secondaryColor = "Lilac"
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure"
    const price = "$19.99"

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
  <Modal className="modal">
    <div className="modal-container">
      <div className='topContainer'>
        <div className='top-bar'/>
        <button className='close' onClick={close}>X</button>
        <img src= {image}/>
      </div>
      <h2 className='name'>{department} {category} {type}</h2>
      
      <h4 className='swatchHeader'>Color Choice</h4>
      <div className='swatchContainer'>
        <div className= 'colorSwatch' id='primarySwatch' style={{backgroundColor: "Red"}}/>
        <div className= 'colorSwatch' id='secondarySwatch' style={{backgroundColor: "Blue"}}/>
      </div>
      
      <div className= 'description'>{description}</div>
      
      <div className='bottom-bar'>
        <div className= 'price'>{price}</div>
        <button className='icon' img src={AddShoppingCartIcon}/>
      </div>
    </div>
  </Modal>
  );
}

export default ProductModal;
