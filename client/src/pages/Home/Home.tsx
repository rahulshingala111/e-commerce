import { useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import Card from "../Component/Card/Card";
import './Home.css'
import CONSTANTS from "../../constants/constants";

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
                const apicall: AxiosResponse = await axios.get(CONSTANTS.path.server_url + '/product/ten');
                setProducts(apicall.data);
            } catch (error) {
                console.log(error);
            }
        }
        callme();
    }, [])

    return (
        <>
            <div className="product-list">
                {
                    products.length > 0 && products.map((element: Product) => (
                        <Card key={element.id} product={element} />
                    ))
                }
            </div>
        </>
    )
}
export default Home;