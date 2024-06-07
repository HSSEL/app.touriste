// hada fih les services

import './Container6.css'
import { useNavigate } from 'react-router-dom';

const Container6 = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/villes');
    };
    
    const handleClick2 = () => {
        navigate('/reetab');
    };
  
  
    
    return (
        <div className='container6'>
            <div className ='alls'>
                <div className='oneservice'>
                    <h3>Chercher les etablissements par nom</h3>
                    <button onClick={handleClick2}>Voir</button>
                </div>
                <div className='oneservice'>
                    <h3>Chercher les villes du Maroc</h3>
                    <button onClick={handleClick} >Voir</button>
                </div>
                <div className='oneservice'>
                    <h3>Voir le tansport disponible</h3>
                    <button>Voir</button>
                </div>
            </div>
        </div>
    );
};

export default Container6;
