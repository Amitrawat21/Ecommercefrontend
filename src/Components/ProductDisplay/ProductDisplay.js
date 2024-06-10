import React, { useContext, useEffect , useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assest/star_icon.png";
import star_dull_icon from "../Assest/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addCart } = useContext(ShopContext);
  const [isAdding, setIsAdding] = useState(false);

 
  const handleFunction = () => {
    toast.info("Please login first");
  };

  const handleAddToCart = async () => {
    await addCart(product.id);
    setIsAdding(true); // Set isAdding to true to disable the button
  
    // Wait for 2.5 seconds
    setTimeout(async () => {
      setIsAdding(false); // After 2.5 seconds, set isAdding to false to enable the button again
    }, 2000);
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product?.image} />
          <img src={product?.image} />
          <img src={product?.image} />
          <img src={product?.image} />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product?.image} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product?.name}</h1>
        <div className="product-right-star">
          <img src={star_icon} />
          <img src={star_icon} />
          <img src={star_icon} />
          <img src={star_icon} />
          <img src={star_dull_icon} />
          <p>(p122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product?.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product?.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          a light weight . usually knitted pullover shirt , close-fiiting and a
          round neckline and short sleevs , worn as n undershirt or outergarment
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={localStorage.getItem("auth") ? handleAddToCart : handleFunction} disabled={isAdding}>
          {isAdding ? 'ADDING...' : 'ADD TO CART'}
        </button>
        <p className="productdisplay-rightcategory">
          <span>Category:</span>
          {product?.category}
        </p>
        <p className="productdisplay-rightcategory">
          <span>Tags:</span>Modern, latest
        </p>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default ProductDisplay;
