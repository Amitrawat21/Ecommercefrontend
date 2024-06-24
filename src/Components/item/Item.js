import React, { useState } from 'react';
import "./item.css";
import { Link } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Item = (props) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    // Optionally handle the error, e.g., show a default image
  };

  const handleClick = () => {
    if (props.scrollToTop === false) {
      if (localStorage.getItem('auth')) {
        window.scrollTo(0, 0); // Scroll to top only if scrollToTop prop is false
      }
    } else {
      window.scrollTo(0, 0);
    }
    // Any other click behavior
  };

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <div style={{ position: 'relative' }}>
          {loading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 150,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.5)' // Optional background overlay
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <img
            onClick={handleClick}
            src={props.image}
            alt=''
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: loading ? 'none' : 'block' }}
          />
        </div>
      </Link>
      <p>{props.name}</p>
      <div className='item-prices'>
        <div className='item-price-new'>
          ${props.new_price}
        </div>
        <div className='item-price-old'>
          ${props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;
