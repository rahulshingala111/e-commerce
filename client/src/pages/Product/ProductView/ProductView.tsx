import React, { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import './ProductView.css'
import { Product } from "../../../constants/Interfaces"
import ApiCall from "../../../constants/ApiCall"
import { AxiosResponse } from "axios"
import CONSTANTS from "../../../constants/constants"
const ProductView: React.FC = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [product, setProduct] = useState<Product>({
        img_path: 'asdasd',
        title: "asdsad",
        description: 'asdasd',
        categories: {
            id: 0,
            name: 'asdasd'
        },
        id: 0,
        price: 0
    })

    useEffect(() => {
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
                <div className="product-image">
                    <img src={CONSTANTS.path.server_url + '/' + product.img_path} alt={product.title} />
                </div>
                <div className="product-details">
                    <h1>{product.title}</h1>
                    <p className="price">${product.price}</p>
                    <p className="description">{product.description}</p>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </>
    )
}
export default ProductView