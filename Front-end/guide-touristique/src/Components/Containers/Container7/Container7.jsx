/* Ce composant affiche les détails d'un établissement, 
y compris ses informations de contact, ses publications, 
ses commentaires et la possibilité de réserver. */

import './Container7.css';
import React, { useEffect, useState } from 'react';
import { fetchetabData } from '../../../data/EtabData';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchVilleData } from '../../../data/VilleData';
import { fetchPostData } from '../../../data/postData';
import location1 from '../../../assets/location.svg';
import { fetchcometabData } from '../../../data/commentetab';
import { fetchtouristebData } from '../../../data/TouristeData';
import adress from '../../../assets/info/adress.svg';
import phone from '../../../assets/info/phone.svg';
import mail from '../../../assets/info/mail.svg';
import website from '../../../assets/info/website.svg';
import time from '../../../assets/info/time.svg';
import MapComponent from '../../../Map/Map.jsx';

const Container7 = () => {
  // Récupération des données de localisation et de navigation à partir de react-router-dom
  const location = useLocation();
  const { etablissement_id } = location.state;
  const navigate = useNavigate();
  const { state } = location;
   // Utilisation de useEffect pour afficher les données reçues
  useEffect(() => {
    if (state) {
        console.log('Received state view more etab:', state);
    }
}, [state]);
  // Déclaration des états pour stocker les données

  const [ville, setVille] = useState('');
  const [etabData, setEtabData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [commentetab, setcommentetab] = useState([]);
  const [touristeData, setTouristeData] = useState([]);
// Fonction pour formater la date au format souhaité
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
 // Fonction pour gérer la réservation d'un établissement
  const handlereserver = (etab) => {
    navigate('/reserver', { state: { ...location.state, etablissement_id: etab.etablissement_id } });
  };
  // Utilisation de useEffect pour récupérer les données des touristes
  useEffect(() => {
    const getTouristeData = async () => {
      const data = await fetchtouristebData();

      if (data.length > 0) { // Vérification si les données ne sont pas vides
        setTouristeData(data);// Mise à jour de l'état avec les données des touristes
      }
    };

    getTouristeData();
  }, []);
  // Utilisation de useEffect pour récupérer les données de l'établissement
  useEffect(() => {
    const getEtabData = async () => {
      try {
        const data = await fetchetabData();
        const filteredData = data.filter(etab => etab.etablissement_id === etablissement_id);
        if (filteredData.length > 0) {
          setEtabData(filteredData);// Mise à jour de l'état avec les données de l'établissement
        }
      } catch (error) {
        console.error('Error fetching etab data:', error);
      }
    };

    getEtabData();
  }, [etablissement_id]);
// Utilisation de useEffect pour récupérer les commentaires de l'établissement
  useEffect(() => {
    const getCommentEtab = async () => {
      try {
        const data = await fetchcometabData();
        const filteredData = data.filter(comment => comment.etablissement_id === etablissement_id);
        if (filteredData.length > 0) {
          setcommentetab(filteredData);// Mise à jour de l'état avec les commentaires de l'établissement
        }
      } catch (error) {
        console.error('Error fetching COMMENT data:', error);
      }
    };

    getCommentEtab();
  }, [etablissement_id]);
 // Utilisation de useEffect pour récupérer les publications de l'établissement
  useEffect(() => {
    const getPostData = async () => {
      try {
        const data = await fetchPostData();
        const filteredData = data.filter(post => post.etablissement_id === etablissement_id);
        if (filteredData.length > 0) {
          setPostData(filteredData);// Mise à jour de l'état avec les publications de l'établissement
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    getPostData();
  }, [etablissement_id]);
  

  useEffect(() => {
    const getVilleData = async () => {
      try {
        if (etabData.length > 0) {
          const data = await fetchVilleData();
          const filteredData = data.filter(ville => ville.id_ville === etabData[0].id_ville);
          if (filteredData.length > 0) {
            setVille(filteredData[0]);// Utilisation de useEffect pour récupérer les données de la ville associée à l'établissement
          }
        }
      } catch (error) {
        console.error('Error fetching ville data:', error);
      }
    };

    getVilleData();
  }, [etabData]);

  return (
    <div className='container7'>
      <div>
        {/* Affichage des détails de l'établissement */}
        {etabData.map((etab, index) => (
          <div key={index}>
            <div className="etabprof">
              <img className="etabprofimg" src={`http://localhost:8080/eta/EtablissementImage/${etab.etablissement_id}`} alt='' />
              <h2>{etab.nom}</h2>
              <div className='etabprof01'>
                <img src={location1} alt='' />
                <h4>Ville: {ville.Nom}</h4>
              </div>
            </div>
{/* Affichage des informations de contact de l'établissement */}
            <div className='etabprofinfo'>
              <div className='oneetabinfo'>
                <img src={adress} alt='' />
                <h5>{etab.adresse}</h5>
              </div>

              <div className='oneetabinfo'>
                <img src={phone} alt='' />
                <h5>+ {etab.telephone}</h5>
              </div>

              <div className='oneetabinfo'>
                <img src={mail} alt='' />
                <h5>{etab.Email}</h5>
              </div>

              <div className='oneetabinfo'>
                <img src={website} alt='' />
                <h5>{etab.site_web}</h5>
              </div>

              <div className='oneetabinfo'>
                <img src={time} alt='' />
                <h5>{etab.horaires_ouverture}</h5>
              </div>
            </div>
 {/* Affichage de la carte de localisation de l'établissement */}
            <div className='maptest'>
              <MapComponent latitude={etab.latitude} longitude={etab.longitude} />
            </div>
          </div>
        ))}
      </div>

      <div className='etabprof02'>

        <h1>Nos publications</h1>
        <div className='etabprof022'>
          {postData.length === 0 ? (
            <div className='none02'>
              <h2>Pas de publications</h2>
            </div>
          ) : (
            postData.map((post, index1) => (
              <div className="etabprof021" key={index1}>
                <h2>{post.objet}</h2>
                <h3>{post.text}</h3>
                <img src={`http://localhost:8080/pub/publicationImage/${post.id_publication}`} alt='' />
              </div>
            ))
          )}
        </div>
      </div>

      <div className='etabprof03'>
        {commentetab.length === 0 ? (
          <div className='testingthis'>
            <h2>Pas de commentaires</h2>
          </div>
        ) : (
          commentetab
            .filter(comment => touristeData.some(tourist => tourist.id_touriste === comment.id_touriste))
            .map((comment, index2) => {
              const tourist = touristeData.find(tourist => tourist.id_touriste === comment.id_touriste);
              return (
                <div key={index2} className='comment'>
                  <div className='commentowner'>
                    <img src={`http://localhost:8080/tou/touristeImage/${tourist.id_touriste}`} alt="" />
                    <div className='commentowner0'>
                      <h3>{tourist ? `${tourist.Prenom} ${tourist.Nom}` : 'Unknown Tourist'}</h3>
                      <h5>{formatDate(comment.Date)}</h5>
                    </div>
                  </div>
                  <div className='commenttext'>{comment.Texte}</div>
                </div>
              );
            })
        )}
      </div>

      <div className='etabprof004'>
        {etabData.map((data, index) => {
          if (data.type === "hotel") {
            return (
              <div key={index}>
                <button onClick={() => handlereserver(data)}>Reserver</button>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Container7;
