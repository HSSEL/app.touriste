import axios from "axios"; // Importe Axios pour effectuer des requêtes HTTP.
//Elle permet d'envoyer des requêtes HTTP de manière simple

export const fetchVilleData = async () => { // Définit une fonction asynchrone fetchVilleData.
    try {
      const response = await axios.get('http://localhost:8080/vi/villes'); // Effectue une requête GET vers l'API locale pour récupérer les données des villes.
      return response.data; // Retourne les données de la réponse.
    } catch (error) { // Gère les erreurs en cas d'échec de la requête.
      console.error("Error fetching etablissement:", error); // Affiche l'erreur dans la console.
      return []; // Retourne un tableau vide en cas d'erreur.
    }
  };
