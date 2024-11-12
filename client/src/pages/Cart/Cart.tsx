import React, {useEffect, useState} from 'react';
import './Cart.css'
import ApiCall from '../../constants/ApiCall';
import CONSTANTS from '../../constants/constants';
import {useAuth} from '../../constants/AuthContext';
import {CartInterface, CartItemInterface} from '../../constants/Interfaces';
import login from "../LoginSignUp/Login.tsx";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useNavigate} from "react-router-dom";

const Cart: React.FC = () => {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState<CartInterface>()
    const [total, setTotal] = useState<number>(0)
    const {isLoggedin} = useAuth();

    useEffect(() => {
        const callme = async () => {

            if (isLoggedin) {
                const getCartItem = await ApiCall.get('/product/cart/get')
                console.log(getCartItem.data);
                setCartItems(getCartItem.data)
                setTotal(getCartItem.data.total_sum)
            } else {
                // const itemsfromstorage = localStorage.getItem(CONSTANTS.LOCAL_STORAGE.CART_ITEMS)
                // if (itemsfromstorage) {
                //     const itemArray: Array<any> = JSON.parse(itemsfromstorage)
                //     if (itemArray.length > 0) {
                //         console.log(itemArray);
                //         const tempArray: Array<any> = []
                //         Promise.all(itemArray.map(async (element: number) => {
                //             const fetchitems = await ApiCall.get(CONSTANTS.API_ENDPOINTS.CART.FETCH(element))
                //             if (fetchitems.status) {
                //                 tempArray.push(fetchitems.data)
                //             }
                //         })).then(() => {
                //             setCartItems(tempArray)
                //         })
                //     } else {
                //         console.log("local storage exist but no item found");
                //         setCartItems([])
                //     }
                // }
            }
        }
        callme()
    }, [])

    const handleRemoveCartItem = async (e: any) => {
        console.log(e);

        // const value: number = Number(e.target.value)
        // const getCartItem = localStorage.getItem(CONSTANTS.LOCAL_STORAGE.CART_ITEMS)
        // if (getCartItem && value) {
        //     const CartItemArray: Array<number> = JSON.parse(getCartItem)
        //     const index = CartItemArray.indexOf(value)
        //     CartItemArray.splice(index, 1)
        //     console.log("after ", CartItemArray);
        //     localStorage.setItem(CONSTANTS.LOCAL_STORAGE.CART_ITEMS, JSON.stringify(CartItemArray))
        //     await callme()
        // } else {
        //     console.log("no items found on local storage");
        // }
    }

    const handleChangeInventory = async (action: number, product_id: number): Promise<void> => {
        // 0 is +
        // 1 is -
        console.log(action, product_id);

        // if (action && product_id) {
        //     try {
        //         const insertCart = await ApiCall.post('/cart/add', {
        //             action: action,
        //             product_id: product_id
        //         })
        //         console.log(insertCart);

        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    }

    const handleBuyNow = async () => {
        try {


            const loadScript = (src: string) => {
                return new Promise((resolve): void => {
                    const script = document.createElement('script')
                    script.src = src
                    script.onload = () => {
                        resolve(true)
                    }
                    script.onerror = () => {
                        resolve(false)
                    }
                    document.body.appendChild(script)
                })
            }


            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
            if (!res) {
                throw new Error('Razropay failed to load!!')
            }
            const createOrder = await ApiCall.post(CONSTANTS.API_ENDPOINTS.PAYMENT.CREATE_ORDER, {
                data: 'somedata'
            })
            if (createOrder.data.order_id) {
                console.log(createOrder.data)
                const order_id: string = createOrder.data.order_id as string
                console.log("order_id", order_id)

                const options = {
                    "key": "rzp_test_iY2oPXME3iuY6r", // Enter the Key ID generated from the Dashboard
                    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "rahul shingala",
                    "description": "Test Transaction",
                    "image": "http://localhost:3002/product/image/1.jpg",
                    "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "prefill": {
                        "name": "Gaurav Kumar",
                        "email": "gaurav.kumar@example.com",
                        "contact": "9000090000"
                    },
                    // "callback_url": CONSTANTS.API_ENDPOINTS.PAYMENT.CALL_BACK_URL,
                    "handler": async (res: any) => {
                        const verify = await ApiCall.post(CONSTANTS.API_ENDPOINTS.PAYMENT.CALL_BACK_URL, {
                            payment_id: res.razorpay_payment_id,
                            order_id: res.razorpay_order_id,
                            signature: res.razorpay_signature
                        })
                        if (verify.status) {
                            navigate('/verify')
                        } else {
                            console.log("someting went wrong")
                        }
                    },
                    "notes": {
                        "address": "Razorpay Corporate Office"
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                console.log(options)

                const paymentObject = new (window as any).Razorpay(options);
                paymentObject.on("payment.failed", (res: any) => {
                    console.log(res)
                })
                const abc = await paymentObject.open();
                console.log("avb", abc)

            } else {
                console.log("something went wrong")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cartItems ?
                    cartItems.cart_item.map((cart_item: CartItemInterface) => (
                        <div key={cart_item.id} className="cart-item-card">
                            <div className="cart-item-image">
                                <img src={CONSTANTS.path.server_url + '/' + cart_item.product.img_path}
                                     alt={cart_item.product.title}/>
                            </div>
                            <div className="cart-item-details">
                                <h2>{cart_item.product.title}</h2>
                                <p>Price: ${cart_item.price}</p>
                                <div className='qty-div'>
                                    <button className='qty-buttons' onClick={() => {
                                        handleChangeInventory(0, cart_item.id)
                                    }}>+
                                    </button>
                                    <span className='qty-show'>{cart_item.qty ?? 1}</span>
                                    <button className='qty-buttons' onClick={() => {
                                        handleChangeInventory(1, cart_item.id)
                                    }}>-
                                    </button>
                                </div>
                                <button className="remove-btn" value={cart_item.id} onClick={handleRemoveCartItem}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    )) :
                    <h1>No item added</h1>}
            </div>
            <div>
                total : {total}
            </div>

            <div className="buy-now-section">
                {isLoggedin ?
                    <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
                    :
                    <button className="buy-now-btn">Login and Buy</button>

                }
                {/* <Link to={'/order'}><button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button></Link> */}

            </div>
        </div>
    );

}
export default Cart
