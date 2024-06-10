// Importe la bibliothèque Axios pour effectuer des requêtes HTTP
import axios from 'axios';

// Importe les images des publications statiques
import CIH02 from '../assets/post/CIH/CIH02.jpg';
import CIH03 from '../assets/post/CIH/CIH03.jpg';
import CIH04 from '../assets/post/CIH/CIH04.jpg';
import CIH01 from '../assets/post/CIH/CIH01.png';

// Tableau contenant les données des publications statiques
export const staticPostData = [
    // Première publication statique
    { 
        img1: CIH01, // Image de profil
        nom: "CIH BANK", // Nom de l'entité
        image: CIH04, // Image principale de la publication
        text: "L’inscription salate ! 🏁64 fer9a dial 5 personnes, tsejlou f la plateforme w aycharkou bach ireb7ou voyage l Valorant Champions f Séoul Teb3ouhoum fla chaîne Twitch de CIH Bank. Let’s go ! 👇🏻 https://bit.ly/49TmZnw" // Texte de la publication
    },
    // Deuxième publication statique
    { 
        img1: CIH01, // Image de profil
        nom: "CIH BANK", // Nom de l'entité
        image: CIH03, // Image principale de la publication
        text: "Teb3ou le show dyal la finale de Valorant Gaming Cup sur la chaîne Twitch dyal CIH Bank" // Texte de la publication
    },
    // Troisième publication statique
    { 
        img1: CIH01, // Image de profil
        nom: "CIH BANK", // Nom de l'entité
        image: CIH02, // Image principale de la publication
        text: "بنك CIH يتمنى لكم جمعة مباركة" // Texte de la publication
    },    
];

// Fonction asynchrone pour récupérer les données des publications depuis l'API
export const fetchPostData = async () => {
  try {
    // Effectue une requête GET à l'URL spécifiée pour obtenir les données des publications
    const response = await axios.get('http://localhost:8080/pub/Publications');
    // Renvoie les données récupérées de la réponse de la requête
    return response.data;
  } catch (error) {
    // En cas d'erreur lors de la requête, affiche un message d'erreur dans la console
    console.error("Error fetching publications:", error);
    // Renvoie un tableau vide en cas d'erreur
    return [];
  }
};
