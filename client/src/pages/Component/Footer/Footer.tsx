// Footer.tsx
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Left section */}
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>123 E-Commerce St, Shop City</p>
                    <p>Email: info@ecommerce.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                </div>

                {/* Right section */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/about">About Us</a></li>
                    </ul>
                </div>
            </div>
            <p className="footer-bottom">&copy; 2024 Your E-Commerce Site. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
