import './App.css'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Layout from './pages/Component/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AddProduct from './pages/AddProduct/AddProduct';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
