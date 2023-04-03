import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './PopularCard.css';

/* eslint-disable */
export default function PopularCard({productName, productImg}) {
  return (
    <Card sx={{ maxWidth: 390 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height= "260"
          width="300"
          image={productImg}
          alt="green iguana"
          className='card-img'
        />
        <CardContent className='text-background'>
          <Typography gutterBottom variant="h5" component="div" className='card-text' >
            {productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}