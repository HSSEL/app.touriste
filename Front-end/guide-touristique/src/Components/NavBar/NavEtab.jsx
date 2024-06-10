import './NavBar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NavBarEtab = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { state } =location;

    useEffect(() => {
      if (state) {
          console.log('Received state from nav bar:', state);
      }
    }, [state]);

  
  const handleClick1 = () => {
    navigate('/home', {state}); 
  };

  const handleClick2 = () => {
    navigate('/services', {state}); 
  };
  
  const handleClick3 = () => {
    navigate('/map', {state}); 
  };

  
  const handlelogout = () => {
    navigate('/logout')
}

  return (
    <div className='NAV'>
      <div className='nav'>
        <div className="nav-logo">SARINI</div>
        <ul className='nav-menu'>
          <li onClick={handleClick1} className='home'>Ajouter une publication</li>
          <li onClick={handleClick2} className='services'>Publier un offre</li>
          <li onClick={handleClick3} className='aboutus'>Modifier mes infos</li>
          <li onClick={handlelogout} className='Admin'>Se déconnecter</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBarEtab;
