import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navigation/Navbar";
import Footer from "../Component/Footer/Footer";

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
export default Layout;