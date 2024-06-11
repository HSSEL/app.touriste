import axios from "axios";

// Fonction asynchrone pour récupérer les données des établissements
export const fetchetabData = async () => {
    try {
        // Effectue une requête GET vers l'API pour récupérer les données des établissements
        const response = await axios.get('http://localhost:8080/eta/etablissements');
        // Renvoie les données de réponse
        return response.data;
    } catch (error) {
        // En cas d'erreur lors de la récupération des données, affiche un message d'erreur dans la console
        console.error("Error fetching etablissement:", error);
        // Renvoie un tableau vide en cas d'erreur
        return [];
    }
};
