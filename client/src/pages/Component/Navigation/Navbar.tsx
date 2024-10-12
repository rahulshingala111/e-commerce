import React, { useEffect, useState } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import ApiCall from '../../../constants/ApiCall';
import { AxiosResponse } from 'axios';
import { CategoriesInterface } from '../../../constants/Interfaces';
import CONSTANTS from '../../../constants/constants';

const Navbar: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [categories, setCategories] = useState<Array<CategoriesInterface>>([])


  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token")
      if (token) {
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.log(error);
    }

    const callme = async () => {
      try {
        const category: AxiosResponse = await ApiCall.get(CONSTANTS.API_ENDPOINTS.CATEGORY.FETCH)
        if (category.status) {
          setCategories(category.data)
        }

      } catch (error) {
        console.log(error);

      }
    }
    callme()
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Sahara Store</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>

        <li className="dropdown">
          <Link to={CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCT_BASE}>
            <div>
              Products
            </div>
          </Link>
          <ul className="dropdown-menu">
            {
              categories.map((elemnt: CategoriesInterface) => (
                <Link key={elemnt.id} to={CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCTS_ONLY_CATEGORY(elemnt.id)}><li>{elemnt.name}</li></Link>
              ))
            }
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
            <Link to={'/profile'}><button className='navbar'>Profile</button></Link>
          )
        }
        <Link to={'/cart'}> <button className="navbar-cart">Cart</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
