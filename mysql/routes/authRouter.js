import express from 'express';


import AuthService from '../services/authService.js'; 


const authRouter = express.Router();
// Route pour se déconnecter
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Route pour l'inscription
authRouter.post('/register', (req, res) => {
  AuthService.register(req.body, (err, result) => {
    if (err) {
      console.error('Registration error', err);
      return res.status(500).json({ error: 'Failed to register user' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Route pour la connexion
authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  AuthService.login(email, password, (err, data, message) => {
    if (err) {
      console.error('Login error', err);
      return res.status(500).json({ error: 'Login failed' });
    }
    if (!data) {
      return res.status(401).json({ error: message });
    }
    res.status(200).json({ message: 'Login successful', token: data.token, user: data.user });
  });
});

export default authRouter;
