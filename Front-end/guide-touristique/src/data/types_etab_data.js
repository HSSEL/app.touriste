import library from '../assets/type_etab/library.png'; // Importe l'image représentant une bibliothèque depuis le dossier des ressources
import restaurant from '../assets/type_etab/restaurant.png'; // Importe l'image représentant un restaurant depuis le dossier des ressources
import museum from '../assets/type_etab/museum.png'; // Importe l'image représentant un musée depuis le dossier des ressources
import garden from '../assets/type_etab/garden.png'; // Importe l'image représentant un jardin depuis le dossier des ressources
import cinema from '../assets/type_etab/cinema.png'; // Importe l'image représentant un cinéma depuis le dossier des ressources
import mall from '../assets/type_etab/mall.png'; // Importe l'image représentant un centre commercial depuis le dossier des ressources
import bank from '../assets/type_etab/bank.png'; // Importe l'image représentant une banque depuis le dossier des ressources
import mosque from '../assets/type_etab/mosque.png'; // Importe l'image représentant une mosquée depuis le dossier des ressources
import hotel from '../assets/type_etab/hotel.png'; // Importe l'image représentant un hôtel depuis le dossier des ressources
import beach from '../assets/type_etab/beach.png'; // Importe l'image représentant une plage depuis le dossier des ressources
import hospital from '../assets/type_etab/hospital.png'; // Importe l'image représentant un hôpital depuis le dossier des ressources
import pharmacy from '../assets/type_etab/pharmacy.png'; // Importe l'image représentant une pharmacie depuis le dossier des ressources

// Crée un tableau contenant des objets représentant différents types d'établissements avec leurs noms et leurs images associées
const etabData = [
    {img: restaurant, nom: "Restaurant"}, // Objet représentant un restaurant avec son image et son nom
    {img: museum, nom: "Musée"}, // Objet représentant un musée avec son image et son nom
    {img: garden, nom: "Jardin"}, // Objet représentant un jardin avec son image et son nom
    {img: cinema, nom: "Cinéma"}, // Objet représentant un cinéma avec son image et son nom
    {img: mall, nom: "Centre commercial"}, // Objet représentant un centre commercial avec son image et son nom
    {img: bank, nom: "Banque"}, // Objet représentant une banque avec son image et son nom
    {img: library, nom: "Bibliothèque"}, // Objet représentant une bibliothèque avec son image et son nom
    {img: mosque, nom: "Mosquée"}, // Objet représentant une mosquée avec son image et son nom
    {img: hotel, nom: "Hôtel"}, // Objet représentant un hôtel avec son image et son nom
    {img: beach, nom: "Plage"}, // Objet représentant une plage avec son image et son nom
    {img: hospital, nom: "Hôpital"}, // Objet représentant un hôpital avec son image et son nom
    {img: pharmacy, nom: "Pharmacie"} // Objet représentant une pharmacie avec son image et son nom
];

export default etabData; // Exporte le tableau contenant les données des types d'établissements
