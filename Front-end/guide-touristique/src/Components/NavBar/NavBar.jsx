import './NavBar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate(); // Use useNavigate hook to get the navigate function

  const handleClick = () => {
    navigate('/home'); // Use navigate function to navigate
  };

  return (
    <div className='NAV'>
      <div className='nav'>
        <div className="nav-logo">SARINI</div>
        <ul className='nav-menu'>
          <li onClick={handleClick} className='home'>HOME</li>
          <li>SERVICES</li>
          <li>ABOUT US</li>
          <li className='nav-contact'>CONTACT</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
