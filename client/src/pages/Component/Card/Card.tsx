import React, { useEffect, useState } from 'react';
import './Card.css'
import CONSTANTS from '../../../constants/constants';
import { ProductCardProps } from '../../../constants/Interfaces';
import CartButton from '../CartButton/CartButton';
import ApiCall from '../../../constants/ApiCall';

const Card: React.FC<ProductCardProps> = ({ product }) => {

    const [imageData, setImageData] = useState<string>()

    useEffect(() => {

        async function callme() {
            const blobImage : BlobPart = await ApiCall.get(CONSTANTS.path.server_url + '/' + product.img_path, {
                responseType: 'blob'
            })

            const newBlob = new Blob([blobImage], { type: 'image/jpeg' })
            const imageObjectURL = URL.createObjectURL(newBlob)
            setImageData(imageObjectURL)
        }
        callme()
    }, [])



    return (
        <>
            <div className="product-card2">
                <div className="product-image">
                    <img src={imageData} alt={product.title} className='product-image' />
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
                    <CartButton product_id={product.id} />
                </div>
            </div>

        </>
    );
};

export default Card;
