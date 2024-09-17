// import { useState } from 'react';
import { useState } from 'react';
import './Login.css'
const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPasswod] = useState<string>('')

    const handleLogin = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        if (email && password) {
            console.log(email, password);
            // API CALL
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

