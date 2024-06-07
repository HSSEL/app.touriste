/* hada dyal ville we7daa */

import React, { useState, useEffect } from 'react';
import './Container9.css';
import { fetchVilleData } from '../../../data/VilleData';
import searchIcon from '../../../assets/search.svg';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Container9 = () => {

    const location = useLocation();
    const { ville_id } = location.state;

    const [ villeData, setVilleData ] = useState();

    useEffect(() => {
        const getVilleData = async () => {
            try {
                const data = await fetchVilleData();
                const filteredData = data.filter(ville => ville.id_ville === ville_id);
                if (Array.isArray(filteredData) && filteredData.length > 0) {
                    setVilleData(filteredData[0]);
                }
            } catch (error) {
                console.error('Error fetching ville data:', error);
            }
        };
        getVilleData();
    }, []);

    return (
        <div className='container9'>

            {ville_id}
        </div>
    );
};

export default Container9;
