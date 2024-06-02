import './Hotels.css';
import { fetchHotelData } from '../../data/HotelData';
import Frame1 from '../../assets/etab/Frame1.png';
import Star1 from '../../assets/etab/Star1.png';
import Star2 from '../../assets/etab/Star2.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Hotels = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { nom } = location.state; // Destructuring nom from location.state

    const handleIconClick = () => {
        navigate('/Restaurant1');
    };

    const [hotelData, setHotelData] = useState([]);

    useEffect(() => {
        const getHotelData = async () => {
            const data = await fetchHotelData();
            console.log('Fetched hotel data:', data);
            if (data.length > 0) {
                setHotelData(data);
            }
        };

        getHotelData();
    }, []);

    return (
        <div className="hotels">
            <div className='etabtype'>{ nom }</div>
                <div className="hotel">
                    {hotelData.map((hotel, index) => (
                        <div key={index} className="hotel1">
                            <div className="hotelname">{hotel.nom}</div>
                            <img className="hotelimage" src={`http://localhost:8080/eta/EtablissementImage/${hotel.etablissement_id}`} alt={hotel.nom || "Hotel Image"} />  
                            <div className="stars">
                                {[...Array(0)].map((_, i) => (
                                    <img key={i} src={Star1} alt="Star" />
                                ))}
                                {[...Array(5 - 0)].map((_, i) => (
                                    <img key={i} src={Star2} alt="Empty Star" />
                                ))}
                            </div>
                            <div className="reserver" onClick={handleIconClick}>Reserver</div>
                        </div>
                    ))}
                
            </div>
        </div>
    );
};

export default Hotels;
