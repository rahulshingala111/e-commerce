import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom"
import './ProfileLayout.css'
const ProfileLayout: React.FC = () => {

    const [selectedMenu, setSelectedMenu] = useState('profile');
    const handleMenuClick = (menu: string) => {
        setSelectedMenu(menu);
    };

    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        // inn stead of api
        setUsername('rahul')
    }, [])

    return (
        <div className="profile-page-container">
            <div className="left-menu">
                <h2 className="menu-title">Hello, {username}</h2>
                <nav>
                    <Link
                        to="/user"
                        className={`menu-item ${selectedMenu === 'profile' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('profile')}
                    >
                        Profile
                    </Link>
                    <Link
                        to="/user/address"
                        className={`menu-item ${selectedMenu === 'address' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('address')}
                    >
                        Address
                    </Link>
                    <Link
                        to="/orders"
                        className={`menu-item ${selectedMenu === 'orders' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('orders')}
                    >
                        Orders
                    </Link>
                    <Link
                        to="/privacy"
                        className={`menu-item ${selectedMenu === 'privacy' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('privacy')}
                    >
                        Privacy
                    </Link>
                    <Link
                        to="/notifications"
                        className={`menu-item ${selectedMenu === 'notifications' ? 'active' : ''}`}
                        onClick={() => handleMenuClick('notifications')}
                    >
                        Notifications
                    </Link>
                </nav>
            </div>
            <div className="right-settings">
                <Outlet />
            </div>
        </div>
    )
}
export default ProfileLayout
