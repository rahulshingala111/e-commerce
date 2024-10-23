import React from 'react';
import './Sidebar.css';
import { BrandInterface, CategoriesInterface, CategoryProps } from '../../../constants/Interfaces';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CONSTANTS from '../../../constants/constants';

const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search)
}

const Sidebar: React.FC<CategoryProps> = ({ category, brand }) => {

  const query = useQuery();
  const navigate = useNavigate();

  const _params = {
    category_id: query.get('category_id') ?? null,
    brand_id: query.get('brand_id') ?? '[]'
  }

  const handleBrands = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value: number = Number(e.target.value);
    console.log(_params.brand_id);


    if (value) {
      let currentSelectedBrands: Array<number> = []
      currentSelectedBrands = JSON.parse(_params.brand_id)

      if (checked) {
        if (!currentSelectedBrands.includes(value)) {
          currentSelectedBrands.push(value)
        }
      } else {
        const index = currentSelectedBrands.indexOf(value)
        currentSelectedBrands.splice(index, 1)
      }
      navigate(CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCTS_FILTER_GET(_params.category_id, currentSelectedBrands.toString()))

    }
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
              <Link to={CONSTANTS.ROUTES.PRODUCT_PAGE.PRODUCTS_ONLY_CATEGORY(element.id) + `&brand_id=[]`}>
                <button className='product-button-2'>{element.name}</button>
              </Link>
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
