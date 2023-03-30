import React, { useEffect, useRef, useState } from 'react';
import './slideshow.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Constants from '../../utils/constants';

/**
 * @name Slideshow
 * @description fetches and displays an advertisement slideshow for 3 products
 * @returns component
 */
const Slideshow = () => {
  const [products, setProducts] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const slideTimeRef = useRef(null);

  /**
   * @name randomDiscount
   * @description this method creates a random discount percentage from 15-40
   * used if product doesn't have a discount value
   * @returns random discount
   */
  const randomDiscount = () => {
    const discounts = [15, 20, 25, 30, 35, 40];

    return discounts[Math.floor(Math.random() * 6)];
  };

  // loads 3 products
  useEffect(() => {
    /**
     * @name fetchProducts
     * @description fetch products gets 3 products and adds a random discount if one is not included
     * @returns setProducts
     */
    const fetchProducts = async () => {
      Promise.all([
        axios.get(`http://localhost:8085/products/${productIds[0]}`, { headers: { Authorization: 'Bearer ' } }),
        axios.get(`http://localhost:8085/products/${productIds[1]}`, { headers: { Authorization: 'Bearer ' } }),
        axios.get(`http://localhost:8085/products/${productIds[2]}`, { headers: { Authorization: 'Bearer ' } })
      ])
        .then((response) => {
          const responses = [response[0], response[1], response[2]];

          if (
            responses[0].status === 200
            && responses[1].status === 200
            && responses[2].status === 200
          ) {
            const newProducts = ([]);
            response.forEach((product) => {
              if (!product.data.discount) {
                newProducts.push({ ...product.data, discount: randomDiscount() });
              } else {
                newProducts.push({ ...product.data });
              }
            });
            setProducts(newProducts);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    /**
     * @name defaultIds
     * @description this method grabs generic ids
     * @returns setProductIds
     */
    const defaultIds = async () => {
      await setProductIds([1, 2, 3]);
    };

    // checks if it needs to load products
    if (products.length === 0) {
      // checks if needs to generate product ids
      if (productIds.length === 0) {
        // stores product ids
        defaultIds();
      } else {
        // stores products
        fetchProducts();
      }
    }
  }, [productIds]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * @name nextSlide
   * @description method moves slideshow to next slide
   * @returns setslideIndex
   */
  const nextSlide = () => {
    if (slideIndex < 2) {
      const newIndex = slideIndex + 1;
      setSlideIndex(newIndex);
    } else if (slideIndex === 2) {
      const newIndex = 0;
      setSlideIndex(newIndex);
    }
  };

  /**
   * @name prevSlide
   * @description method moves slideshow to previous slide
   * @returns setslideIndex
   */
  const prevSlide = () => {
    if (slideIndex > 0) {
      const newIndex = slideIndex - 1;
      setSlideIndex(newIndex);
    } else if (slideIndex === 0) {
      const newIndex = 2;
      setSlideIndex(newIndex);
    }
  };

  /**
   * @name resetTimer
   * @description cancels setTimeout
   */
  const resetTimer = () => {
    if (slideTimeRef.current) {
      clearTimeout(slideTimeRef.current);
    }
  };

  // handles slideshow timer
  useEffect(() => {
    // clear timeout, used in case where user clicks prev or next button
    resetTimer();
    // timer moves slideshow to next ad every 10 seconds
    slideTimeRef.current = setTimeout(() => { nextSlide(); }, 10000);
  }, [slideIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="slideshow-container">
      <div className="slideshow-wrapper">
        <button type="button" className="prev-slide" onClick={prevSlide}>&#10094;</button>
        <div className="slide-wrapper">
          {products.length > 0 && (
            <div className="slide" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
              {products.map((product) => (
                <NavLink to={`/products/${product.id}`} key={product.id} style={{ backgroundImage: `url(${Constants.PLACEHOLDER_IMAGE})` }}>
                  <span>{`${product.name ? product.name : 'Placeholder Name'} ${product.discount}% OFF!`}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
        <button type="button" className="next-slide" onClick={nextSlide}>&#10095;</button>
      </div>
    </div>
  );
};

export default Slideshow;
