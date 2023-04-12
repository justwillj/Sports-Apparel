import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardAction } from '@mui/material';
import './NewProduct.css';
import { NavLink } from 'react-router-dom';

/* eslint-disable */
export default function NewProductCard({productImg,productName,productCategory, productDepartment,productDes ,link,productId}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height= "auto"
          image={productImg}
          alt={productName}
          className="newCard-img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <p className='category'>{productDepartment} | {productCategory}</p>
            {productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {productDes}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <NavLink  style={{ textDecoration: 'none' }} to={`/products/${productId}`} key={productId} >
          View
          </NavLink>
        </Button>
      </CardActions>
    </Card>
  );
}