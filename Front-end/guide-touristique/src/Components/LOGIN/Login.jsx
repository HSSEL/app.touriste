
import './Login.css';
import React, { useState } from 'react';
import { login } from '../../data/authService';
import { useNavigate } from 'react-router-dom';

const Login0 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleClicklog = () => {
        navigate('/new');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user, details } = await login(email, password);
    
            console.log('Login successful:', user, details);

            let redirectTo = '/home'; // Redirection par défaut pour les utilisateurs normaux
            if (user.isAdmin === 1) {
                redirectTo = '/admin'; // Redirection pour les administrateurs
            } else if (user.isEstablishment === 1) {
                redirectTo = '/UserEtab'; // Redirection pour les établissements
            }

            navigate(redirectTo, { state: { userId: user.id } }); // Passer l'ID de l'utilisateur
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid email or password');
        }
    };
    

    return (
        <div className='login-container'>
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
                <div className='register-prompt'>
                    <h4>Vous n'avez pas un compte?</h4>
                    <h4 onClick={handleClicklog} className='register-link' style={{ cursor: 'pointer' }}>Créer un!</h4>
                </div>
            </form>
        </div>
    );
};

export default Login0;

