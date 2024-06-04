import './Container5.css'
import React, { useEffect, useState } from 'react';
import { fetchcomData } from '../../../data/CommentsData';
import { fetchtouristebData } from '../../../data/TouristeData';
import { useLocation } from 'react-router-dom';

const Mycomment = () => {
  
    
  const location = useLocation();
  const { id_publication } = location.state;


  return (
    <div className='mycomment'>
        <input
                        type="text"
                        name="mycomment0"
                        placeholder="Ajouter un commentaire..."
                    />
        <button>Ajouter</button>
        
    </div>
  );
};

export default Mycomment;
