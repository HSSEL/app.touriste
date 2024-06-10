/* Ce fichier contient le composant pour afficher les publications des touristes */

import React, { useState, useEffect } from 'react';
import './Touristes.css'; // Importation du fichier CSS pour le style du composant
import { fetchPostData } from '../../../data/postData'; // Importation de la fonction pour récupérer les données des publications
import searchIcon from '../../../assets/search.svg'; // Importation de l'icône de recherche
import { Navigate, useNavigate } from 'react-router-dom'; // Importation des outils de navigation

// Définition du composant fonctionnel Publicationadmin
const Publicationadmin = () => {
    // Déclaration de l'état pour les publications et la recherche
    const [post, setPost] = useState([]); // État pour stocker les publications
    const [search, setSearch] = useState(''); // État pour stocker la valeur de recherche

    // Utilisation de l'effet pour récupérer les données des publications au montage du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les données des publications
        const getPost = async () => {
            try {
                // Appel de la fonction pour récupérer les données des publications
                const data = await fetchPostData();
                // Vérification si les données sont un tableau non vide
                if (Array.isArray(data) && data.length > 0) {
                    // Mise à jour de l'état avec les données récupérées
                    setPost(data);
                }
            } catch (error) {
                // Affichage d'une erreur en cas d'échec de la récupération des données
                console.error('Error fetching publication data:', error);
            }
        };
        // Appel de la fonction pour récupérer les publications
        getPost();
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
                    placeholder="Chercher une publication par objet" // Texte d'invite de recherche
                />
            </div>
            {/* Section d'affichage des publications */}
            <div className='cities'>
                {post
                // Filtrer les publications en fonction de la recherche
                .filter((data) => {
                    return search === '' ? data : data.objet.toLowerCase().startsWith(search);
                })
                // Mappage des publications filtrées pour les afficher
                .map((data, index) => (
                    <div key={index} className='onecity'>
                        <h2>{data.objet}</h2>
                        <img 
                            src={`http://localhost:8080/pub/publicationImage/${data.id_publication}`} // URL de l'image de la publication
                            alt={data.objet}
                        />
                        <button>Voir</button> {/* Bouton pour voir les détails de la publication */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Publicationadmin;
