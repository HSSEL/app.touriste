import './All.css'
import React, { useEffect, useState } from 'react';
import { fetchetabData } from '../../data/EtabData';
import { useLocation, useNavigate } from 'react-router-dom';

const All = () => {
  const [etabData, setEtabData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleetabClick = (publication) => {
    navigate('/etab', { state: { ...location.state, etablissement_id: publication.etablissement_id} });
  };

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

  return (
    <div className="all">
      <div className='E0'>
        {etabData.map((data, index) => (
          <div key={index} className="E1">
            <img src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`} alt=''/>
            <div className="E2">{data.nom}</div>
            <button onClick={() => handleetabClick(data)}>Plus d'informations</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All;
