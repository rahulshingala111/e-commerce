import React from 'react';
import './Sidebar.css';
import { BrandInterface, CategoriesInterface, CategoryProps } from '../../../constants/Interfaces';
import { Link } from 'react-router-dom';

const Sidebar: React.FC<CategoryProps> = ({ category, brand }) => {
  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <ul>
        <Link to={`/product?category_id=${0}$brand_id=${0}`}><button className='product-button-2'>Reset Filter</button></Link>
        <h2>By Category</h2>
        {/* {
          category.map((element: CategoriesInterface) => (
            <div key={element.id}>
              <Link to={`/product?category_id=${element.id}&brand_id=${0}`} ><button className='product-button-2'>{element.name}</button></Link>
            </div>
          ))
        } */}
        {
          category.map((element: CategoriesInterface, index: number) => (
            <div key={index} className="checkbox-container">
              <label className="custom-checkbox">
                <input type='checkbox' name={element.name} onChange={() => console.log('checked', element.id, element.name)} />
                <span className="checkmark"></span>
                {element.name}
              </label>
            </div>
          ))
        }
        <h2>By Brands</h2>
        {/* {
          brand.length > 0 && (
            brand.map((element: BrandInterface, index: number) => (
              <div key={index}>
                <Link to={`/product?category_id=${element.id}&brand_id=${element.id}`} ><button className='product-button-2'>{element.name}</button></Link>
              </div>
            ))
          )
        } */}
        {
          brand.length > 0 && (
            brand.map((element: BrandInterface, index: number) => (
              <div key={index} className="checkbox-container">
                <label className="custom-checkbox">
                  <input type='checkbox' value={element.id} name={element.name} onChange={(e) => console.log('checked', element.id, element.name, e.target.value)} />
                  <span className="checkmark"></span>
                  {element.name}
                </label>
              </div>
            ))
          )
        }
      </ul>
      <button className='button-apply'>Apply</button>
    </div>
  );
};

export default Sidebar;
