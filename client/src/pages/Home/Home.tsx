import { useEffect } from "react";
import './Home.css'
import ProductSlider from "../Component/Slider/ProductSlider";
import NewArrival from "../Component/NewArrival/NewArrival";

const Home = () => {

    useEffect(() => {
        //
    }, [])

    return (
        <>
            <ProductSlider />
            <NewArrival />
        </>
    )
}
export default Home;