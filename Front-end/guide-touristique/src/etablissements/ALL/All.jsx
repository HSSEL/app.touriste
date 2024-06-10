import './All.css'; // Importe les styles CSS spécifiques au composant All.
import React, { useEffect, useState } from 'react'; // Importe React, useEffect et useState depuis la bibliothèque React.
import { fetchetabData } from '../../data/EtabData'; // Importe la fonction fetchetabData pour récupérer les données des établissements.
import { useLocation, useNavigate } from 'react-router-dom'; // Importe les hooks useLocation et useNavigate pour la gestion de l'URL dans React.

const All = () => {
  const [etabData, setEtabData] = useState([]); // Initialise l'état pour stocker les données des établissements.
  const location = useLocation(); // Obtient l'objet location pour accéder aux données de l'URL.
  const { state } = location; // Extrait les données d'état supplémentaires de l'objet location.
  
  // Effectue une action lorsque l'état change.
  useEffect(() => {
    if (state) {
        console.log('Received state from aaaalllll:', state);
    }
  }, [state]);

  const navigate = useNavigate(); // Initialise la fonction de navigation.

  // Gère le clic sur un établissement pour naviguer vers sa page de détails.
  const handleetabClick = (publication) => {
    navigate('/etab', { state: { ...location.state, etablissement_id: publication.etablissement_id } });
  };

  // Effectue une action lorsque le composant est monté pour récupérer les données des établissements.
  useEffect(() => {
    const getEtabData = async () => {
      try {
        const data = await fetchetabData(); // Appelle la fonction pour récupérer les données des établissements.
        if (Array.isArray(data) && data.length > 0) {
          setEtabData(data); // Met à jour l'état avec les données des établissements.
        }
      } catch (error) {
        console.error('Error fetching etab data:', error); // Affiche une erreur en cas d'échec de la récupération des données des établissements.
      }
    };

    getEtabData(); // Appelle la fonction pour récupérer les données des établissements.
  }, []);

  // Rendu JSX du composant All.
  return (
    <div className="all">
      <div className='E0'>
        {/* Mappe les données des établissements et affiche chaque établissement */}
        {etabData.map((data, index) => (
          <div key={index} className="E1">
            <img src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`} alt=''/> {/* Affiche l'image de l'établissement */}
            <div className="E2">{data.nom}</div> {/* Affiche le nom de l'établissement */}
            <button onClick={() => handleetabClick(data)}>Plus d'informations</button> {/* Affiche un bouton pour obtenir plus d'informations sur l'établissement */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default All; // Exporte le composant All pour une utilisation dans d'autres fichiers.
