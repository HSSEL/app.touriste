/* hada dyal ville we7daa */

import React, { useState, useEffect } from 'react';
import './Container9.css';
import { fetchVilleData } from '../../../data/VilleData';
import { fetchetabData } from '../../../data/EtabData';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MapComponent from '../../../Map/Map.jsx';

const Container9 = () => {
    const location = useLocation();
    const { ville_id } = location.state;

    const [villeData, setVilleData] = useState(null);
    const [etab, setEtabData] = useState([]);

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
    }, [ville_id]);

    useEffect(() => {
        const getEtabData = async () => {
            try {
                const data = await fetchetabData();
                if (Array.isArray(data) && data.length > 0) {
                    setEtabData(data);
                }
            } catch (error) {
                console.error('Error fetching etab data:', error);
            }
        };
        getEtabData();
    }, []);

    const navigate = useNavigate();
    const handleclick01 = (data) => {
        navigate('/etab', { state: { etablissement_id: data.etablissement_id } });
    };

    return (
        <div className='container9'>
            <div className='con92'>
                {villeData ? (
                    <div key={villeData.id_ville}>
                        <div className='con90'>
                            <img src={`http://localhost:8080/vi/villeImage/${villeData.id_ville}`} alt='' />
                            <div className='con91'>
                                <h1>{villeData.Nom}</h1>
                                <h3>{villeData.Description}</h3>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className='con932'>
                <h3>Les etablissements de {villeData ? villeData.Nom : '...'}</h3>
            </div>
            <div className='con93'>
                {etab.filter(data => data.id_ville === ville_id).map((data, index) => (
                    <div key={index} className='con931'>
                        <img src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`} alt='' />
                        <div className="E2"><h2>{data.nom}</h2></div>
                        <button onClick={() => handleclick01(data)}>Plus d'informations</button>
                    </div>
                ))}
            </div>
            <div className='mapcon'>
            {villeData ? (
                <MapComponent latitude={villeData.latitude} longitude={villeData.logitude} />) : (<p>Loading</p> )}
                {/*<MapComponent latitude={10} longitude={15} /> */}   
            </div>
        </div>
    );
};

export default Container9;
