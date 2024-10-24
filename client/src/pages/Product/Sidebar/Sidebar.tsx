import React from 'react';
import './Sidebar.css';
import { BrandInterface, CategoriesInterface, CategoryProps } from '../../../constants/Interfaces';
import { Link, useNavigate } from 'react-router-dom';
import CONSTANTS from '../../../constants/constants';
import { generateQuery, useQuery } from '../../../constants/Helper';


const Sidebar: React.FC<CategoryProps> = ({ category, brand }) => {

  const _params = useQuery();
  const navigate = useNavigate();

  const handleBrands = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value: number = Number(e.target.value);

    if (value) {
      let currentSelectedBrands: Array<number> = []
      currentSelectedBrands = _params.brand_id ? JSON.parse(_params.brand_id) : []

      if (checked) {
        if (!currentSelectedBrands.includes(value)) {
          currentSelectedBrands.push(value)
        }
      } else {
        const index = currentSelectedBrands.indexOf(value)
        currentSelectedBrands.splice(index, 1)
      }

      const params = _params;
      Object.assign(params, { brand_id: JSON.stringify(currentSelectedBrands) })
      const redirect = generateQuery(params)
      navigate(CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCT_BASE + redirect)
    }
  }

  const handleCategory = (id: number) => {
    const params = _params;
    Object.assign(params, { category_id: id })
    const redirect = generateQuery(params)
    navigate(CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCT_BASE + redirect)
  }

  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <ul>
        <Link to={CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCTS_ONLY_CATEGORY(0)}><button className='product-button-2'>Reset Filter</button></Link>
        <h2>By Category</h2>
        {
          category.map((element: CategoriesInterface) => (
            <div key={element.id}>
              <button className='product-button-2' onClick={() => handleCategory(element.id)}>{element.name}</button>
            </div>
          ))
        }
        <h2>By Brands</h2>
        {
          brand.length > 0 && (
            brand.map((element: BrandInterface, index: number) => (
              <div key={index} className="checkbox-container">
                <label className="custom-checkbox">
                  <input type='checkbox' value={element.id} name={element.name} onChange={handleBrands} />
                  <span className="checkmark"></span>
                  {element.name}
                  <div>
                  </div>
                </label>
              </div>
            ))
          )
        }
      </ul>
    </div>
  );
};

export default Sidebar;
