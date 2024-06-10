import React, { useState, useEffect } from 'react'; // Importation des hooks useState et useEffect de React
import axios from 'axios'; // Importation d'axios pour les requêtes HTTP
import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate pour la navigation
import { fetchtouristebData } from '../../../data/TouristeData'; // Importation de la fonction pour récupérer les données des touristes
import { fetchetabData } from '../../../data/EtabData'; // Importation de la fonction pour récupérer les données des établissements
import './utilisateurs.css' // Importation du fichier CSS pour le style du composant

const Utilisateurs = () => {
    const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation
    const [users, setUsers] = useState([]); // État pour stocker les données des utilisateurs (touristes)
    const [etab, setEtab] = useState([]); // État pour stocker les données des établissements

    // Fonction pour naviguer vers la page des touristes
    const handletou = () => {
        navigate('/touristes');
    }
    
    // Fonction pour naviguer vers la page des établissements
    const handleetab = () => {
        navigate('/etablissements');
    }

    // Effet pour récupérer les données des touristes au montage du composant
    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchtouristebData(); // Appel de la fonction pour récupérer les données des touristes
                console.log('Fetched touriste data:', data); // Affichage des données récupérées dans la console
                if (Array.isArray(data) && data.length > 0) {
                    setUsers(data); // Mise à jour de l'état avec les données récupérées
                }
            } catch (error) {
                console.error('Error fetching etab data:', error); // Affichage de l'erreur en cas d'échec
            }
        };
        getUsers(); // Appel de la fonction pour récupérer les données des touristes
    }, []);

    // Effet pour récupérer les données des établissements au montage du composant
    useEffect(() => {
        const getEtab = async () => {
            try {
                const data = await fetchetabData(); // Appel de la fonction pour récupérer les données des établissements
                console.log('Fetched etab data:', data); // Affichage des données récupérées dans la console
                if (Array.isArray(data) && data.length > 0) {
                    setEtab(data); // Mise à jour de l'état avec les données récupérées
                }
            } catch (error) {
                console.error('Error fetching etab data:', error); // Affichage de l'erreur en cas d'échec
            }
        };
        getEtab(); // Appel de la fonction pour récupérer les données des établissements
    }, []);

    return (
        <div className='users01'>
            {/* Section pour afficher tous les touristes */}
            <div className='users04'>
                <div className='user04'>
                    <h2>Tous les utilisateurs</h2>
                    <button onClick={handletou}>Voir tous</button> {/* Bouton pour voir tous les touristes */}
                </div>
                <div className='users02'>
                    {users.map((data, index) => (
                        <div key={index} className='users03'>
                            <img src={`http://localhost:8080/tou/touristeImage/${data.id_touriste}`} alt=''/> {/* Affichage de l'image du touriste */}
                            <h2>{data.Nom} {data.Prenom}</h2> {/* Affichage du nom et prénom du touriste */}
                        </div>
                    ))}
                </div>
            </div>
            {/* Section pour afficher tous les établissements */}
            <div className='users05'>
                <div className='user04'>
                    <h2>Tous les etablissement</h2>
                    <button onClick={handleetab}>Voir tous</button> {/* Bouton pour voir tous les établissements */}
                </div>
                <div className='users06'>
                    {etab.map((data, index) => (
                        <div key={index} className='users07'>
                            <img src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`} alt=''/> {/* Affichage de l'image de l'établissement */}
                            <h2>{data.nom}</h2> {/* Affichage du nom de l'établissement */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Utilisateurs;
