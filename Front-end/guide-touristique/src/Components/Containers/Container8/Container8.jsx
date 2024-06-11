/* hada dyal les villes kulum */

import React, { useState, useEffect } from 'react';
import './Container8.css';
import { fetchVilleData } from '../../../data/VilleData';
import searchIcon from '../../../assets/search.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const Container8 = () => {
    const [ville, setVille] = useState([]);// État pour stocker les données des villes
    const location = useLocation();// Hook pour obtenir la localisation actuelle
    const [search, setSearch] = useState(''); // État pour stocker le terme de recherche

    useEffect(() => {
        const getVilleData = async () => {
            try {
                const data = await fetchVilleData();// Appel de la fonction pour récupérer les données des villes
                if (Array.isArray(data) && data.length > 0) {
                    setVille(data);// Mise à jour de l'état avec les données des villes
                }
            } catch (error) {
                console.error('Error fetching ville data:', error);
            }
        };
        getVilleData(); // Appel de la fonction pour récupérer les données des villes
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const navigate = useNavigate();
    // Fonction pour gérer le clic sur une ville
    const handleClickville = (ville) => {
        navigate('/ville', { state: { ...location.state, ville_id: ville.id_ville } });
    }

    return (
        <div className='container8'>
            <div className='search0'>
                <img src={searchIcon} alt='Search Icon' />
                <input 
                    onChange={handleSearchChange}
                    type="text" 
                    placeholder="Chercher un etablissement"
                />
            </div>
            <div className='cities'>
                {ville
                .filter((data) => {
                    // Filtrage des villes en fonction du terme de recherche
                    return search === '' ? data : data.Nom.toLowerCase().startsWith(search);
                })
                .map((ville0, index) => (
                    <div key={index} className='onecity'>
                        <h2>{ville0.Nom}</h2>{/* Affichage du nom de la ville */}
                        <img 
                            src={`http://localhost:8080/vi/villeImage/${ville0.id_ville}`}
                            alt={ville0.Nom} 
                            onError={(e) => { e.target.src = '/path/to/placeholder_image.png'; }}
                        />
                        <button onClick={() => handleClickville(ville0)}>Visiter</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Container8;
