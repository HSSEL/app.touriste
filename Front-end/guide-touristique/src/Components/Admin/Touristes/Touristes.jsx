

import React, { useState, useEffect } from 'react'; // Importation des hooks useState et useEffect de React
import './Touristes.css'; // Importation du fichier CSS pour le style du composant
import { fetchtouristebData } from '../../../data/TouristeData'; // Importation de la fonction pour récupérer les données des touristes
import searchIcon from '../../../assets/search.svg'; // Importation de l'icône de recherche
import { Navigate, useNavigate } from 'react-router-dom'; // Importation des outils de navigation

// Définition du composant fonctionnel Touristes
const Touristes = () => {
    // Déclaration de l'état pour les touristes et la recherche
    const [tou, settou] = useState([]); // État pour stocker les touristes
    const [search, setSearch] = useState(''); // État pour stocker la valeur de recherche

    // Utilisation de l'effet pour récupérer les données des touristes au montage du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les données des touristes
        const gettou = async () => {
            try {
                // Appel de la fonction pour récupérer les données des touristes
                const data = await fetchtouristebData();
                // Vérification si les données sont un tableau non vide
                if (Array.isArray(data) && data.length > 0) {
                    // Mise à jour de l'état avec les données récupérées
                    settou(data);
                }
            } catch (error) {
                // Affichage d'une erreur en cas d'échec de la récupération des données
                console.error('Error fetching ville data:', error);
            }
        };
        // Appel de la fonction pour récupérer les touristes
        gettou();
    }, []);

    // Gestionnaire de changement pour la barre de recherche
    const handleSearchChange = (e) => {
        // Mise à jour de l'état de recherche avec la valeur en minuscules
        setSearch(e.target.value.toLowerCase());
    };

    return (
        <div className='container8'>
            {/* Section de recherche */}
            <div className='search0'>
                <img src={searchIcon} alt='Search Icon' /> {/* Affichage de l'icône de recherche */}
                <input 
                    onChange={handleSearchChange} // Gestionnaire d'événements pour les changements de l'input de recherche
                    type="text" 
                    placeholder="Chercher un touriste par son nom" // Texte d'invite de recherche
                />
            </div>
            {/* Section d'affichage des touristes */}
            <div className='cities'>
                {tou
                // Filtrer les touristes en fonction de la recherche
                .filter((data) => {
                    return search === '' ? data : data.Nom.toLowerCase().startsWith(search);
                })
                // Mappage des touristes filtrés pour les afficher
                .map((data, index) => (
                    <div key={index} className='onecity'>
                        <h2>{data.Nom}</h2>
                        <img 
                            src={`http://localhost:8080/tou/touristeImage/${data.id_touriste}`} // URL de l'image du touriste
                            alt={data.Nom}
                        />
                        <button>Voir</button> {/* Bouton pour voir les détails du touriste */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Touristes;
