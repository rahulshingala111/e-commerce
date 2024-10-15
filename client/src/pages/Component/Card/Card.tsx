import React from 'react';
import './Card.css'
import CONSTANTS from '../../../constants/constants';
import { ProductCardProps } from '../../../constants/Interfaces';
import CartButton from '../CartButton/CartButton';

const Card: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <>
            <div className="product-card2">
                <div className="product-image">
                    <img src={CONSTANTS.path.server_url + '/' + product.img_path} alt={product.title} className='product-image' />
                </div>
                <div className="product-info">
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-price">₹{product.price.toFixed(2)}</p>
                    <div className="product-rating">
                        <span>⭐⭐⭐⭐⭐</span> (123)
                    </div>
                    <div className="product-delivery">
                        <p>Free Delivery: <strong>Tomorrow</strong></p>
                    </div>
                    {/* <button className="add-to-cart-btn">Add to Cart</button> */}
                    <CartButton product_id={product.id} />
                </div>
            </div>

        </>
    );
};

export default Card;
