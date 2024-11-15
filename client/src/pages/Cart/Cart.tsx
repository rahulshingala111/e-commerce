import React, {ChangeEvent, useEffect, useState} from 'react';
import './Cart.css'
import ApiCall from '../../constants/ApiCall';
import CONSTANTS from '../../constants/constants';
import type {AddressInterface, CartInterface, CartItemInterface} from '../../constants/Interfaces';
import {useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";

interface User {
    first_name: string;
    last_name: string;
    email: string;
    mobile_no: string;
}

interface PaymentOrder {
    key_id: string;
    order_id: string;
    order_create_id: number;
    currency: string;
    amount: number;
    image: string;
    user: User;
    notes: Array<Record<string, string>>;
}

const Cart: React.FC = () => {

    const navigate = useNavigate();

    const [step, setStep] = useState<number>(1)

    const [cartItems, setCartItems] = useState<CartInterface>()
    const [address, setAddress] = useState<Array<AddressInterface>>([])
    const [selectedAddress, setSelectedAddress] = useState<string>()

    const [total, setTotal] = useState<number>(0)


    useEffect(() => {
        const getCartItems = async () => {
            const getCartItem = await ApiCall.get('/product/cart/get')
            setCartItems(getCartItem.data)
            setTotal(getCartItem.data.total_sum)
        }
        const getAddresses = async () => {
            const fetchAddress = await ApiCall.get(CONSTANTS.API_ENDPOINTS.USER.FETCH_ADDRESS)
            setAddress(fetchAddress.data)
        }
        const getReview = () => {
            //
        }

        if (step === 1) {
            getCartItems()
        }
        if (step === 2) {
            getAddresses()
        }
        if (step === 3) {
            getReview()
        }
    }, [step]);

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

    const handleNextPage = () => {
        if (step < 3 && step >= 1) {
            setStep(step + 1)
        }
    }
    const handlePreviousPage = (): void => {
        if (step <= 3 && step >= 1) {
            setStep(step - 1)
        }
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
                throw new Error('Razorpay failed to load!!')
            }
            if (!cartItems) {
                throw new Error('cart empty')
            }
            const createOrder = await ApiCall.post(CONSTANTS.API_ENDPOINTS.PAYMENT.CREATE_ORDER, {
                cart_id: cartItems.id
            })

            if (!createOrder.status) {
                throw new Error('Error creating order from api')
            }
            const response: PaymentOrder = createOrder.data
            const options = {
                "key": response.key_id,
                "amount": response.amount,
                "currency": response.currency,
                "name": `${response.user.first_name} ${response.user.last_name}`,
                "description": "Test Transaction",
                "image": response.image,
                "order_id": response.order_id,
                "prefill": {
                    "name": `${response.user.first_name} ${response.user.last_name}`,
                    "email": response.user.email,
                    "contact": response.user.mobile_no
                },
                "handler": async (res: any): Promise<void> => {
                    const verify: AxiosResponse = await ApiCall.post(CONSTANTS.API_ENDPOINTS.PAYMENT.CALL_BACK_URL, {
                        cart_id: cartItems.id,
                        order_create_id: response.order_create_id,
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
            await paymentObject.open();


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <h2>step - {step}</h2>
            </div>
            {
                step === 1 && (
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
                                            <button className="remove-btn" value={cart_item.id}
                                                    onClick={handleRemoveCartItem}>
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
                            <div>
                                <button className="buy-now-btn" onClick={handleNextPage}>next</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                step === 2 && (
                    <div>
                        select address
                        <div>
                            {
                                address.map((element) => (
                                    <div>
                                        <input type='radio' id={element.id.toString()} name={element.id.toString()}
                                               value={element.id.toString()}
                                               checked={selectedAddress === element.id.toString()}
                                               onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                                   setSelectedAddress(e.target.value)
                                               }}
                                        />
                                        <label>{element.address_1 + " " + element.address_2 + ", " + element.landmark + ", " + element.city + ", " + element.state + ", " + element.country + ", " + element.postal_code}</label>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <button className="buy-now-btn" onClick={handlePreviousPage}>back</button>
                            <button className="buy-now-btn" onClick={handleNextPage} disabled={!selectedAddress}>next
                            </button>
                        </div>
                    </div>
                )
            }
            {
                step === 3 && (
                    <div>
                        review
                        <div>
                            {cartItems && cartItems.cart_item.map((element: CartItemInterface) => (
                                <>
                                    product id - {element.id}
                                    <br/>
                                    product name - {element.product.title}
                                    <br/>
                                    total - {element.price}
                                </>
                            ))}
                        </div>
                        <div>selected address : {selectedAddress}</div>

                        <div>
                            <button className="buy-now-btn" onClick={handlePreviousPage}>back</button>
                            <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
                        </div>
                    </div>
                )
            }
        </div>
    );

}
export default Cart
