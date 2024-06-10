import axios from "axios";

// Fonction pour récupérer les données des commentaires d'établissements depuis l'API
export const fetchcometabData = async () => {
    try {
        // Effectue une requête GET à l'URL spécifiée pour obtenir les commentaires d'établissements
        const response = await axios.get('http://localhost:8080/coeta/comments');
        // Retourne les données des commentaires obtenues depuis la réponse
        return response.data;
    } catch (error) {
        // En cas d'erreur, affiche un message d'erreur dans la console
        console.error("Error fetching comment etablissement:", error);
        // Retourne un tableau vide en cas d'erreur
        return [];
    }
};
