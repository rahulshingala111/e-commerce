import { useEffect, useState } from 'react';
import './Cart.css'
import ApiCall from '../../constants/ApiCall';
import CONSTANTS from '../../constants/constants';
import { Link } from 'react-router-dom';

interface CartItemInterface {
    id: number,
    title: string,
    description: string,
    price: number,
    img_path: string,
    categories_id: number
}

const Cart = () => {

    const [cartItems, setCartItems] = useState<Array<CartItemInterface>>([])

    useEffect(() => {
        const callme = async () => {
            const itemsfromstorage = localStorage.getItem('cart_items')
            if (itemsfromstorage) {
                const itemsArray: Array<number> = JSON.parse(itemsfromstorage)
                console.log(itemsArray);
                const tempArray: Array<CartItemInterface> = []
                Promise.all(itemsArray.map(async (element: number) => {
                    const fetchitems = await ApiCall.get(CONSTANTS.API_ENDPOINTS.CART.FETCH(element))
                    if (fetchitems.status) {
                        tempArray.push(fetchitems.data)
                    }
                })).then(() => {
                    setCartItems(tempArray)
                })
            }
        }
        callme()
    }, [])
    console.log(cartItems);


    const handleBuyNow = () => {
        console.log("buy now");

    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cartItems.length > 0 && cartItems.map((item: CartItemInterface) => (
                    <div key={item.id} className="cart-item-card">
                        <div className="cart-item-image">
                            <img src={CONSTANTS.path.server_url + '/' + item.img_path} alt={item.title} />
                        </div>
                        <div className="cart-item-details">
                            <h2>{item.title}</h2>
                            <p>Price: ${item.price}</p>
                            {/* <p>Quantity: {item.quantity}</p> */}
                            <button className="remove-btn">
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="buy-now-section">
                <Link to={'/order'}><button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button></Link>
            </div>
        </div>
    );

}
export default Cart