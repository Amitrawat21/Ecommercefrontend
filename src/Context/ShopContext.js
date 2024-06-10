import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 350 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [userEmail, setUserEmail] = useState("");
  const [userCheckout, setUserCheckout] = useState({});

  const alldata = async () => {
    const res = await axios.get("https://ecommercebackend-1-02g7.onrender.com/getAllProduct");
    setAll_Product(res.data.data);
  };

  const addCart = async (itemId) => {
    try {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));

      if (localStorage.getItem("auth")) {
        const response = await axios.post(
          "https://ecommercebackend-1-02g7.onrender.com/addtocart",
          {
            itemId,
          },
          {
            headers: {
              "auth ": `${localStorage.getItem("auth")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if(response.data.success){
         toast.success("Product added to cart");
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeCart = async (itemId) => {
    try {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));

      if (localStorage.getItem("auth")) {
        await axios.post(
          "https://ecommercebackend-1-02g7.onrender.com/removefromcart",
          {
            itemId,
          },
          {
            headers: {
              "auth ": `${localStorage.getItem("auth")}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo?.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalCart = 0;
    for (const productIndex in cartItems) {
      if (cartItems[productIndex] > 0) {
        totalCart += cartItems[productIndex];
      }
    }
    return totalCart;
  };

  const getCartData = async () => {
    try {
      if (localStorage.getItem("auth")) {
        const response = await axios.get(
          "https://ecommercebackend-1-02g7.onrender.com/getcart",
          {
            headers: {
              "auth ": `${localStorage.getItem("auth")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if(response.data.success){
          setCartItems(response.data.userdata.cartData);
          setUserEmail(response.data.userdata.email);
        }
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const getallcart = async (email) => {
    try {
      const response = await axios.get(
        "https://ecommercebackend-1-02g7.onrender.com/allcart",
        {
          headers: {
            "auth": `${localStorage.getItem("auth")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
     
        const res = response.data.allcheckoutData.find((ele) => ele.email === userEmail);
        if (res) {
          setUserCheckout(res);
          console.log(res, "User checkout data");
        }
      }
    } catch (error) {
      console.error("Error fetching all cart data:", error);
    }
  };

  useEffect(() => {
    alldata();
    getCartData();
    getallcart()
  }, []);

  useEffect(() => {
    if (userEmail) {
      getallcart();
    }
  }, [userEmail]);



  const contextValue = {
    getTotalCartAmount,
    all_product,
    cartItems,
    userEmail,
    addCart,
    removeCart,
    getTotalCartItems,
    userCheckout,
  };

  return (
    <>
      <ShopContext.Provider value={contextValue}>
        {props.children}
      </ShopContext.Provider>
      <ToastContainer autoClose={500} />
    </>
  );
};

export default ShopContextProvider;
