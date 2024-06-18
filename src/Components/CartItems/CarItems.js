import React, { useContext, useState, useMemo ,useEffect } from 'react';
import "./CartItems.css";
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from "../Assest/cart_cross_icon.png";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from 'react-toastify';

const CartItems = () => {
  const KEY = "pk_test_51LvdGASGXtUoYRLzUHg0K0Vo4XcpgyFaW2YTBQEpBnfkcAhSgavP54nB53cGCPIZUyNoPntPmwmE73FJbHyAxlqq00UW0KQyqb";
  const { all_product, cartItems, addCart, removeCart, getTotalCartAmount, userEmail,  userCheckout  , getTotalCartItems , removeAllCart} = useContext(ShopContext);
  const [stripeToken, setStripeToken] = useState(null);
  const [checkout, setCheckout] = useState(localStorage.getItem('checkout') === 'true' || userCheckout.checkout);
  const[orderProduct , setOrderProduct] = useState([])

console.log(all_product , "alll")
  const isAuthenticated = localStorage.getItem("auth");

  const onToken = (token) => {
    setStripeToken(token);
  };

 console.log(getTotalCartItems() , "total cartttt")

  useEffect(() => {
    console.log('useEffect triggered'); // Debugging line
    console.log('Checkout state:', checkout); // Debugging line

    if (all_product.length > 0 && Object.keys(cartItems).length > 0) {
      const filteredProducts = all_product.filter(product => cartItems[product.id] > 0)
        .map(product => ({
          ...product,
          quantity: cartItems[product.id],
          totalPrice: cartItems[product.id] * product.new_price
        }));

      setOrderProduct(filteredProducts);
      console.log('filteredProducts:', filteredProducts);
    }
  }, [all_product, checkout, cartItems]);


  console.log(orderProduct , "orderrrrr")
  





  useEffect(() => {
    // Store checkout state in local storage when it changes
    localStorage.setItem('checkout', checkout);
  }, [checkout]); // Dependency on checkout state

  // New useEffect to initialize checkout state from local storage


  // New useEffect to store checkout state in local storage whenever it changes

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const paymentRes = await axios.post("https://ecommercebackend-11d1.onrender.com/payment", {
          tokenId: stripeToken.id,
          amount: getTotalCartAmount(),
        });

        if (paymentRes.data.success) {
          console.log("Payment successful");
          console.log(userEmail, "email");

          // const checkoutRes = await axios.post(
          //   "http://localhost:8000/checkout",
          //   { email: userEmail },
          //   {
          //     headers: {
          //       "auth": `${localStorage.getItem("auth")}`,
          //       "Content-Type": "application/json",
          //     },
          //   }
          // );

          // if (checkoutRes.data.success) {
          //   setCheckout(checkoutRes.data.resData.checkout);

          // } else {
          //   console.log("Checkout unsuccessful:", checkoutRes.data.message);
          // }
             
          const saveOrder = await axios.post("https://ecommercebackend-11d1.onrender.com/addToOrder" , { email : userEmail  , orderList : orderProduct })
          if(saveOrder.data.success){
            removeAllCart(userEmail)
          }

          else{
            console.log("product not added in orders")
          }
         

        } else {
          console.log("Payment unsuccessful:", paymentRes.data.message);
        }
      } catch (error) {
        console.error("Error making request:", error);
      }
    };

    if (stripeToken && getTotalCartAmount() >= 1) {
      makeRequest();
    }
  }, [stripeToken, getTotalCartAmount, userEmail]);




 

  // Logout function to clear local storage



  if (!isAuthenticated) {
    return <div className='cartitems-empty'></div>;
  }

  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product && all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className='cartitems-format cartitems-format-main'>
                <img className='carticon-product-icon' src={e.image} alt={e.name} />
                <p>{e.name}</p>
                <p>${e?.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img className='carticons-remove-icon' src={remove_icon} onClick={() => removeCart(e.id)} alt="Remove" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className='cartitems-down'>
        <div className='cartitems-total'>
          <h1>Cart Total</h1>
          <div>
            <div className='cartitems-total-items'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cartitems-total-items'>
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className='cartitems-total-items'>
              <p>Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
           
          </div>

          {Object.values(cartItems).reduce((acc, curr) => acc + curr, 0) === 0 ? (
            <button disabled style={{ backgroundColor: "lightgray" }}>PROCEED TO CHECKOUT</button>
          ) : (
            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${getTotalCartAmount()}`}
              token={onToken}
              amount={getTotalCartAmount() * 100}
              stripeKey={KEY}
            >
              {checkout ? (
                <button disabled style={{ backgroundColor: "green" }}>CHECKOUT</button>
              ) : (
                <button>PROCEED TO CHECKOUT</button>
              )}
            </StripeCheckout>
          )}
        </div>
        <div className='cartitems-promocode'>
          <p>If you have a promo code, enter it here</p>
          <div className='cartitems-promobox'>
            <input type='text' placeholder='Promocode' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
