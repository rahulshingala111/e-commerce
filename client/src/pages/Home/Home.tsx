import { useEffect, useState } from "react";
import axios from 'axios';
import Card from "../Component/Card/Card";
import './Home.css'
import Navbar from "../Component/Navigation/Navbar";

const Home = () => {
    interface Product {
        id: number;
        name: string;
        price: number;
        description: string;
        imageUrl: string;
    }

    const [products, setProducts] = useState<Array<Product>>([]);

    useEffect(() => {
        const callme = async () => {
            try {
                const apicall = await axios.get('http://localhost:3002/product/ten');
                console.log(apicall.data);
                setProducts(apicall.data)
            } catch (error) {
                console.log(error);
            }

        }
        callme();
    }, [])

    return (
        <>
            <Navbar />
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