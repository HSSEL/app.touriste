import './Hotels.css';
import useFetchDataByType from '../../data/useFetchDataByType';
import Star1 from '../../assets/etab/Star1.png';
import Star2 from '../../assets/etab/Star2.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Hotels = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { nom } = location.state; 
    const lowerCaseNom = nom.toLowerCase();
    const { state } = location;
    useEffect(() => {
        if (state) {
            console.log('Received state after seleting type:', state);
        }
    }, [state]);
    

    const handleIconClick = ( hotel ) => {
        navigate('/etab', { state: { ...location.state, etablissement_id: hotel.etablissement_id} });
    };

    const { data: hotelData, error } = useFetchDataByType(lowerCaseNom);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="hotels">
            <div className="etabtype">{nom}</div>
            <div className="hotel">
                {hotelData.map((hotel, index) => (
                    <div key={index} className="hotel1">
                        <div className="hotelname">{hotel.nom}</div>
                        <img
                            className="hotelimage"
                            src={`http://localhost:8080/eta/EtablissementImage/${hotel.etablissement_id}`}
                            alt={hotel.nom || "Hotel Image"}
                        />
                        <div className="stars">
                            {[...Array(hotel.rating)].map((_, i) => (
                                <img key={i} src={Star1} alt="Star" />
                            ))}
                            {[...Array(5 - hotel.rating)].map((_, i) => (
                                <img key={i} src={Star2} alt="Empty Star" />
                            ))}
                        </div>
                        <div className="reserver" onClick={() => handleIconClick(hotel)}>Explorez ceci</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hotels;
