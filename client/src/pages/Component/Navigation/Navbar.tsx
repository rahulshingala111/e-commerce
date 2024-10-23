import React, { useEffect, useState } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import ApiCall from '../../../constants/ApiCall';
import { AxiosResponse } from 'axios';
import { CategoriesInterface } from '../../../constants/Interfaces';
import CONSTANTS from '../../../constants/constants';
import { useAuth } from '../../../constants/AuthContext';
import { generateQuery, useQuery } from '../../../constants/Helper';

const Navbar: React.FC = () => {

  const [categories, setCategories] = useState<Array<CategoriesInterface>>([])
  const [search, setSearch] = useState<string>()

  const navigate = useNavigate();
  const _params = useQuery();
  const { isLoggedin } = useAuth();

  useEffect(() => {
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

  const handleSearch = () => {
    if (search) {
      console.log(search);
      const params = _params
      Object.assign(params, { search: search })
      const redirect = generateQuery(params)
      navigate(CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCT_BASE + redirect)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Sahara Store</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>

        <li className="dropdown">
          <div>
            Products
          </div>
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
        <input type="text" placeholder="Search..." className="navbar-search" onChange={(e) => setSearch(e.target.value)} />
        <button type="button" onClick={handleSearch}>seach</button>
        {
          !isLoggedin && (
            <Link to={'/login'}><button className="navbar-cart">Login/SignUp</button></Link>
          )
        }{
          isLoggedin && (
            <Link to={'/profile'}><button className='navbar'>Profile</button></Link>
          )
        }
        <Link to={'/cart'}> <button className="navbar-cart">Cart</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
