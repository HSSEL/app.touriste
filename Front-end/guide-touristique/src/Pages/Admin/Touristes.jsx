import BG from "../../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import Touristes from '../../Components/Admin/Touristes/Touristes' // Importe le composant Touristes pour afficher la gestion des touristes dans l'interface d'administration.
import NavAdmin from "../../Components/NavBar/NavAdmin"; // Importe le composant NavAdmin pour la barre de navigation spécifique à l'administration.

const TouristesPage = () => { // Définit le composant TouristesPage comme une fonction.

    return ( // Rendu du composant TouristesPage.
        <div> {/* Début de la division principale */}
            <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
            <NavAdmin/> {/* Rendu du composant NavAdmin pour la barre de navigation spécifique à l'administration */}
            <Touristes/> {/* Rendu du composant Touristes pour afficher la gestion des touristes dans l'interface d'administration */}
        </div> /* Fin de la division principale */
    );
};

export default TouristesPage; // Exporte le composant TouristesPage pour être utilisé dans d'autres parties de l'application.
