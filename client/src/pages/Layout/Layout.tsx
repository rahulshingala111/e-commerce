import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navigation/Navbar";

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
export default Layout;