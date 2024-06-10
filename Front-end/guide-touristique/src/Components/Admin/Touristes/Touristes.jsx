/* hada fih touristes kulum  */

import React, { useState, useEffect } from 'react';
import './Touristes.css';
import { fetchtouristebData } from '../../../data/TouristeData';
import searchIcon from '../../../assets/search.svg';
import { Navigate, useNavigate } from 'react-router-dom';

const Touristes = () => {
    const [tou, settou] = useState([]);
    const [search, setSearch] = useState(''); 

    useEffect(() => {
        const gettou = async () => {
            try {
                const data = await fetchtouristebData();
                if (Array.isArray(data) && data.length > 0) {
                    settou(data);
                }
            } catch (error) {
                console.error('Error fetching ville data:', error);
            }
        };
        gettou();
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
                {tou
                .filter((data) => {
                    return search === '' ? data : data.Nom.toLowerCase().startsWith(search);
                })
                .map((data, index) => (
                    <div key={index} className='onecity'>
                        <h2>{data.Nom}</h2>
                        <img 
                            src={`http://localhost:8080/tou/touristeImage/${data.id_touriste}`}
                            alt={data.Nom}
                        />
                        <button>Voir</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Touristes;
