import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import ApiCall from '../../constants/ApiCall';
import CONSTANTS from '../../constants/constants';
import { useAuth } from '../../constants/AuthContext';
const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('')
    const [password, setPasswod] = useState<string>('')

    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        if (email && password) {
            console.log(email, password);

            const response: any = await ApiCall.post(CONSTANTS.API_ENDPOINTS.AUTH.LOGIN, {
                data: {
                    email,
                    password
                }
            })
            if (response.status) {
                console.log("ello");
                sessionStorage.setItem(CONSTANTS.SESSION_STORAGE.TOKEN, response.token)
                sessionStorage.setItem(CONSTANTS.SESSION_STORAGE.USER, response.data)
                login();
                //redirect to home page
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            }
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPasswod(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    )
}
export default Login;

