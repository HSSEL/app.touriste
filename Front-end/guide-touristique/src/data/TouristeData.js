import axios from "axios"; // Importe la bibliothèque Axios pour effectuer des requêtes HTTP

// Fonction asynchrone pour récupérer les données des touristes depuis l'API
export const fetchtouristebData = async () => {
    try {
        // Effectue une requête GET à l'URL spécifiée pour obtenir les données des touristes
        const response = await axios.get('http://localhost:8080/tou/touristes');
        // Renvoie les données récupérées de la réponse de la requête
        return response.data;
    } catch (error) {
        // En cas d'erreur lors de la requête, affiche un message d'erreur dans la console
        console.error("Error fetching etablissement:", error);
        // Renvoie un tableau vide en cas d'erreur
        return [];
    }
};
