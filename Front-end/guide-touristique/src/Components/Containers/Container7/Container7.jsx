import './Container7.css'
import React, { useEffect, useState } from 'react';
import { fetchetabData } from '../../../data/EtabData';
import { useLocation } from 'react-router-dom';
import { fetchVilleData } from '../../../data/VilleData';

const Container7 = () => {
  
    const location = useLocation();
    const { etablissement_id } = location.state;

    const [ville, setVille] = useState('');
    const [etabData, setEtabData] = useState([]);

    useEffect(() => {
        const getEtabData = async () => {
          try {
            const data = await fetchetabData();
            console.log('Fetched etab data:', data);
            const filteredData = data.filter(etab => etab.etablissement_id === etablissement_id);
            if (Array.isArray(filteredData) && filteredData.length > 0) {
              setEtabData(filteredData);
            }
          } catch (error) {
            console.error('Error fetching etab data:', error);
          }
        };
    
        getEtabData();
    }, [etablissement_id]);

    useEffect(() => {
        const getVilleData = async () => {
          try {
            if (etabData.length > 0) {
              const data = await fetchVilleData();
              console.log('Fetched ville data:', data);
              const filteredData = data.filter(ville => ville.id_ville === etabData[0].id_ville);
              if (Array.isArray(filteredData) && filteredData.length > 0) {
                setVille(filteredData[0]);
              }
            }
          } catch (error) {
            console.error('Error fetching ville data:', error);
          }
        };
    
        getVilleData();
    }, [etabData]);

    return (
        <div className='container7'>
            <div>
                {etabData.map((etab, index) => (
                    <div key={index}>
                        <img src={`http://localhost:8080/eta/EtablissementImage/${etab.etablissement_id}`} alt='' />
                        <h2>{etab.nom}</h2>
                        <div>
                          {ville && <p>Ville: {ville.Nom}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Container7;
