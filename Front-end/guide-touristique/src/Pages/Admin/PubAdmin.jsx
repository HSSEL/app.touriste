import BG from "../../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import Publicationadmin from "../../Components/Admin/Touristes/Publicationsadm"; // Importe le composant Publicationadmin pour gérer les publications dans l'interface d'administration.
import NavAdmin from "../../Components/NavBar/NavAdmin"; // Importe le composant NavAdmin pour la barre de navigation spécifique à l'administration.

const PubAdmin = () => { // Définit le composant PubAdmin comme une fonction.

    return ( // Rendu du composant PubAdmin.
        <div> {/* Début de la division principale */}
            <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
            <NavAdmin/> {/* Rendu du composant NavAdmin pour la barre de navigation spécifique à l'administration */}
            <Publicationadmin/> {/* Rendu du composant Publicationadmin pour gérer les publications dans l'interface d'administration */}
        </div> /* Fin de la division principale */
    );
};

export default PubAdmin; // Exporte le composant PubAdmin pour être utilisé dans d'autres parties de l'application.
