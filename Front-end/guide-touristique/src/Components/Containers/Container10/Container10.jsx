/* hada dyal les chercher etab selon la ville */

import React, { useState, useEffect } from 'react';
import './Container10.css';
import { fetchetabData } from '../../../data/EtabData';
import searchIcon from '../../../assets/search.svg';
import { useNavigate , useLocation} from 'react-router-dom';

const Container10 = () => {
    const [etab, setEtab] = useState([]);
    const [search, setSearch] = useState(''); 
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        if (state) {
            console.log('Received hna hnaa spaaaaaaaaaaaaaaaaaaaaaaaamSS:', state);
        }
    }, [state]);

// Effet pour récupérer les données des établissements
    useEffect(() => {
        const getEtabData = async () => {
            try {
                const data = await fetchetabData();
                if (Array.isArray(data) && data.length > 0) {
                    setEtab(data);
                }
            } catch (error) {
                console.error('Error fetching etab data:', error);
            }
        };
        getEtabData();
    }, []);
 // Fonction pour gérer le changement de recherche
    const handleSearchChange = (e) => {
        setSearch(e.target.value.toLowerCase());// Mise à jour de l'état de recherche
    };

    const navigate = useNavigate();
     // Fonction pour gérer le clic sur un établissement
    const handleClickEtab = (etab) => {
        navigate('/etab', { state: { ...location.state, etablissement_id: etab.etablissement_id } });
    }

    return (
        <div className='container8'>
            <div className='search0'>
                <img src={searchIcon} alt='Search Icon' />{/* Affichage de l'icône de recherche */}
                <input 
                    onChange={handleSearchChange}
                    type="text" 
                    placeholder="Chercher un etablissement"// Champ de saisie pour la recherche d'un établissement
                />
            </div>
            
            <div className='cities'>
                {/* Filtrage et affichage des établissements */}
                {etab
                .filter((data) => {
                    return search === '' ? data : data.nom.toLowerCase().startsWith(search);// Filtrage des établissements selon la recherche
                })
                .map((data, index) => (
                    <div key={index} className='onecity'>
                        <h2>{data.nom}</h2>
                        <img 
                            src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`}
                            alt={data.nom} 
                            onError={(e) => { e.target.src = '/path/to/placeholder_image.png'; }}
                        />
                        <button onClick={() => handleClickEtab(data)}>Visiter</button>{/* Bouton pour visiter l'établissement */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Container10;
