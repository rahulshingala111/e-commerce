import React, { FormEvent, useEffect, useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
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

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (search) {
      console.log(search);
      const params = _params
      Object.assign(params, { search: search })
      const redirect = generateQuery(params)
      navigate(CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCT_BASE + redirect)
    }
  }

  const handleCartNavigation = () => {
    navigate(CONSTANTS.ROUTES.CART.CART_PAGE)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="store-name">sahara store</div>

        <div className="nav-left">

          <div className="browse-container">
            <button className="browse-btn">
              ☰ Browse
            </button>
            <div className="categories-dropdown">
              <div className="category-section">
                <div className="category-title">Electronics</div>
                <div className="category-links">
                  {
                    categories.map((element: CategoriesInterface, index: number) => (
                      <a key={index} id={element.id.toString()} href="#" className="category-link">
                        📱 {element.name}
                      </a>
                    ))
                  }
                  <a href="#" className="category-link">
                    💻 Laptops
                  </a>
                  <a href="#" className="category-link">
                    🎧 Audio
                  </a>
                </div>
              </div>

              <div className="category-section">
                <div className="category-title">Fashion</div>
                <div className="category-links">
                  <a href="#" className="category-link">
                    👕 Men's Clothing
                  </a>
                  <a href="#" className="category-link">
                    👗 Women's Clothing
                  </a>
                  <a href="#" className="category-link">
                    👟 Footwear
                  </a>
                </div>
              </div>

              <div className="category-section">
                <div className="category-title">Home & Living</div>
                <div className="category-links">
                  <a href="#" className="category-link">
                    🛋️ Furniture
                  </a>
                  <a href="#" className="category-link">
                    🏠 Decor
                  </a>
                  <a href="#" className="category-link">
                    🔧 Tools
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="search-container">
          <span className="search-icon">🔍</span>
          <form onSubmit={handleSearch}>
            <input type="text" className="search-bar" onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
          </form>
        </div>

        <div className="nav-icons">
          <button className="icon-button" onClick={handleCartNavigation}>
            🛒
            <span className="cart-count">1</span>
          </button>

          <button className="user-button">
            <span className="user-icon">👤</span>
            <span className="user-text">
              {
                isLoggedin ? <>user</> : <>login</>
              }
            </span>
          </button>

          <div className="dropdown">
            <button className="icon-button">
              ☰
            </button>
            <div className="dropdown-content">
              <a href="#">home</a>
              <a href="#">products</a>
              <a href="#">about</a>
              <a href="#">contact</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
