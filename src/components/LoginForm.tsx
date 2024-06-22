

import React, { useState } from 'react';
import { loginUser } from '../api';

interface LoginFormProps {
    onLogin: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await loginUser(username, password);
            if (response.accessToken) {
                onLogin(response.accessToken);
            } else {
                setError('Invalid login credentials');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <div>
                <label>Username:</label>
                <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
