/* Ce fichier contient le composant pour afficher les établissements */
import React, { useState, useEffect } from 'react';
import './Touristes.css';
import { fetchetabData } from '../../../data/EtabData'; // Importation de la fonction pour récupérer les données des établissements
import searchIcon from '../../../assets/search.svg'; // Importation de l'icône de recherche
import { Navigate, useNavigate } from 'react-router-dom'; // Importation des outils de navigation

// Définition du composant fonctionnel Etablissements
const Etablissements = () => {
    // Déclaration de l'état pour les établissements et la recherche
    const [etab, setEtab] = useState([]); // État pour stocker les établissements
    const [search, setSearch] = useState(''); // État pour stocker la valeur de recherche

    // Utilisation de l'effet pour récupérer les données des établissements au montage du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les données des établissements
        const getEtab = async () => {
            try {
                // Appel de la fonction pour récupérer les données
                const data = await fetchetabData();
                // Vérification si les données sont un tableau non vide
                if (Array.isArray(data) && data.length > 0) {
                    // Mise à jour de l'état avec les données récupérées
                    setEtab(data);
                }
            } catch (error) {
                // Affichage d'une erreur en cas d'échec de la récupération des données
                console.error('Error fetching ville data:', error);
            }
        };
        // Appel de la fonction pour récupérer les établissements
        getEtab();
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
                <img src={searchIcon} alt='Search Icon' />
                <input 
                    onChange={handleSearchChange} // Gestionnaire d'événements pour les changements de l'input de recherche
                    type="text" 
                    placeholder="Chercher un etablissement" // Texte d'invite de recherche
                />
            </div>
            {/* Section d'affichage des établissements */}
            <div className='cities'>
                {etab
                // Filtrer les établissements en fonction de la recherche
                .filter((data) => {
                    return search === '' ? data : data.nom.toLowerCase().startsWith(search);
                })
                // Mappage des établissements filtrés pour les afficher
                .map((data, index) => (
                    <div key={index} className='onecity'>
                        <h2>{data.nom}</h2>
                        <img 
                            src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`} // URL de l'image de l'établissement
                            alt={data.nom}
                        />
                        <button>Voir</button> {/* Bouton pour voir les détails de l'établissement */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Etablissements;
