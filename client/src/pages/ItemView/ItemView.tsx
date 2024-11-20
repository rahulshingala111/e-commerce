import React, {useEffect, useState} from "react"
import {useLocation} from 'react-router-dom';
import './ItemView.css'
import type {ProductInterface} from "../../constants/Interfaces"
import ApiCall from "../../constants/ApiCall"
import CONSTANTS from "../../constants/constants"
import {useAuth} from "../../constants/AuthContext";

interface ReviewsInterface {
    id: number,
    product_id: number,
    review_string: string,
    rating: number,
    user: {
        first_name: string,
        last_name: string
    }
}

interface CommentInterface {
    reviews: Array<ReviewsInterface>,
    avg_rating: number,
    count: number
}

const ItemView: React.FC = () => {

    const {isLoggedin} = useAuth();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [loading, setLoading] = useState<boolean>(true)

    const [product, setProduct] = useState<ProductInterface>()
    const [reviews, setReviews] = useState<CommentInterface>({reviews: [], avg_rating: 0, count: 0})


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
                if (reviewFetch.data.reviews) {
                    setReviews(reviewFetch.data)
                }
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false)
            }
        }
        callme()
    }, [])

    const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isLoggedin) {
            if (writeComment.length > 0 && product && writeComment && ratingComment) {
                try {
                    const insertComment = await ApiCall.post(CONSTANTS.API_ENDPOINTS.PRODUCT.CREATE_COMMENT, {
                        product_id: product.id ?? null,
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
            window.location.href = '/login'
        }
    }

    const productss = {
        images: [
            "https://media.giphy.com/media/bEs5iSFML4x0nSW1LC/giphy.gif?cid=790b7611ndqipyh20k5ot92c8tqrurpy62jc60cnhwfbvdwd&ep=v1_gifs_search&rid=giphy.gif&ct=g",
            "https://media.giphy.com/media/bEs5iSFML4x0nSW1LC/giphy.gif?cid=790b7611ndqipyh20k5ot92c8tqrurpy62jc60cnhwfbvdwd&ep=v1_gifs_search&rid=giphy.gif&ct=g",
            "https://media.giphy.com/media/bEs5iSFML4x0nSW1LC/giphy.gif?cid=790b7611ndqipyh20k5ot92c8tqrurpy62jc60cnhwfbvdwd&ep=v1_gifs_search&rid=giphy.gif&ct=g"
        ],
        specs: [
            "100% Genuine Leather",
            "YKK Zippers",
            "Inner Polyester Lining",
            "Available in Black and Brown"
        ]
    };

    const [selectedImage, setSelectedImage] = useState(0);


    return (
        !loading && product && (
            <div>
                <div className="product-page">
                    <div className="product-section">
                        <div className="product-images">
                            <div className="main-image">
                                <img src={CONSTANTS.path.server_url + "/" + product.img_path}/>
                            </div>
                            <div className="thumbnail-container">
                                {productss.images.map((img, index) => (
                                    <img
                                        key={index}
                                        alt={img}
                                        src={CONSTANTS.path.server_url + "/" + product.img_path}
                                        className={selectedImage === index ? 'selected' : ''}
                                        onClick={() => setSelectedImage(index)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="product-info">
                            <h1>{product.title}</h1>
                            <div className="price">${product.price}</div>

                            <div className="average-rating">
                                    <span className="stars">
                                        {'★'.repeat(Math.round(reviews.avg_rating))}
                                        {'☆'.repeat(5 - Math.round(reviews.avg_rating))}</span>
                                <span className="rating-number">{reviews.avg_rating} out of 5</span>

                                <span className="review-count">({reviews.count} reviews)</span>
                            </div>

                            <p className="description">{product.description}</p>

                            <div className="specifications">
                                <h2>Specifications</h2>
                                <ul>
                                    {productss.specs.map((spec, index) => (
                                        <li key={index}>{spec}</li>
                                    ))}
                                </ul>
                            </div>

                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>

                </div>
                {
                    reviews && (
                        <div className="reviews-section">
                            <h2>Customer Reviews</h2>

                            <form className="review-form" onSubmit={handleSubmitComment}>
                                <h3>Write a Review</h3>
                                <div className="rating-select">
                                    <label>Rating:</label>
                                    <select
                                        value={ratingComment}
                                        onChange={(e) => setRatingComment(Number(e.target.value))}
                                        defaultValue={""}
                                        required={true}
                                    >
                                        <option disabled={true} value={""}>select</option>
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                                <textarea
                                    placeholder="Write your review here..."
                                    value={writeComment}
                                    onChange={(e) => setWriteComments(e.target.value)}
                                />
                                <button type="submit">Submit Review</button>
                            </form>

                            <div className="reviews-list">
                                {reviews.reviews.map((review: ReviewsInterface) => (
                                    <div key={review.id} className="review-item">
                                        <div className="review-header">
                                    <span
                                        className="review-user">{review.user.first_name + " " + review.user.last_name}</span>
                                            <span
                                                className="review-rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                                        </div>
                                        <p className="review-comment">{review.review_string}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
            </div>
        )
    )
}
export default ItemView
