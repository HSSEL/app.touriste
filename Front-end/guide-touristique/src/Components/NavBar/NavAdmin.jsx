import './NavBar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const NavAdmin = () => {
    const navigate = useNavigate();
    
    const handleClick1 = () => {
      navigate('/home'); 
    };
  
    const handleClick2 = () => {
      navigate('/etablissement'); 
    };
    
    const handleClick3 = () => {
      navigate('/user'); 
    };
  
    return (
      <div className='NAV'>
        <div className='nav'>
          <div className="nav-logo">SARINI</div>
          <ul className='nav-menu'>
            <li onClick={handleClick1} className='home'>HOME</li>
            <li onClick={handleClick2} className='etablissement'>Établissements</li>
            <li onClick={handleClick3} className='user'>Utilisateurs</li>
            <li className='Admin'>Admin</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default NavAdmin;