import CONSTANTS from '../../../constants/constants'
import './CartButton.css'
interface CartButttonProps {
    product_id: number,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const CartButton: React.FC<CartButttonProps> = ({ product_id }) => {

    const handleCartAction = async () => {
        if (product_id) {

            // const getToken = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.TOKEN)
            // if (false) {
            //     try {
            //         const insertCartData = await ApiCall.post('/')
            //         console.log(insertCartData);

            //     } catch (error) {
            //         console.log(error);
            //     }
            // } else {
            const itemsinlocalstorage = localStorage.getItem(CONSTANTS.LOCAL_STORAGE.CART_ITEMS);
            if (itemsinlocalstorage) {
                const cartArray: Array<number> = JSON.parse(itemsinlocalstorage!)
                if (cartArray.length > 0) {
                    const checkIfItemExist = cartArray.find((element: number) => element === product_id)
                    if (!checkIfItemExist) {
                        cartArray.push(product_id)
                        localStorage.setItem(CONSTANTS.LOCAL_STORAGE.CART_ITEMS, JSON.stringify(cartArray))
                    }
                } else {
                    localStorage.setItem(CONSTANTS.LOCAL_STORAGE.CART_ITEMS, JSON.stringify([product_id]))

                }
            }
            // }
        }
    }

    return (
        <button className="product-button-card" onClick={handleCartAction}>Add to Cart</button>
    )
}
export default CartButton