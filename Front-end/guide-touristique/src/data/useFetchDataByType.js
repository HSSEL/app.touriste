import { useState, useEffect } from 'react'; //Ces hooks sont utilisés pour gérer respectivement l'état local d'un composant fonctionnel 
import { fetchHotelData } from './HotelData'; // Importation de la fonction pour récupérer les données d'hôtel

const useFetchDataByType = (type) => { // Définition du hook personnalisé
    const [data, setData] = useState([]); // État pour stocker les données récupérées
    const [error, setError] = useState(null); // État pour gérer les erreurs

    useEffect(() => { // Effet useEffect pour récupérer les données
        const fetchData = async () => { // Fonction asynchrone pour récupérer les données
            try {
                const result = await fetchHotelData(type); // Appel de la fonction pour récupérer les données
                setData(result); // Mise à jour des données dans l'état
            } catch (err) {
                setError(err); // Gestion des erreurs en cas d'échec de la récupération
                console.error("Error fetching data:", err); // Affichage de l'erreur dans la console
            }
        };

        if (type) { // Vérification si le type est défini
            fetchData(); // Appel de la fonction fetchData pour récupérer les données
        }
    }, [type]); // Dépendance de l'effet useEffect : le type

    return { data, error }; // Retour des données et des erreurs pour une utilisation dans le composant
};

export default useFetchDataByType; // Exportation du hook personnalisé
