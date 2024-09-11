import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import './App.css'
import Home from './pages/Home/Home';
import Layout from "./pages/Layout/Layout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
