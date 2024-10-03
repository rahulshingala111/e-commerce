import React from 'react';
import './Card.css'
import CONSTANTS from '../../../constants/constants';
import { ProductCardProps } from '../../../constants/Interfaces';
import { Link } from 'react-router-dom';
import CartButton from '../CartButton/CartButton';

const Card: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            <img src={CONSTANTS.path.server_url + '/' + product.img_path} alt={product.title} className="product-image" />
            <h2 className="product-name">item name : {product.title}</h2>
            <p className="product-description">description : {product.description}</p>
            <p className="product-description">category : {product.categories.name}</p>
            <div className="product-price">₹{product.price.toFixed(2)}</div>
            <CartButton product_id={product.id} />
            <Link to={`/item?product_id=${product.id}`}><button className="product-button">View</button></Link>
        </div>
    );
};

export default Card;
