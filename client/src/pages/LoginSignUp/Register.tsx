// import { useState } from 'react';
import { useState } from 'react';
import './Register.css'
const Register = () => {
    const [firstname, setFirstname] = useState<string>()
    const [lastname, setLastname] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [city, setCity] = useState<string>()
    const [pin, setPin] = useState<string>()






    const handleSignup = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        console.log(firstname, lastname, email, phone, city, pin);

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
                        required
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
                </div><div className="form-group">
                    <label htmlFor='pin'>PIN</label>
                    <input
                        type="number"
                        name="pin"
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter your pin"
                        required
                    />
                </div>
                <button type="submit" className="signup-btn">Create Account</button>
            </form>
        </div>
    )
}
export default Register;