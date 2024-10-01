import React from 'react';
import './Sidebar.css';
import { Categories, CategoryProps } from '../../../constants/Interfaces';
import { Link } from 'react-router-dom';

const Sidebar: React.FC<CategoryProps> = ({ category }) => {
  console.log(category);

  return (
    <div className="sidebar">
      <h3>Filters</h3>
      <ul>
        {
          category.map((element: Categories) => (
            <Link to={`/product&categoryid=${element.id}`} ><li key={element.id}><a href="#">{element.name}</a></li></Link>
          ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;
