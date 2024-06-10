import React from 'react'; // Importation de la bibliothèque React
import ReactDOM from 'react-dom/client'; // Importation d'une méthode spécifique de ReactDOM
import './index.css'; // Importation du fichier CSS principal
import App from './App'; // Importation du composant racine de l'application
import Admin from './Pages/Admin/Admin'; // Importation du composant Admin (peut-être pour une utilisation future)

// Utilisation de ReactDOM.createRoot pour initialiser le rendu de l'application
// Utilisé pour afficher les éléments React sur la page web
ReactDOM.createRoot(document.getElementById('root')).render(
  ///*Utilisation de React.StrictMode pour des avertissements supplémentaires en mode développement*/
  <React.StrictMode> 
   
    <App /> 

  </React.StrictMode>,
);
//Rendu du composant racine de l'application, probablement l'App.js