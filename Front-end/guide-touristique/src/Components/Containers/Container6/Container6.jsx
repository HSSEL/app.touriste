// hada fih les services


/* 
Ce composant représente un conteneur contenant différents services.
Il affiche des boutons permettant d'accéder à différentes fonctionnalités de l'application.
*/

import './Container6.css'
import { useNavigate, useLocation } from 'react-router-dom';

const Container6 = () => {

    const navigate = useNavigate();// Utilisation du hook de navigation pour rediriger l'utilisateur vers d'autres pages
    const location = useLocation();// Utilisation du hook de localisation pour obtenir des informations sur l'emplacement actuel
    const { state } = location;

// Fonction pour gérer le clic sur le bouton de recherche des villes par nom
    const handleClick = () => {
        navigate('/villes',  {state : {...location.state}});
    };
    // Fonction pour gérer le clic sur le bouton de recherche  des établissements du Maroc
    const handleClick2 = () => {
        navigate('/reetab', {state : {...location.state}});
    };
  
  
    
    return (
        <div className='container6'>
            <div className ='alls'>
                {/* Section de services */}
                <div className='oneservice'>
                    <h3>Chercher les etablissements par nom</h3>
                    {/* Bouton pour rediriger vers la page de recherche des établissements */}
                    <button onClick={handleClick2}>Voir</button>
                </div>
                <div className='oneservice'>
                    {/* Bouton pour rediriger vers la page de recherche des villes */}
                    <h3>Chercher les villes du Maroc</h3>
                    <button onClick={handleClick} >Voir</button>
                </div>
                <div className='oneservice'>
                    <h3>Voir le tansport disponible</h3>
                    <button>Voir</button>
                </div>
                
                <div className='oneservice'>
                    <h3>Traduire</h3>
                    <button>Voir</button>
                </div>
            </div>
        </div>
    );
};

export default Container6;
