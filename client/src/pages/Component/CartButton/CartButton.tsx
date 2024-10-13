import ApiCall from '../../../constants/ApiCall'
import './CartButton.css'
interface CartButttonProps {
    product_id: number
}
const CartButton: React.FC<CartButttonProps> = ({ product_id }) => {

    const handleCartAction = async () => {
        if (product_id) {

            const getToken = sessionStorage.getItem('token')
            if (getToken) {
                try {
                    const insertCartData = await ApiCall.post('/')
                    console.log(insertCartData);

                } catch (error) {
                    console.log(error);
                }
            } else {
                const itemsinlocalstorage = localStorage.getItem('cart_items');
                if (itemsinlocalstorage) {
                    const cartArray: Array<number> = JSON.parse(itemsinlocalstorage!)
                    const checkIfItemExist = cartArray.find((element: number) => element === product_id)
                    if (!checkIfItemExist) {
                        cartArray.push(product_id)
                        localStorage.setItem('cart_items', JSON.stringify(cartArray))
                    }
                } else {
                    localStorage.setItem('cart_items', JSON.stringify([product_id]))
                }
            }
        }
    }

    return (
        <button className="product-button-card" onClick={handleCartAction}>Add to Cart</button>
    )
}
export default CartButton