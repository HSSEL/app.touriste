import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchtouristebData } from '../../../data/TouristeData';
import { fetchetabData } from '../../../data/EtabData';
import './utilisateurs.css'

const Utilisateurs = () => {

    const [ users, setusers ] = useState([]);
    const [ etab, setetab ] = useState([]);

    
    useEffect(() => {
        const getusers = async () => {
        try {
            const data = await fetchtouristebData();
            console.log('Fetched touriste data:', data);
            if (Array.isArray(data) && data.length > 0) {
            setusers(data);
            }
        } catch (error) {
            console.error('Error fetching etab data:', error);
        }
        };

        getusers();
    }, []);

    
    useEffect(() => {
        const getetab = async () => {
        try {
            const data = await fetchetabData();
            console.log('Fetched etab data:', data);
            if (Array.isArray(data) && data.length > 0) {
            setetab(data);
            }
        } catch (error) {
            console.error('Error fetching etab data:', error);
        }
        };

        getetab();
    }, []);


    return (
        <div className='users01'>
            <div className='users04'>
                <div className='user04'>
                    <h2>Tous les utilisateurs</h2>
                    <button>Voir tous</button>
                </div>
                <div className='users02'>
                    {users.map(( data, index) => (
                        <div key={index} className='users03'>
                            <img src={`http://localhost:8080/tou/touristeImage/${data.id_touriste}`} alt=''/>
                            <h2>{data.Nom} {data.Prenom}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='users05'>
                <div className='user04'>
                    <h2>Tous les etablissement</h2>
                    <button>Voir tous</button>
                </div>
                <div className='users06'>
                    {etab.map(( data, index) => (
                        <div key={index} className='users07'>
                            <img src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`} alt=''/>
                            <h2>{data.nom}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Utilisateurs;
