

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
    userProfile: {
        firstName: string;
        lastName: string;
    };
    onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ userProfile, onLogout }) => {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate('/dashboard');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <nav>
            <button onClick={handleDashboardClick}>Dashboard</button>
            <button onClick={handleProfileClick}>Profile</button>
            <button onClick={onLogout}>Logout</button>
            <span>{userProfile.firstName} {userProfile.lastName}</span>
        </nav>
    );
};

export default NavBar;
