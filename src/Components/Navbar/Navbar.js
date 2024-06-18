import React, { useState, useContext, useRef  , useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { Link , useLocation } from 'react-router-dom';
import "./Navbar.css";
import logo from "../Assest/logo.png";
import cart_icon from "../Assest/cart_icon.png";
import nav_dropdown from "../Assest/nav_dropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const location = useLocation();
  const auth = localStorage.getItem('auth')

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setMenu("shop");
    } else if (path.includes("/mens")) {
      setMenu("mens");
    } else if (path.includes("/womens")) {
      setMenu("womens");
    } else if (path.includes("/kids")) {
      setMenu("kids");
    } else if (path.includes("/orders")) {
      setMenu("my-orders");
    } else if (path.includes("/cart")) {
      setMenu("cart");
    }
  }, [location]);


  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle('open');
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("checkout");
    window.location.replace("/");
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="Logo" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown Icon" />
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={() => setMenu("shop")}>
          <Link to="/">Shop</Link>
          {menu === "shop" ? <hr /> : ""}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link to="/mens">Men</Link>
          {menu === "mens" ? <hr /> : ""}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link to="/womens">Women</Link>
          {menu === "womens" ? <hr /> : ""}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids">Kids</Link>
          {menu === "kids" ? <hr /> : ""}
        </li>
        {
           auth && (
            <li onClick={() => setMenu("my-orders")}>
            <Link to="/orders">Orders</Link>
            {menu === "my-orders" ? <hr /> : ""}
          </li>

           )
        }
       
      </ul>
      <div className='nav-login-cart'>
        {localStorage.getItem('auth') ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login"><button className='login_button'>Login</button></Link>
        )}
        {localStorage.getItem("auth") ? (
          <>
            <Link to="/cart">
              <img className  = 'cart_icon' src={cart_icon} alt="Cart Icon" />
            </Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
          </>
        ) : (
          <>
            <Link to="/cart"></Link>
            <div></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
