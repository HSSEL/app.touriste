/* hada dyal ville we7daa */

import React, { useState, useEffect } from 'react';
import './Container9.css';
import { fetchVilleData } from '../../../data/VilleData';// Importation de la fonction pour récupérer les données des villes
import { fetchetabData } from '../../../data/EtabData';// Importation de la fonction pour récupérer les données des établissements
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MapComponent from '../../../Map/Map.jsx';// Importation du composant de la carte


const Container9 = () => {
    const location = useLocation(); // Hook pour obtenir la localisation actuelle
    const { state } = location; // Récupération de l'état passé via la navigation
    const { ville_id } = location.state; // Récupération de l'identifiant de la ville depuis l'état

    const [villeData, setVilleData] = useState(null); // État pour stocker les données de la ville
    const [etab, setEtabData] = useState([]); // État pour stocker les données des établissements

    // Vérification si l'état a été reçu correctement
    useEffect(() => {
        if (state) {
            console.log('Received villee aaaaaaaaaaaaaaa:', state);
        }
    }, [state]);
// Effet pour récupérer les données de la ville
    useEffect(() => {
        const getVilleData = async () => {
            try {
                const data = await fetchVilleData();// Récupération des données des villes
                const filteredData = data.filter(ville => ville.id_ville === ville_id); // Filtrage des données pour obtenir la ville spécifique
                if (Array.isArray(filteredData) && filteredData.length > 0) {
                    setVilleData(filteredData[0]);// Mise à jour de l'état avec les données de la ville
                
                }
            } catch (error) {
                console.error('Error fetching ville data:', error);
            }
        };
        getVilleData();
    }, [ville_id]);
// Effet pour récupérer les données des établissements
    useEffect(() => {
        const getEtabData = async () => {
            try {
                const data = await fetchetabData();// Récupération des données des établissements
                if (Array.isArray(data) && data.length > 0) {
                    setEtabData(data);// Mise à jour de l'état avec les données des établissements
                }
            } catch (error) {
                console.error('Error fetching etab data:', error);
            }
        };
        getEtabData();
    }, []);

    const navigate = useNavigate();
      // Fonction pour gérer le clic sur un établissement
    const handleclick01 = (data) => {
        navigate('/etab', { state: { ...location.state, etablissement_id: data.etablissement_id } });
    };

    return (
        <div className='container9'>
            <div className='con92'>
                 {/* Affichage des détails de la ville */}
                {villeData ? (
                    <div key={villeData.id_ville}>
                        <div className='con90'>
                            <img src={`http://localhost:8080/vi/villeImage/${villeData.id_ville}`} alt='' />
                            <div className='con91'>
                                <h1>{villeData.Nom}</h1>{/* Affichage du nom de la ville */}
                                <h3>{villeData.Description}</h3>{/* Affichage de la description de la ville */}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>// Affichage d'un message de chargement pendant la récupération des données
                )}
            </div>
            <div className='con932'>
                 {/* Filtrage et affichage des établissements de la ville */}
                <h3>Les etablissements de {villeData ? villeData.Nom : '...'}</h3>
            </div>
            <div className='con93'>
                {etab.filter(data => data.id_ville === ville_id).map((data, index) => (
                    <div key={index} className='con931'>
                        <img src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`} alt='' />
                        <div className="E2"><h2>{data.nom}</h2></div>
                        <button onClick={() => handleclick01(data)}>Plus d'informations</button>
                    </div>
                ))}
            </div>
            <div className='mapcon'>
            {villeData ? (
                <MapComponent latitude={villeData.latitude} longitude={villeData.logitude} />) : (<p>Loading</p> )}
                {/*<MapComponent latitude={10} longitude={15} /> */}   
            </div>
        </div>
    );
};

export default Container9;
