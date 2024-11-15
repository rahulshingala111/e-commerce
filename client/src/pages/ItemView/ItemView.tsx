import React, { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import './ItemView.css'
import type { ProductInterface } from "../../constants/Interfaces"
import ApiCall from "../../constants/ApiCall"
import CONSTANTS from "../../constants/constants"
import { useAuth } from "../../constants/AuthContext";

interface CommentInterface {
    id: number,
    product_id: number,
    review_string: string,
    rating: number
}
const ItemView: React.FC = () => {

    const { isLoggedin } = useAuth();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [loading, setLoading] = useState<boolean>(true)

    const [product, setProduct] = useState<ProductInterface>()
    const [reviews, setReviews] = useState<Array<CommentInterface>>([])


    const [writeComment, setWriteComments] = useState<string>('')
    const [ratingComment, setRatingComment] = useState<number>()

    useEffect(() => {
        const productId = queryParams.get('product_id');
        const callme = async () => {
            try {
                const [productFetch, reviewFetch] = await Promise.all([
                    ApiCall.get(CONSTANTS.API_ENDPOINTS.ITEM.FETCH(productId)),
                    ApiCall.get(CONSTANTS.API_ENDPOINTS.PRODUCT.FETCH_COMMENT(productId))
                ])
                setProduct(productFetch.data)
                setReviews(reviewFetch.data)
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)
            }
        }
        callme()
    }, [])

    const handleSubmitComment = async () => {
        if (isLoggedin) {
            if (writeComment.length > 0) {
                console.log(writeComment);

                try {
                    const insertComment = await ApiCall.post(CONSTANTS.API_ENDPOINTS.PRODUCT.CREATE_COMMENT, {
                        product_id: product?.id ?? null,
                        comment: writeComment,
                        rating: ratingComment
                    })
                    console.log(insertComment);

                } catch (error) {
                    console.log(error);
                }
            } else {
                alert('write the comments first')
            }
        } else {
            alert('you must login first')
        }
    }

    return (
        !loading && (
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
                <div>
                    Comment Section
                    <div>
                        All Comments
                    </div>
                    <div>
                        {reviews.length > 0 && reviews.map((element: CommentInterface, index: number) => (
                            <div key={index}>
                                <ul>
                                    <li>
                                        Rating: {element.rating} Comment: {element.review_string}
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div>
                        Add Comments
                    </div>
                    <div>
                        <textarea rows={10} cols={50} maxLength={200} minLength={5} onChange={(e) => setWriteComments(e.target.value)} />
                    </div>
                    <div>
                        <input type="number" maxLength={1} max={5} min={0} onChange={(e) => setRatingComment(Number(e.target.value))} />
                    </div>
                    <div>
                        <button onClick={handleSubmitComment}>Submit</button>
                    </div>
                </div>
            </>
        )
    )
}
export default ItemView