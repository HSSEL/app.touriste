import './Hotels.css'; // Importe les styles CSS spécifiques au composant Hotels.

import useFetchDataByType from '../../data/useFetchDataByType'; // Importe le hook personnalisé useFetchDataByType pour récupérer les données des hôtels.
import Star1 from '../../assets/etab/Star1.png'; // Importe l'image de l'étoile pleine pour afficher la notation de l'hôtel.
import Star2 from '../../assets/etab/Star2.png'; // Importe l'image de l'étoile vide pour afficher la notation manquante de l'hôtel.
import { useNavigate } from 'react-router-dom'; // Importe le hook useNavigate pour la navigation programmée.
import { useLocation } from 'react-router-dom'; // Importe le hook useLocation pour accéder à l'objet location.
import { useEffect } from 'react'; // Importe le hook useEffect pour gérer les effets de bord dans le composant.

const Hotels = () => {
    const navigate = useNavigate(); // Initialise la fonction de navigation.
    const location = useLocation(); // Obtient l'objet location pour accéder aux données de l'URL.
    const { nom } = location.state; // Extrait le nom de type d'établissement de l'objet location.state.
    const lowerCaseNom = nom.toLowerCase(); // Convertit le nom du type d'établissement en minuscules.
    const { state } = location; // Extrait les données d'état supplémentaires de l'objet location.

    // Effectue une action lorsque l'état change.
    useEffect(() => {
        if (state) {
            console.log('Received state after selecting type:', state);
        }
    }, [state]);

    // Gère le clic sur l'icône de l'hôtel pour naviguer vers la page de détails de l'établissement.
    const handleIconClick = (hotel) => {
        navigate('/etab', { state: { ...location.state, etablissement_id: hotel.etablissement_id } });
    };

    // Appelle le hook useFetchDataByType pour obtenir les données des hôtels en fonction du type.
    const { data: hotelData, error } = useFetchDataByType(lowerCaseNom);

    // Gère les erreurs lors de la récupération des données des hôtels.
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Rendu JSX du composant Hotels.
    return (
        <div className="hotels">
            <div className="etabtype">{nom}</div> {/* Affiche le nom du type d'établissement */}
            <div className="hotel">
                {/* Boucle à travers les données des hôtels et affiche chaque hôtel */}
                {hotelData.map((hotel, index) => (
                    <div key={index} className="hotel1">
                        <div className="hotelname">{hotel.nom}</div> {/* Affiche le nom de l'hôtel */}
                        <img
                            className="hotelimage"
                            src={`http://localhost:8080/eta/EtablissementImage/${hotel.etablissement_id}`}
                            alt={hotel.nom || "Hotel Image"} // Affiche une image par défaut si le nom de l'hôtel est indisponible.
                        />
                        <div className="stars">
                            {/* Affiche les étoiles en fonction de la notation de l'hôtel */}
                            {[...Array(hotel.rating)].map((_, i) => (
                                <img key={i} src={Star1} alt="Star" />
                            ))}
                            {[...Array(5 - hotel.rating)].map((_, i) => (
                                <img key={i} src={Star2} alt="Empty Star" />
                            ))}
                        </div>
                        {/* Affiche un bouton pour explorer cet hôtel et gère le clic */}
                        <div className="reserver" onClick={() => handleIconClick(hotel)}>Explorez ceci</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hotels; // Exporte le composant Hotels pour une utilisation dans d'autres fichiers.
