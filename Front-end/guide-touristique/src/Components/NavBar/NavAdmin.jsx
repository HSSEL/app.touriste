import './NavBar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const NavAdmin = () => {
    
  /*   const handleClick1 = () => {
      navigate('/home'); 
    };
  
    const handleClick2 = () => {
      navigate('/etablissement'); 
    };
    
    const handleClick3 = () => {
      navigate('/user'); 
    };
   */
    return (
      <div className='NAV'>
        <div className='nav'>
          <div className="nav-logo">SARINI</div>
          <ul className='nav-menu'>
            <li className='home'>Touristes</li>
            <li className='etablissement'>Établissements</li>
            <li className='user'>Publications</li>
            <li className='user'>Offres</li>
            <li className='user'>Villes</li>
            <li className='Admin'>Admin</li>
            <li className='Admin'>Se déconnecter</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default NavAdmin;