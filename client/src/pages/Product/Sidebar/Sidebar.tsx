import React from 'react';
import './Sidebar.css';
import { CategoriesInterface, CategoryProps } from '../../../constants/Interfaces';
import { Link } from 'react-router-dom';

const Sidebar: React.FC<CategoryProps> = ({ category }) => {
  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <ul>
        {
          category.map((element: CategoriesInterface) => (
            <Link key={element.id} to={`/product?category_id=${element.id}`} ><li key={element.id}>{element.name}</li></Link>
          ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;
