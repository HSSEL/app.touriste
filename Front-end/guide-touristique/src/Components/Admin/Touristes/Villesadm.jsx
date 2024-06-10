/* hada fih touristes kulum  */

import React, { useState, useEffect } from 'react'; // Importation des hooks useState et useEffect de React
import './Touristes.css'; // Importation du fichier CSS pour le style du composant
import { fetchVilleData } from '../../../data/VilleData'; // Importation de la fonction pour récupérer les données des villes
import searchIcon from '../../../assets/search.svg'; // Importation de l'icône de recherche
import { Navigate, useNavigate } from 'react-router-dom'; // Importation des outils de navigation

// Définition du composant fonctionnel Villesadm
const Villesadm = () => {
    // Déclaration de l'état pour les villes et la recherche
    const [ville, setVille] = useState([]); // État pour stocker les villes
    const [search, setSearch] = useState(''); // État pour stocker la valeur de recherche

    // Utilisation de l'effet pour récupérer les données des villes au montage du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les données des villes
        const getVille = async () => {
            try {
                // Appel de la fonction pour récupérer les données des villes
                const data = await fetchVilleData();
                // Vérification si les données sont un tableau non vide
                if (Array.isArray(data) && data.length > 0) {
                    // Mise à jour de l'état avec les données récupérées
                    setVille(data);
                }
            } catch (error) {
                // Affichage d'une erreur en cas d'échec de la récupération des données
                console.error('Error fetching ville data:', error);
            }
        };
        // Appel de la fonction pour récupérer les villes
        getVille();
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
                    placeholder="Chercher une ville" // Texte d'invite de recherche
                />
            </div>
            {/* Section d'affichage des villes */}
            <div className='cities'>
                {ville
                // Filtrer les villes en fonction de la recherche
                .filter((data) => {
                    return search === '' ? data : data.Nom.toLowerCase().startsWith(search);
                })
                // Mappage des villes filtrées pour les afficher
                .map((data, index) => (
                    <div key={index} className='onecity'>
                        <h2>{data.Nom}</h2>
                        <img 
                            src={`http://localhost:8080/vi/villeImage/${data.id_ville}`} // URL de l'image de la ville
                            alt={data.nom} // Texte alternatif pour l'image
                        />
                        <button>Voir</button> {/* Bouton pour voir les détails de la ville */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Villesadm;
