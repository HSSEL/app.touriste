import './Login.css';
import React, { useState } from 'react';

const Login0 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className='LOGIN0'>
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Se connecter</h1>
                <div className="form-group">
                    <h3>Email:</h3>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <h3>Mot de passe:</h3>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login0;
