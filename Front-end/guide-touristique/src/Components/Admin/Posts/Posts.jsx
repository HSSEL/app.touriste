// Importation des bibliothèques et modules nécessaires
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchPostData } from '../../../data/postData';
import './Posts.css'

// Définition du composant Posts
const Posts = () => {

    // Initialisation du hook useNavigate pour permettre la navigation entre les pages
    const navigate = useNavigate();

    // Fonction pour rediriger vers la page des villes administratives
    const handleville = () => {
        navigate('/villesadm')
    }

    // Fonction pour rediriger vers la page des publications administratives
    const handlepub = () => {
        navigate('/pubadmin')
    }

    // Initialisation des états pour les publications et les établissements
    const [ posts, setposts ] = useState([]);
    const [ etab, setetab ] = useState([]);

    // Hook useEffect pour récupérer les données des publications au chargement du composant
    useEffect(() => {
        // Fonction asynchrone pour obtenir les données des publications
        const getposts = async () => {
            try {
                // Appel de la fonction fetchPostData pour récupérer les données
                const data = await fetchPostData();
                console.log('Fetched posts data:', data);
                // Vérification si les données sont un tableau non vide
                if (Array.isArray(data) && data.length > 0) {
                    // Mise à jour de l'état posts avec les données récupérées
                    setposts(data);
                }
            } catch (error) {
                console.error('Error fetching etab data:', error);
            }
        };

        // Appel de la fonction pour récupérer les publications
        getposts();
    }, []); // Le tableau de dépendances vide signifie que ce hook s'exécute une seule fois après le premier rendu

    // Hook useEffect pour récupérer les données des établissements au chargement du composant
    useEffect(() => {
        // Fonction asynchrone pour obtenir les données des établissements
        const getetab = async () => {
            try {
                // Appel de la fonction fetchetabData pour récupérer les données (fonction non définie dans ce code)
                const data = await fetchetabData();
                console.log('Fetched etab data:', data);
                // Vérification si les données sont un tableau non vide
                if (Array.isArray(data) && data.length > 0) {
                    // Mise à jour de l'état etab avec les données récupérées
                    setetab(data);
                }
            } catch (error) {
                console.error('Error fetching etab data:', error);
            }
        };

        // Appel de la fonction pour récupérer les établissements
        getetab();
    }, []); // Le tableau de dépendances vide signifie que ce hook s'exécute une seule fois après le premier rendu

    // Rendu du composant
    return (
        <div className='pst01'>
            {/* Section pour afficher toutes les publications */}
            <div className='pst02'>
                <div className='pst03'>
                    <h2>Tous les publications</h2>
                    {/* Bouton pour naviguer vers la page des publications administratives */}
                    <button onClick={handlepub}>Voir tous</button>
                </div>
                <div className='pst04'>
                    {/* Mappage des données des publications pour les afficher */}
                    {posts.map(( data, index) => (
                        <div key={index} className='pst05'>
                            <h2>{data.objet}</h2>
                            <h3>{data.text}</h3>
                            {/* Affichage de l'image de la publication */}
                            <img src={`http://localhost:8080/pub/publicationImage/${data.id_publication}`} alt=''/>
                        </div>
                    ))}
                </div>
            </div>
            {/* Section pour afficher toutes les offres et les villes */}
            <div className='pst06'>
                <div className='pst07'>
                    <h2>Tous les offres</h2>
                    <button>Voir tous</button> {/* Bouton sans fonction associée */}
                </div>
                <div className='pst07'>
                    <h2>Tous les villes de SARINI</h2>
                    {/* Bouton pour naviguer vers la page des villes administratives */}
                    <button onClick={handleville}>Voir tous</button>
                </div>
            </div>
        </div>
    );
};

// Exportation du composant Posts pour l'utiliser dans d'autres parties de l'application
export default Posts;
