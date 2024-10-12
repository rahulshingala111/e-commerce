import React from 'react';
import './Sidebar.css';
import { BrandInterface, CategoriesInterface, CategoryProps } from '../../../constants/Interfaces';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search)
}

const Sidebar: React.FC<CategoryProps> = ({ category, brand }) => {

  const query = useQuery();
  const navigate = useNavigate();

  const _params = {
    category_id: query.get('category_id') ?? null,
    brand_id: query.get('brand_id') ?? null
  }

  const handleBrands = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value: number = Number(e.target.value);

    if (value && _params.brand_id) {
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
      navigate(`/product?category_id=${_params.category_id}&brand_id=[${currentSelectedBrands.toString()}]`)
    } else {
      //
    }
  }

  const handleApply = () => {
    const array = [1, 2, 3]
    console.log(array);
    console.log(array.toString());

    const strinbgArray = "[1,2,3]"
    console.log(JSON.parse(strinbgArray));

  }

  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <ul>
        <Link to={`/product?category_id=${0}&brand_id=${0}`}><button className='product-button-2'>Reset Filter</button></Link>
        <h2>By Category</h2>
        {
          category.map((element: CategoriesInterface) => (
            <div key={element.id}>
              <Link to={`/product?category_id=${element.id}&brand_id=${0}`}><button className='product-button-2'>{element.name}</button></Link>
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
      <button className='button-apply' onClick={handleApply}>Apply</button>
    </div>
  );
};

export default Sidebar;
