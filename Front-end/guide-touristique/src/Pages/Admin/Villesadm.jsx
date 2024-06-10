import BG from "../../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import NavAdmin from "../../Components/NavBar/NavAdmin"; // Importe le composant NavAdmin pour la barre de navigation spécifique à l'administration.
import Villesadm from "../../Components/Admin/Touristes/Villesadm"; // Importe le composant Villesadm pour afficher la gestion des villes dans l'interface d'administration.

const Villesadmin = () => { // Définit le composant Villesadmin comme une fonction.

    return ( // Rendu du composant Villesadmin.
        <div> {/* Début de la division principale */}
            <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
            <NavAdmin/> {/* Rendu du composant NavAdmin pour la barre de navigation spécifique à l'administration */}
            <Villesadm/> {/* Rendu du composant Villesadm pour afficher la gestion des villes dans l'interface d'administration */}
        </div> /* Fin de la division principale */
    );
};

export default Villesadmin; // Exporte le composant Villesadmin pour être utilisé dans d'autres parties de l'application.
