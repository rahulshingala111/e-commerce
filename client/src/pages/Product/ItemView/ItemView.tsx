import React, { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import './ItemView.css'
import { ProductInterface } from "../../../constants/Interfaces"
import ApiCall from "../../../constants/ApiCall"
import { AxiosResponse } from "axios"
import CONSTANTS from "../../../constants/constants"
const ItemView: React.FC = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [product, setProduct] = useState<ProductInterface>()

    useEffect(() => {
        console.log('hello');
        const productId = queryParams.get('product_id');
        const callme = async () => {
            const data: AxiosResponse = await ApiCall.get(`/product/item/${productId}`)
            setProduct(data.data)
        }
        callme()
    }, [])

    return (
        <>
            <div className="product-view">
                {product && (
                    <>
                        <div className="product-image">
                            <img src={CONSTANTS.path.server_url + '/' + product.img_path} alt={product.title} />
                        </div>
                        <div className="product-details">
                            <h1>{product.title}</h1>
                            <p className="price">${product.price}</p>
                            <p className="description">{product.description}</p>
                            <button className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
export default ItemView