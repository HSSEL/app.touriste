import AuthService from '../services/authService.js'; //Ce code importe le module AuthService depuis le fichier authService.js situé dans le dossier services. 
                                                      //Ce service contient les fonctions de gestion de l'authentification des utilisateurs.

const AuthController = {
  // Fonction pour enregistrer un nouvel utilisateur
  //Déclaration d'une fonction register qui gère l'enregistrement d'un nouvel utilisateur. 
  //Elle prend deux paramètres, req (la requête) et res (la réponse).
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
      // Si les informations de connexion sont incorrectes (par exemple, mauvais mot de passe ou email), 
      //la fonction renvoie une réponse avec un statut 401 (non autorisé) est renvoyée avec un message d'erreur.
      if (!data) {
        return res.status(401).json({ error: message });
      }
      // Si la connexion est réussie, renvoyer une réponse avec le token d'authentification et les informations de l'utilisateur
      res.status(200).json({ success: true, token: data.token, user: data.user });
    });
  }
};
//Le AuthController est exporté pour être utilisé dans d'autres parties de l'application.
export default AuthController;
