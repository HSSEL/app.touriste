/* hada fih touristes kulum  */

import React, { useState, useEffect } from 'react';
import './Touristes.css';
import { fetchetabData } from '../../../data/EtabData';
import searchIcon from '../../../assets/search.svg';
import { Navigate, useNavigate } from 'react-router-dom';

const Etablissements = () => {
    const [etab, setEtab] = useState([]);
    const [search, setSearch] = useState(''); 

    useEffect(() => {
        const getEtab = async () => {
            try {
                const data = await fetchetabData();
                if (Array.isArray(data) && data.length > 0) {
                    setEtab(data);
                }
            } catch (error) {
                console.error('Error fetching ville data:', error);
            }
        };
        getEtab();
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
                {etab
                .filter((data) => {
                    return search === '' ? data : data.nom.toLowerCase().startsWith(search);
                })
                .map((data, index) => (
                    <div key={index} className='onecity'>
                        <h2>{data.nom}</h2>
                        <img 
                            src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`}
                            alt={data.nom}
                        />
                        <button>Voir</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Etablissements;
