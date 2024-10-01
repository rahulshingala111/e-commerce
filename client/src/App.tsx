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
import ProductView from "./pages/Product/ProductView/ProductView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/item" element={<ProductView />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
