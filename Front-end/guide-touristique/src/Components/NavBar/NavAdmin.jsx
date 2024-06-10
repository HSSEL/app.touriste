import './NavBar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const NavAdmin = () => {

    const navigate = useNavigate();

    const handleTou = () => {
        navigate('/touristes')
    }
    
    const handleAdm = () => {
        navigate('/admin')
    }
    
    const handleetabs = () => {
        navigate('/etablissements')
    }
    
    const handleville = () => {
        navigate('/villesadm')
    }

    return (
        <div className='NAV'>
            <div className='nav'>
                <div className="nav-logo">SARINI</div>
                    <ul className='nav-menu'>
                        <li onClick={handleTou} className='home'>Touristes</li>
                        <li onClick={handleetabs} className='etablissement'>Établissements</li>
                        <li className='user'>Publications</li>
                        <li className='user'>Offres</li>
                        <li onClick={handleville} className='user'>Villes</li> 
                        <li onClick={handleAdm} className='Admin'>Admin</li>
                        <li className='Admin'>Se déconnecter</li>
                </ul>
            </div>
        </div>
    );
    };
  
    export default NavAdmin;