import BG from "../Components/BG/BG";
import NavBar from "../Components/NavBar/NavBar";
import Options from "../Components/Options/Options";
import { useLocation } from "react-router-dom";
import React from 'react';
import MapComponent from '../Map/Map'; 


const Map2 = () => {
    const latitude = 51.505;
    const longitude = -0.09;
  
    return (
      <div>
        <h1>Map Example</h1>
        <MapComponent latitude={latitude} longitude={longitude} />
      
    
  
        
            <BG/>
            <NavBar/>
            <Options/>
        </div>
    );
};

export default Map2;
