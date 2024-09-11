import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <>
            <h1>404 error <br /> no page found</h1>
            <Link to={'/home'}><button>go home</button></Link>
        </>
    )
}
export default ErrorPage;