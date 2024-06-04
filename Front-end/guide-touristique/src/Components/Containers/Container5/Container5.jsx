import './Container5.css'
import React, { useEffect, useState } from 'react';
import { fetchcomData } from '../../../data/CommentsData';
import { fetchtouristebData } from '../../../data/TouristeData';
import { useLocation } from 'react-router-dom';

const Container5 = () => {
  const [comData, setComData] = useState([]);
  const [touristeData, setTouristeData] = useState([]);

  
  const location = useLocation();
  const { id_publication } = location.state;

    
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const getComData = async () => {
      const data = await fetchcomData();
      console.log('Fetched comment data:', data);
      const filteredData = data.filter(comment => comment.id_publication === id_publication);
      if (filteredData.length > 0) {
        setComData(filteredData);
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
      <div className='comments'>
      {comData
        .filter(comment => touristeData.some(tourist => tourist.id_touriste === comment.id_touriste))
        .map((comment, index) => {
          const tourist = touristeData.find(tourist => tourist.id_touriste === comment.id_touriste);
          return (
            <div key={index} className='comment'>
                <div className='commentowner'>
                <img src={`http://localhost:8080/tou/touristeImage/${tourist.id_touriste}`} alt="" />
                <div className='commentowner0'>
                <h3>{tourist ? tourist.Prenom : 'Unknown Tourist'} {tourist ? tourist.Nom : ''}</h3>
                <h5>{formatDate(comment.Date)}</h5>
                </div>
                </div>
              <div className='commenttext'>{comment.Texte}</div>
            </div>
          );
        })}</div>
        <div className='mycomment'>
        <input
                        type="text"
                        name="mycomment0"
                        placeholder="Ajouter un commentaire..."
                    />
        <button>Ajouter</button>
        </div>
    </div>
  );
};

export default Container5;
