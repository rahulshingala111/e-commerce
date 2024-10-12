// import { useState } from 'react';
import { useState } from 'react';
import './Register.css'
import ApiCall from '../../constants/ApiCall';
import CONSTANTS from '../../constants/constants';
const Register = () => {
    const [firstname, setFirstname] = useState<string>()
    const [lastname, setLastname] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [city, setCity] = useState<string>()
    const [pin, setPin] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [password_again, setPassword_again] = useState<string>()



    const handleSignup = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        console.log(firstname, lastname, email, phone, city, pin);

        if (password === password_again) {
            //API Call
            const apicall = await ApiCall.post(CONSTANTS.API_ENDPOINTS.USER.CREATE, {
                data: {
                    firstname,
                    lastname: lastname?.length !== 0 ? lastname : null,
                    email,
                    phone: phone?.length !== 0 ? phone : null,
                    city,
                    pin,
                    password
                }
            })
            console.log(apicall);
        } else {
            alert('password did not match')
            setPassword('')
            setPassword_again('')
        }
    };

    return (
        <div className="signup-form">
            <h2>Create Account</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor='firstname'>First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="e.x. rahul"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='lastname'>Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="e.x. shingala"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='phone'>Mobile No. (optional)</label>
                    <input
                        type="text"
                        name="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your mobile no"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='city'>City</label>
                    <input
                        type="text"
                        name="city"
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter your city"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='pin'>PIN</label>
                    <input
                        type="number"
                        name="pin"
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter your pin"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='password_again'>Confirm Password</label>
                    <input
                        type="password"
                        name="password_again"
                        onChange={(e) => setPassword_again(e.target.value)}
                        placeholder="Enter your password again"
                        required
                    />
                </div>
                <button type="submit" className="signup-btn">Create Account</button>
            </form>
        </div>
    )
}
export default Register;