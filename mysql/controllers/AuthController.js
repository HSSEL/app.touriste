import AuthService from '../services/authService.js';

const AuthController = {
  register: (req, res) => {
    AuthService.register(req.body, (err) => {
      if (err) {
        console.error('Registration error', err);
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    AuthService.login(email, password, (err, data, message) => {
      if (err) {
        console.error('Login error', err);
        return res.status(500).json({ error: 'An error occurred during login' });
      }
      if (!data) {
        return res.status(401).json({ error: message });
      }
      res.status(200).json({ success: true, token: data.token, user: data.user });
    });
  }
};

export default AuthController;