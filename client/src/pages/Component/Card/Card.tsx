import React from 'react';
import './Card.css'
import CONSTANTS from '../../../constants/constants';
import { ProductCardProps } from '../../../constants/Interfaces';

const Card: React.FC<ProductCardProps> = ({ product }) => {
    console.log(product);
    return (
        <div className="product-card">
            <img src={CONSTANTS.path.server_url + '/' + product.img_path} alt={product.title} className="product-image" />
            <h2 className="product-name">item name : {product.title}</h2>
            <p className="product-description">description : {product.description}</p>
            <p className="product-description">category : {product.categories.name}</p>
            <div className="product-price">${product.price.toFixed(2)}</div>
            <button className="product-button">Add to Cart</button>
        </div>
    );
};

export default Card;
