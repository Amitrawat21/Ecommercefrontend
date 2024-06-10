import React, { useState, useContext, useRef } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import logo from "../Assest/logo.png";
import cart_icon from "../Assest/cart_icon.png";
import nav_dropdown from "../Assest/nav_dropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

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
      </ul>
      <div className='nav-login-cart'>
        {localStorage.getItem('auth') ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
        {localStorage.getItem("auth") ? (
          <>
            <Link to="/cart">
              <img src={cart_icon} alt="Cart Icon" />
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
