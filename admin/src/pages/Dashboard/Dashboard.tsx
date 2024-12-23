import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <div>
                <h2>Menu</h2>
                <div>
                    <Link to={'/product/add'}><button>Add Product</button></Link>
                </div>
                <div>
                    <Link to={'/product/categories/add'}><button>Add Categories</button></Link>
                </div>
                <div>
                    <Link to={'/product/brand/add'}><button>Add Brand</button></Link>
                </div>
                <div>
                    <Link to={'/product/banner/add'}><button>Add Banner</button></Link>
                </div>
                
            </div>
        </>
    )
}
export default Dashboard;