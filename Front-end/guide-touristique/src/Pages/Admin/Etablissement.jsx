import BG from "../../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import Etablissements from "../../Components/Admin/Touristes/Etablissements"; // Importe le composant Etablissements pour gérer les établissements dans l'interface d'administration.
import NavAdmin from "../../Components/NavBar/NavAdmin"; // Importe le composant NavAdmin pour la barre de navigation spécifique à l'administration.

const EtabPage = () => { // Définit le composant EtabPage comme une fonction.

    return ( // Rendu du composant EtabPage.
        <div> {/* Début de la division principale */}
            <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
            <NavAdmin/> {/* Rendu du composant NavAdmin pour la barre de navigation spécifique à l'administration */}
            <Etablissements/> {/* Rendu du composant Etablissements pour gérer les établissements dans l'interface d'administration */}
        </div> /* Fin de la division principale */
    );
};

export default EtabPage; // Exporte le composant EtabPage pour être utilisé dans d'autres parties de l'application.
