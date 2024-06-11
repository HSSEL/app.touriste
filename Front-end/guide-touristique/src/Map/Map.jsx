import React from 'react'; // Importe React pour définir des composants React.
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importe les composants nécessaires de react-leaflet pour créer une carte interactive.
import L from 'leaflet'; // Importe l'objet L de Leaflet pour personnaliser les icônes de marqueur.
import 'leaflet/dist/leaflet.css'; // Importe les styles CSS de Leaflet pour les composants de la carte.

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'; // Importe l'icône de marqueur pour les écrans haute résolution.
import markerIcon from 'leaflet/dist/images/marker-icon.png'; // Importe l'icône de marqueur pour les écrans standard.
import markerShadow from 'leaflet/dist/images/marker-shadow.png'; // Importe l'ombre de marqueur.

delete L.Icon.Default.prototype._getIconUrl; // Supprime la méthode _getIconUrl du prototype de l'icône par défaut de Leaflet.

// Configure les options par défaut des icônes de marqueur de Leaflet.
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x, // URL de l'icône pour les écrans haute résolution.
  iconUrl: markerIcon, // URL de l'icône pour les écrans standard.
  shadowUrl: markerShadow, // URL de l'ombre de l'icône de marqueur.
});

// Définit le composant MapComponent, prenant les coordonnées de latitude et de longitude comme propriétés.
const MapComponent = ({ latitude, longitude }) => {
  return (
    <MapContainer center={[latitude, longitude]} zoom={10} style={{ height: '800px', width: '100%' }}>
      {/* Définit la couche de tuiles de la carte en utilisant OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Ajoute un marqueur à la carte à la position spécifiée */}
      <Marker position={[latitude, longitude]}>
        {/* Ajoute une fenêtre contextuelle au marqueur */}
        <Popup>
          voila la localisation {/* Contenu de la fenêtre contextuelle */}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent; // Exporte le composant MapComponent pour pouvoir l'utiliser ailleurs dans l'application.
