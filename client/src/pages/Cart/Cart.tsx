import React, { useEffect, useState } from 'react';
import './Cart.css'
import ApiCall from '../../constants/ApiCall';
import CONSTANTS from '../../constants/constants';
import { useAuth } from '../../constants/AuthContext';
import { CartInterface, CartItemInterface } from '../../constants/Interfaces';

const Cart: React.FC = () => {

    const [cartItems, setCartItems] = useState<CartInterface>()
    const { isLoggedin } = useAuth();

    useEffect(() => {
        const callme = async () => {

            if (isLoggedin) {
                const getCartItem = await ApiCall.get('/product/cart/get')
                console.log(getCartItem.data);
                setCartItems(getCartItem.data)
            } else {
                const itemsfromstorage = localStorage.getItem(CONSTANTS.LOCAL_STORAGE.CART_ITEMS)
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




    const handleBuyNow = () => {
        console.log("buy now");


    }

    const handleRemoveCartItem = async (e: any) => {
        const value: number = Number(e.target.value)
        const getCartItem = localStorage.getItem(CONSTANTS.LOCAL_STORAGE.CART_ITEMS)
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
    console.log("my", cartItems?.cart_item[0].product);

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cartItems ?
                    cartItems.cart_item.map((cart_item: CartItemInterface) => (
                        <div key={cart_item.id} className="cart-item-card">
                            <div className="cart-item-image">
                                <img src={CONSTANTS.path.server_url + '/' + cart_item.product.img_path} alt={cart_item.product.title} />
                            </div>
                            <div className="cart-item-details">
                                <h2>{cart_item.product.title}</h2>
                                <p>Price: ${cart_item.price}</p>
                                <div className='qty-div'>
                                    <button className='qty-buttons' onClick={() => {
                                        handleChangeInventory(0, cart_item.id)
                                    }}>+</button>
                                    <span className='qty-show'>{cart_item.qty ?? 1}</span>
                                    <button className='qty-buttons' onClick={() => {
                                        handleChangeInventory(1, cart_item.id)
                                    }}>-</button>
                                </div>
                                <button className="remove-btn" value={cart_item.id} onClick={handleRemoveCartItem}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    )) :
                    <h1>No item added</h1>}
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