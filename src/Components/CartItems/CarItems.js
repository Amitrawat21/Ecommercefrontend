import React, { useContext, useState, useEffect } from 'react';
import "./CartItems.css";
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from "../Assest/cart_cross_icon.png";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from 'react-toastify';

const CartItems = () => {
  const KEY = "pk_test_51LvdGASGXtUoYRLzUHg0K0Vo4XcpgyFaW2YTBQEpBnfkcAhSgavP54nB53cGCPIZUyNoPntPmwmE73FJbHyAxlqq00UW0KQyqb";
  const { all_product, cartItems, addCart, removeCart, getTotalCartAmount, userEmail,  userCheckout } = useContext(ShopContext);
  const [stripeToken, setStripeToken] = useState(null);
  const [checkout, setCheckout] = useState(localStorage.getItem('checkout') === 'true' || userCheckout.checkout);

  const isAuthenticated = localStorage.getItem("auth");

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    // Store checkout state in local storage when it changes
    localStorage.setItem('checkout', checkout);
  }, [checkout]); // Dependency on checkout state

  // New useEffect to initialize checkout state from local storage


  // New useEffect to store checkout state in local storage whenever it changes

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const paymentRes = await axios.post("https://ecommercebackend-1-02g7.onrender.com/payment", {
          tokenId: stripeToken.id,
          amount: getTotalCartAmount(),
        });

        if (paymentRes.data.success) {
          console.log("Payment successful");
          console.log(userEmail, "email");

          const checkoutRes = await axios.post(
            "https://ecommercebackend-1-02g7.onrender.com/checkout",
            { email: userEmail },
            {
              headers: {
                "auth": `${localStorage.getItem("auth")}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (checkoutRes.data.success) {
            setCheckout(checkoutRes.data.resData.checkout);

          } else {
            console.log("Checkout unsuccessful:", checkoutRes.data.message);
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

  const cancelOrder = async () => {
    try {
      const response = await axios.put(
        "https://ecommercebackend-1-02g7.onrender.com/ordercancel",
        { email: userEmail },
        {
          headers: {
            "auth": `${localStorage.getItem("auth")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success && response.data.resData.checkout === true) {
        setCheckout(false); // Explicitly set to false after cancelling order
        toast.success("Order canceled successfully");
      } else {
        toast.error("Order cancellation unsuccessful");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("An error occurred while cancelling the order");
    }
  };

  // Logout function to clear local storage

  console.log(checkout , "checkout")

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
            {checkout ? (
              <div
                style={{
                  backgroundColor: "yellow",
                  textAlign: "center",
                  color: "black",
                  width: "150px",
                  borderRadius: "4px",
                  padding: "5px",
                  cursor: "pointer"
                }}
                onClick={cancelOrder}
              >
                <p>Cancel Order</p>
              </div>
            ) : (
              ""
            )}
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
