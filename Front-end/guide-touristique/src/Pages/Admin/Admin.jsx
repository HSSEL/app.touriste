import BG from "../../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import Utilisateurs from "../../Components/Admin/Utilisateurs/utilisateurs"; // Importe le composant Utilisateurs pour gérer les utilisateurs dans l'interface d'administration.
import Posts from "../../Components/Admin/Posts/Posts"; // Importe le composant Posts pour gérer les publications dans l'interface d'administration.
import NavAdmin from "../../Components/NavBar/NavAdmin"; // Importe le composant NavAdmin pour la barre de navigation spécifique à l'administration.

const Admin = () => { // Définit le composant Admin comme une fonction.

    return ( // Rendu du composant Admin.
        <div> {/* Début de la division principale */}
            <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
            <NavAdmin/> {/* Rendu du composant NavAdmin pour la barre de navigation spécifique à l'administration */}
            <Posts/> {/* Rendu du composant Posts pour gérer les publications dans l'interface d'administration */}
            <Utilisateurs/> {/* Rendu du composant Utilisateurs pour gérer les utilisateurs dans l'interface d'administration */}
        </div> /* Fin de la division principale */
    );
};

export default Admin; // Exporte le composant Admin pour être utilisé dans d'autres parties de l'application.
