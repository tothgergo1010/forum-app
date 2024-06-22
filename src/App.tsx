// src/App.tsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import { getUserProfile } from './api';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUserProfile(token).then(response => {
                if (response && response.firstName) {
                    setUserProfile(response);
                    setIsAuthenticated(true);
                }
            }).catch(() => {
                setIsAuthenticated(false);
            });
        }
    }, []);

    const handleLogin = async (token: string) => {
        localStorage.setItem('token', token);
        try {
            const profile = await getUserProfile(token);
            setUserProfile(profile);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to fetch user profile', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserProfile(null);
        setIsAuthenticated(false);
    };

    return (
        <Router>
            {isAuthenticated && userProfile && <NavBar userProfile={userProfile} onLogout={handleLogout} />}
            <Routes>
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm onLogin={handleLogin} />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterForm />} />
                <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                    <Route path="/dashboard" element={<Dashboard userProfile={userProfile} onLogout={handleLogout} />} />
                    <Route path="/profile" element={<Profile token={localStorage.getItem('token')!} />} />
                </Route>
                <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
};

export default App;
