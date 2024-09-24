import { useEffect, useState } from "react";
import { AxiosResponse } from 'axios';
import Card from "../Component/Card/Card";
import './Home.css'
import ProductSlider from "../Component/Slider/ProductSlider";
import ApiCall from "../../constants/ApiCall";

const Home = () => {
    interface Product {
        id: number;
        name: string;
        price: number;
        description: string;
        img_path: string;
    }

    const [products, setProducts] = useState<Array<Product>>([]);

    useEffect(() => {
        const callme = async () => {
            try {
                const apicall: AxiosResponse = await ApiCall.get('/product/ten')
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
            Suggested Products:
            <div className="product-list">
                {
                    products.length > 0 && products.map((element: Product) => (
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