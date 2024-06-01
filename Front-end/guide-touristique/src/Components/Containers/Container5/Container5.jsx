import './Container5.css'
import React, { useEffect, useState } from 'react';
import { fetchcomData } from '../../../data/CommentsData';
import { fetchtouristebData } from '../../../data/TouristeData';

const Container5 = () => {
  const [comData, setComData] = useState([]);
  const [touristeData, setTouristeData] = useState([]);

  useEffect(() => {
    const getComData = async () => {
      const data = await fetchcomData();
      console.log('Fetched comment data:', data);
      if (data.length > 0) {
        setComData(data);
      }
    };

    getComData();
  }, []);

  useEffect(() => {
    const getTouristeData = async () => {
      const data = await fetchtouristebData();
      console.log('Fetched tourist data:', data);
      if (data.length > 0) {
        setTouristeData(data);
      }
    };

    getTouristeData();
  }, []);

  return (
    <div className='container5'>
      <h2>Commentaire</h2>
      {comData
        .filter(comment => touristeData.some(tourist => tourist.id_touriste === comment.id_touriste))
        .map((comment, index) => {
          const tourist = touristeData.find(tourist => tourist.id_touriste === comment.id_touriste);
          return (
            <div key={index} className='comment'>
              <p><strong>{tourist ? tourist.Nom : 'Unknown Tourist'}</strong>: {comment.Texte}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Container5;
