import Login from './Login';
import Register from './Register';
import './LoginSignUpCss.css';

const LoginSignup = () => {

    return (
        <div className="login-signup-container">
            <Login />
            <Register />
        </div>
    );
};

export default LoginSignup;
