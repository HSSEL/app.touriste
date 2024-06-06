import './NavBar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  
  const handleClick1 = () => {
    navigate('/home'); 
  };

  const handleClick2 = () => {
    navigate('/services'); 
  };
  
  const handleClick3 = () => {
    navigate('/map'); 
  };

  return (
    <div className='NAV'>
      <div className='nav'>
        <div className="nav-logo">SARINI</div>
        <ul className='nav-menu'>
          <li onClick={handleClick1} className='home'>HOME</li>
          <li onClick={handleClick2} className='services'>SERVICES</li>
          <li onClick={handleClick3} className='aboutus'>À PROPOS DE NOUS</li>
          <li className='nav-contact'>CONTACT</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
