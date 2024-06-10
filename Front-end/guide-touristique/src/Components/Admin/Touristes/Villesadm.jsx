/* hada fih touristes kulum  */

import React, { useState, useEffect } from 'react';
import './Touristes.css';
import { fetchVilleData } from '../../../data/VilleData';
import searchIcon from '../../../assets/search.svg';
import { Navigate, useNavigate } from 'react-router-dom';

const Villesadm = () => {
    const [ville, setVille] = useState([]);
    const [search, setSearch] = useState(''); 

    useEffect(() => {
        const getVille = async () => {
            try {
                const data = await fetchVilleData();
                if (Array.isArray(data) && data.length > 0) {
                    setVille(data);
                }
            } catch (error) {
                console.error('Error fetching ville data:', error);
            }
        };
        getVille();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value.toLowerCase());
    };


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
                .map((data, index) => (
                    <div key={index} className='onecity'>
                        <h2>{data.Nom}</h2>
                        <img 
                            src={`http://localhost:8080/vi/villeImage/${data.id_ville}`}
                            alt={data.nom}
                        />
                        <button>Voir</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Villesadm;
