import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import './App.css'
import Home from './pages/Home/Home';
import Layout from "./pages/Layout/Layout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import LoginSignup from "./pages/LoginSignUp/LoginSignUp";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductPage from "./pages/Product/Product";
import ItemView from "./pages/ItemView/ItemView";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import Profile from "./pages/Profile/Settings/myProfile/Profile";
import { AuthProvider } from "./constants/AuthContext";
import Address from "./pages/Profile/Settings/address/Address";
import ProfileLayout from "./pages/Profile/ProfileLayout";
import Verify from "./pages/Verify/Verify.tsx";


function App() {
  return (
    <AuthProvider >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/item" element={<ItemView />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/user" element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="address" element={<Address />} />
              {/* <Route path="address" element={<UserAddress />} /> */}
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </AuthProvider>
  )
}

export default App
