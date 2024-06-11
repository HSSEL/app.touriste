
// services/authService.js
import axios from "axios";

export const login = async (email, password) => {
    try {
        // Effectue une requête POST à l'URL spécifiée pour se connecter avec l'adresse e-mail et le mot de passe fournis
        const response = await axios.post('http://localhost:8080/aut/auth', { email, password });
        // Retourne les données de réponse de la demande de connexion
        return response.data;
    } catch (error) {
        // En cas d'erreur, affiche un message d'erreur dans la console
        console.error("Error fetching authentification:", error);
        // Lance une nouvelle erreur avec un message indiquant que la connexion a échoué
        throw new Error("Login failed");
    }
};
