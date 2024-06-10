import BG from "../../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import Etabprof from "../../Components/Usersprof/Etabprof"; // Importe le composant Etabprof pour le profil utilisateur Établissement.
import NavBarEtab from "../../Components/NavBar/NavEtab"; // Importe le composant NavBarEtab pour la barre de navigation spécifique aux établissements.

const UserEtab = () => { // Définit le composant UserEtab comme une fonction.

    return ( // Rendu du composant UserEtab.
        <div> {/* Début de la division principale */}
            <NavBarEtab/> {/* Rendu du composant NavBarEtab pour la barre de navigation spécifique aux établissements */}
            <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
            <Etabprof/> {/* Rendu du composant Etabprof pour le profil utilisateur Établissement */}
        </div> /* Fin de la division principale */
    );
};

export default UserEtab; // Exporte le composant UserEtab pour être utilisé dans d'autres parties de l'application.
