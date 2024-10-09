import React from 'react';
import './Sidebar.css';
import { CategoriesInterface, CategoryProps } from '../../../constants/Interfaces';
import { Link } from 'react-router-dom';

const Sidebar: React.FC<CategoryProps> = ({ category }) => {
  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <ul>
        <Link to={`/product?category_id=${0}`}><button className='product-button-2'>All</button></Link>
        {
          category.map((element: CategoriesInterface) => (
            <div key={element.id}>
              <Link to={`/product?category_id=${element.id}`} ><button className='product-button-2'>{element.name}</button></Link>
            </div>
          ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;
