import './BG.css' // Importation du fichier CSS pour le style du composant
import HOME from '../../assets/HOME.png' // Importation de l'image HOME depuis le dossier assets

// Déclaration du composant fonctionnel BG
const BG = () => {
    // Rendu du composant : affichage de l'image avec la classe 'background'
    return <img src={HOME} className='background' alt="" />
};

export default BG; // Exportation du composant pour utilisation dans d'autres parties de l'application
