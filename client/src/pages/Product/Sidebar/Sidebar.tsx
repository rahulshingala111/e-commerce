import React from 'react';
import './Sidebar.css';
import { Categories, CategoryProps } from '../../../constants/Interfaces';

const Sidebar: React.FC<CategoryProps> = ({ category }) => {
  console.log(category);

  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <ul>
        {
          category.map((element: Categories) => (
            <li key={element.id}><a href="#">{element.name}</a></li>
          ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;
