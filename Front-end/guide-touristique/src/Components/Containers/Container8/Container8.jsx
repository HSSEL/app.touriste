/* hada dyal les villes kulum */

import React, { useState, useEffect } from 'react';
import './Container8.css';
import { fetchVilleData } from '../../../data/VilleData';
import searchIcon from '../../../assets/search.svg';
import { Navigate, useNavigate } from 'react-router-dom';

const Container8 = () => {
    const [ville, setVille] = useState([]);
    const [search, setSearch] = useState(''); 

    useEffect(() => {
        const getVilleData = async () => {
            try {
                const data = await fetchVilleData();
                if (Array.isArray(data) && data.length > 0) {
                    setVille(data);
                }
            } catch (error) {
                console.error('Error fetching ville data:', error);
            }
        };
        getVilleData();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const navigate = useNavigate();
    const handleClickville = (ville) => {
        navigate('/ville', { state: { ville_id: ville.id_ville } });
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
                    return search === '' ? data : data.Nom.toLowerCase().startsWith(search);
                })
                .map((ville0, index) => (
                    <div key={index} className='onecity'>
                        <h2>{ville0.Nom}</h2>
                        <img 
                            src={`http://localhost:8080/vi/villeImage/1`}
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
