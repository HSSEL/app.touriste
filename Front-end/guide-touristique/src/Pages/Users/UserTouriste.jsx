import BG from "../../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import NavBar from "../../Components/NavBar/NavBar"; // Importe le composant NavBar pour la barre de navigation.
import Options from "../../Components/Options/Options"; // Importe le composant Options pour les options de la page.
import Touristeprof from "../../Components/Usersprof/Touristeprof"; // Importe le composant Touristeprof pour le profil utilisateur Touriste.

const UserTouriste = () => { // Définit le composant UserTouriste comme une fonction.

  return ( // Rendu du composant UserTouriste.
    <div> {/* Début de la division principale */}
      <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
      <NavBar/> {/* Rendu du composant NavBar pour la barre de navigation */}
      <Touristeprof/> {/* Rendu du composant Touristeprof pour le profil utilisateur Touriste */}
      <Options/> {/* Rendu du composant Options pour les options de la page */}
    </div> /* Fin de la division principale */
  );
};

export default UserTouriste; // Exporte le composant UserTouriste pour être utilisé dans d'autres parties de l'application.
