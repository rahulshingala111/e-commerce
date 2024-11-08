import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navigation/Navbar";
import Footer from "../Component/Footer/Footer";
import './Layout.css'
const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="all-container">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
export default Layout;