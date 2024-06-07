/* hada dyal reserver les hotels et les retaurants */

import React, { useState, useEffect } from 'react';

import { fetchetabData } from '../../../data/EtabData';
import searchIcon from '../../../assets/search.svg';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Container10 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { etablissement_id } = location.state;
    const [etab, setEtab] = useState([]);

    useEffect(() => {
        const getEtabData = async () => {
            try {
                const data = await fetchetabData();
                const filteredData = data.filter(data => data.etablissement_id === etablissement_id);
                if (Array.isArray(filteredData) && filteredData.length > 0) {
                    setEtab(filteredData);
                }
            } catch (error) {
                console.error('Error fetching etab data:', error);
            }
        };
        getEtabData();
    }, []);


    return (
        <div className='container8'>
            {etab.map(( data, index) => (
                <div key={index}>
                    {data.nom}
                </div>
            ))}
        </div>
    );
};

export default Container10;
