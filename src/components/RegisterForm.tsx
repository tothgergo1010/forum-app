

import React, { useState } from 'react';
import { registerUser } from '../api';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await registerUser(username, password, passwordConfirm, firstName, lastName);
            if (response.success) {
                // Handle successful registration (e.g., redirect to login)
                console.log('Registration successful');
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p>{error}</p>}
            <div>
                <label>Username:</label>
                <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
