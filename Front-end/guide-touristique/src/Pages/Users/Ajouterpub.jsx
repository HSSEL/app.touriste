import BG from "../../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import NavBarEtab from "../../Components/NavBar/NavEtab"; // Importe le composant NavBarEtab pour la barre de navigation spécifique aux établissements.
import AjouterPubli from "../../Components/Usersprof/AjouterPubli"; // Importe le composant AjouterPubli pour permettre aux utilisateurs d'ajouter une publication.

const Ajouterpub = () => { // Définit le composant Ajouterpub comme une fonction.

    return ( // Rendu du composant Ajouterpub.
        <div> {/* Début de la division principale */}
            <NavBarEtab/> {/* Rendu du composant NavBarEtab pour la barre de navigation spécifique aux établissements */}
            <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
            <AjouterPubli/> {/* Rendu du composant AjouterPubli pour permettre aux utilisateurs d'ajouter une publication */}
        </div> /* Fin de la division principale */
    );
};

export default Ajouterpub; // Exporte le composant Ajouterpub pour être utilisé dans d'autres parties de l'application.
