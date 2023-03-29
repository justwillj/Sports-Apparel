import './slideshow.css';
import React, { useEffect, useState } from "react";
import fetchProductsById from './SlideshowService';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Constants from '../../utils/constants';

/**
 * @name Slideshow
 * @description fetches and displays an advertisement slideshow for 3 products
 * @returns component
 */
const Slideshow = ({}) => {
    const [products, setProducts] = useState([]);
    const [productIds, setProductIds] = useState([1,2,3]);

    useEffect(async () => {
        setProductIds([1, 2, 3]);
        await fetchProductsById(setProducts, productIds);
    },[]);

    /**
     * @name randomDiscount
     * @description this method creates a random discount percentage from 15-40
     * used if product doesn't have a discount value
     * @returns random discount
     */
    const randomDiscount = () => {
        const discounts = [15, 20, 25, 30, 35, 40];

        return discounts[Math.floor(Math.random()*6)];
    };

    return (
        <div className = 'slideshowWindow' >
            {products && products.map((product) => (
                <div key={product.id} className = 'slide' style={{ backgroundImage: toString(Constants.PLACEHOLDER_IMAGE)}}>
                    <NavLink to={`/products/${product.id}`}>
                        <Button />
                        <p>{product.name ? product.name : 'Placeholder Name'} {product.discount ? product.discount : randomDiscount()}% OFF!</p>
                        <Button />
                    </NavLink>
                </div>
            ))}            
        </div>
    );
}

export default Slideshow;
