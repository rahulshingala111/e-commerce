import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to={'/'}><div className="navbar-logo">Admin Panel</div></Link>
      <ul className="navbar-menu">
        {/* <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/product/add">AddProduct</Link></li>
        <li className="navbar-item"><Link to="/products">Products</Link></li> */}
        {/*<li className="navbar-item"><Link to="/settings">Settings</Link></li>
        <li className="navbar-item"><Link to="/logout">Logout</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
