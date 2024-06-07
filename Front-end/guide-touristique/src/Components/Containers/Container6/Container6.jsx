import './Container6.css'
import { useNavigate } from 'react-router-dom';

const Container6 = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/villes');
    };
  
  
    
    return (
        <div className='container6'>
            <div className ='alls'>
                <div className='oneservice'>
                    <h3>Chercher les etablissements selon la ville</h3>
                    <button>Voir</button>
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
