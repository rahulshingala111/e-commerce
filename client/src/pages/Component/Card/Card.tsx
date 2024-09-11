import React from 'react';
import './Card.css'

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
}

const Card: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <div className="product-price">${product.price.toFixed(2)}</div>
            <button className="product-button">Add to Cart</button>
        </div>
    );
};

export default Card;
