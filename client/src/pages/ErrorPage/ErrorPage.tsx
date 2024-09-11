import { Link } from "react-router-dom";
const ErrorPage = () => {
    return (<>
        <h1>404 error <br />page not found</h1>
        <Link to={'/'}>
            <button>Go to Home page</button>
        </Link>
    </>
    )
}
export default ErrorPage;