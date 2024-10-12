import { useEffect, useState } from "react";
import { AxiosResponse } from 'axios';
import Card from "../Component/Card/Card";
import './Home.css'
import ProductSlider from "../Component/Slider/ProductSlider";
import ApiCall from "../../constants/ApiCall";
import { ProductInterface } from "../../constants/Interfaces";
import CONSTANTS from "../../constants/constants";

const Home = () => {

    const [products, setProducts] = useState<Array<ProductInterface>>([]);

    useEffect(() => {
        const callme = async () => {
            try {
                const apicall: AxiosResponse = await ApiCall.get(CONSTANTS.API_ENDPOINTS.PRODUCT.FETCH_TEN)
                setProducts(apicall.data);
            } catch (error) {
                console.log(error);
            }
        }
        callme();
    }, [])

    return (
        <>
            <div>
                <ProductSlider />
            </div>
            <div className="product-list">
                {
                    products.length > 0 && products.map((element: ProductInterface) => (
                        <Card key={element.id} product={element} />
                    ))
                }
                {
                    products.length === 0 && <p>Inventory Empty</p>
                }
            </div>
        </>
    )
}
export default Home;