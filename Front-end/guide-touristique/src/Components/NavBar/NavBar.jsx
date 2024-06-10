import './NavBar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NavBar = () => {
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
  const handleClick4 = () => {
    navigate('/ContactForm', {state}); 
  };
  return (
    <div className='NAV'>
      <div className='nav'>
        <div className="nav-logo">SARINI</div>
        <ul className='nav-menu'>
          <li onClick={handleClick1} className='home'>HOME</li>
          <li onClick={handleClick2} className='services'>SERVICES</li>
          <li onClick={handleClick3} className='aboutus'>À PROPOS DE NOUS</li>
          <li onClick={handleClick4} className='contact'>CONTACT</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
