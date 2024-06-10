// Importe la fonction fetchetabData depuis le fichier EtabData
import { fetchetabData } from './EtabData'; 

// Fonction asynchrone pour récupérer les données des hôtels en fonction du type spécifié
export const fetchHotelData = async (type) => {
    try {
        // Appelle la fonction fetchetabData pour récupérer toutes les données des établissements
        const etabData = await fetchetabData();
        // Filtre les données des établissements pour ne conserver que ceux qui ont le type spécifié
        const filteredData = etabData.filter(etab => etab.type === type);
        // Renvoie les données filtrées des établissements correspondant au type spécifié
        return filteredData;
    } catch (error) {
        // En cas d'erreur lors de la récupération des données, affiche un message d'erreur dans la console
        console.error("Error fetching data:", error);
        // Renvoie un tableau vide en cas d'erreur
        return [];
    }
};
