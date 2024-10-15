import React, { useEffect, useState } from 'react';
import './Cart.css'
import ApiCall from '../../constants/ApiCall';
import CONSTANTS from '../../constants/constants';
import { useAuth } from '../../constants/AuthContext';

interface CartItemInterface {
    id: number,
    title: string,
    description: string,
    price: number,
    img_path: string,
    categories_id: number
}

const Cart: React.FC = () => {

    const [cartItems, setCartItems] = useState<Array<CartItemInterface>>([])
    const { isLoggedin } = useAuth();

    useEffect(() => {
        callme()
    }, [])

    const callme = async () => {
        const itemsfromstorage = localStorage.getItem(CONSTANTS.LOCAL_STORAGE.CART_ITEMS)
        if (itemsfromstorage) {
            const itemArray: Array<any> = JSON.parse(itemsfromstorage)
            if (itemArray.length > 0) {
                console.log(itemArray);
                const tempArray: Array<CartItemInterface> = []
                Promise.all(itemArray.map(async (element: number) => {
                    const fetchitems = await ApiCall.get(CONSTANTS.API_ENDPOINTS.CART.FETCH(element))
                    if (fetchitems.status) {
                        tempArray.push(fetchitems.data)
                    }
                })).then(() => {
                    setCartItems(tempArray)
                })
            } else {
                console.log("local storage exist but no item found");
                setCartItems([])
            }
        }
    }


    const handleBuyNow = () => {
        console.log("buy now");


    }

    const handleRemoveCartItem = async (e: any) => {
        const value: number = Number(e.target.value)
        const getCartItem = localStorage.getItem(CONSTANTS.LOCAL_STORAGE.CART_ITEMS)
        if (getCartItem && value) {
            const CartItemArray: Array<number> = JSON.parse(getCartItem)
            const index = CartItemArray.indexOf(value)
            CartItemArray.splice(index, 1)
            console.log("after ", CartItemArray);
            localStorage.setItem(CONSTANTS.LOCAL_STORAGE.CART_ITEMS, JSON.stringify(CartItemArray))
            await callme()
        } else {
            console.log("no items found on local storage");
            
        }


    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cartItems.length > 0 ? cartItems.map((item: CartItemInterface) => (
                    <div key={item.id} className="cart-item-card">
                        <div className="cart-item-image">
                            <img src={CONSTANTS.path.server_url + '/' + item.img_path} alt={item.title} />
                        </div>
                        <div className="cart-item-details">
                            <h2>{item.title}</h2>
                            <p>Price: ${item.price}</p>
                            {/* <p>Quantity: {item.quantity}</p> */}
                            <button className="remove-btn" value={item.id} onClick={handleRemoveCartItem}>
                                Remove
                            </button>
                        </div>
                    </div>
                )) : <h1>No item added</h1>}
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