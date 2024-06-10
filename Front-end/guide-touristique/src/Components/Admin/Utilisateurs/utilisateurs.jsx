import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchtouristebData } from '../../../data/TouristeData';
import { fetchetabData } from '../../../data/EtabData';
import './utilisateurs.css'

const Utilisateurs = () => {

    const navigate = useNavigate();

    const [ users, setUsers ] = useState([]);
    const [ etab, setEtab ] = useState([]);

    const handletou = () =>{
        navigate('/touristes')
    }
    
    const handleetab = () =>{
        navigate('/etablissements')
    }

    
    useEffect(() => {
        const getUsers = async () => {
        try {
            const data = await fetchtouristebData();
            console.log('Fetched touriste data:', data);
            if (Array.isArray(data) && data.length > 0) {
            setUsers(data);
            }
        } catch (error) {
            console.error('Error fetching etab data:', error);
        }
        };

        getUsers();
    }, []);

    
    useEffect(() => {
        const getEtab = async () => {
        try {
            const data = await fetchetabData();
            console.log('Fetched etab data:', data);
            if (Array.isArray(data) && data.length > 0) {
            setEtab(data);
            }
        } catch (error) {
            console.error('Error fetching etab data:', error);
        }
        };

        getEtab();
    }, []);


    return (
        <div className='users01'>
            {/* hada kay5erej ga3 les touristes */}
            <div className='users04'>
                <div className='user04'>
                    <h2>Tous les utilisateurs</h2>
                    <button onClick={handletou}>Voir tous</button>
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
                {/* hada kay5erej ga3 les etablissements */}
                <div className='user04'>
                    <h2>Tous les etablissement</h2>
                    <button onClick={handleetab}>Voir tous</button>
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
