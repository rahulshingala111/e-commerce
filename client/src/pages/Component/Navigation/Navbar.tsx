import React, { useEffect, useState } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token")
      if (token) {
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.log(error);

    }
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">MyStore</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/product">Product</a></li>

        <li className="dropdown">
          <a href="#">
            Products
          </a>
          <ul className="dropdown-menu">
            <li><a href="/products/men">Men</a></li>
            <li><a href="/products/women">Women</a></li>
            <li><a href="/products/accessories">Accessories</a></li>
          </ul>
        </li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div className="navbar-actions">
        <input type="text" placeholder="Search..." className="navbar-search" />
        {
          !isLoggedIn && (
            <Link to={'/login'}><button className="navbar-cart">Login/SignUp</button></Link>
          )
        }{
          isLoggedIn && (
            <button className='navbar'>Profile</button>
          )
        }
        <button className="navbar-cart">Cart</button>
      </div>
    </nav>
  );
};

export default Navbar;
