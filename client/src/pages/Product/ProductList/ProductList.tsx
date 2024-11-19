import React, {useEffect, useState} from "react"
import {AxiosResponse} from "axios"
import ApiCall from "../../../constants/ApiCall"
import type {ParamsProps, ProductInterface} from "../../../constants/Interfaces"
import './ProductList.css'
import CONSTANTS from "../../../constants/constants"
import {generateQuery} from "../../../constants/Helper"
import {useNavigate} from "react-router-dom"
import CartButton from "../../Component/CartButton/CartButton"

const Produclist: React.FC<ParamsProps> = ({params}) => {

    const navigate = useNavigate();

    const [product, setProducts] = useState<Array<ProductInterface>>([])
    console.log("product lisrt page", params);


    useEffect(() => {
        const callme = async () => {
            try {
                const urlString = generateQuery(params as Record<string, string>)
                const apicall: AxiosResponse = await ApiCall.get(CONSTANTS.API_ENDPOINTS.PRODUCT.FETCH(urlString))
                if (apicall.status) {
                    setProducts(apicall.data);
                } else {
                    setProducts([])
                }

            } catch (error) {
                console.log(error);
            }
        }
        callme();
    }, [params])


    const onClickProduct = (product_id: number | null) => {
        if (product_id) {
            navigate(CONSTANTS.ROUTES.ITEM_PAGE.ITEM_BASE + '?' + `product_id=${product_id}`)

        } else {
            //
        }
    }


    return (
        <div className="product-container">
            <div className="product-list">
                {product.map(product => (
                    <div
                        key={product.id}
                        className="product-card"
                    >
                        <div className="product-layout">
                            <div className="product-image">
                                <img src={CONSTANTS.path.server_url + "/" + product.img_path} alt={product.title}/>
                            </div>

                            <div className="product-details">
                                <div>
                                    <h2 className="product-title">{product.title}</h2>
                                    <div className="rating-container">
                                        {/* <StarRating rating={product.rating} /> */}
                                        <span className="review-count">
                                            {product.review.length > 0 ? <></> : <>No reviews</>}
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="price-container">
                                        <span className="discounted-price">
                                            ₹{product.price}
                                        </span>
                                        <span className="original-price">
                                            ₹{product.price}
                                        </span>
                                        <span className="discount-badge">
                                            18%
                                        </span>
                                    </div>

                                    {/* Description */}
                                    {/* <p className="product-description">{product.description}</p> */}

                                    {/* Delivery and Stock */}
                                    <div className="info-container">
                                        <div className="info-item">
                                            <svg className="info-icon success" viewBox="0 0 24 24">
                                                <path fill="none" stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round" strokeWidth="2"
                                                      d="M5 13l4 4L19 7"/>
                                            </svg>
                                            <span>Delivery in 3 business days</span>
                                        </div>
                                        <div className="info-item">
                                            {/* {"table" === 'table' ? (
                                                <>
                                                    <svg className="info-icon success" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="2"
                                                            d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="stock-text in-stock">
                                                        In Stock (5 units)
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="info-icon error" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="2"
                                                            d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span className="stock-text out-of-stock">Out of Stock</span>
                                                </>
                                            )} */}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <CartButton onClick={() => onClickProduct(null)} product_id={product.id}/>
                                    <button className="view-button" onClick={() => onClickProduct(product.id)}>View
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* {product.length > 0 ?
                product.map((element: ProductInterface) => (
                    <Card key={element.id} product={element} />
                ))
                : <p>No item found</p>} */}
        </div>
    )
}
export default Produclist
