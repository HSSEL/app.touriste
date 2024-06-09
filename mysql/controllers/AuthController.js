import AuthService from '../services/authService.js';

const AuthController = {
  // Fonction pour enregistrer un nouvel utilisateur
  register: (req, res) => {
    // Appel du service d'authentification pour enregistrer l'utilisateur avec les données de la requête
    AuthService.register(req.body, (err) => {
      // Si une erreur survient lors de l'enregistrement
      if (err) {
        console.error('Registration error', err);
        return res.status(500).json({ error: 'Failed to register user' });
      }
      // Si l'enregistrement est réussi, renvoyer une réponse de succès
      res.status(201).json({ message: 'User registered successfully' });
    });
  },

  // Fonction pour connecter un utilisateur
  login: (req, res) => {
    // Extraction de l'email et du mot de passe du corps de la requête
    const { email, password } = req.body;
    // Appel du service d'authentification pour connecter l'utilisateur
    AuthService.login(email, password, (err, data, message) => {
      // Si une erreur survient lors de la connexion
      if (err) {
        console.error('Login error', err);
        return res.status(500).json({ error: 'An error occurred during login' });
      }
      // Si les données de connexion sont incorrectes
      if (!data) {
        return res.status(401).json({ error: message });
      }
      // Si la connexion est réussie, renvoyer une réponse avec le token et les informations de l'utilisateur
      res.status(200).json({ success: true, token: data.token, user: data.user });
    });
  }
};

export default AuthController;
