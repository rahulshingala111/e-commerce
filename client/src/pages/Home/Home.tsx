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
            // new arrival
            <NewArrival />

            // explore categories
            <NewArrival />

            // UP TO  60 perscent off 
            // just under 199


            // featured categories

            <NewArrival />


        </>
    )
}
export default Home;