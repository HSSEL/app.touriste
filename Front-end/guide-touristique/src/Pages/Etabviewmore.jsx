import BG from "../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import NavBar from "../Components/NavBar/NavBar"; // Importe le composant NavBar pour la barre de navigation.
import Options from "../Components/Options/Options"; // Importe le composant Options pour les options.
import Container7 from "../Components/Containers/Container7/Container7"; // Importe Container7 pour le septième conteneur.

const Etabviewmore = () => { // Définit le composant Etabviewmore comme une fonction.

  return ( // Rendu du composant Etabviewmore.
    <div> {/* Début de la division principale */}
      <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
      <NavBar/> {/* Rendu du composant NavBar pour la barre de navigation */}
      <Container7/> {/* Rendu du composant Container7 pour le septième conteneur */}
      <Options/> {/* Rendu du composant Options pour les options */}
    </div> /* Fin de la division principale */
  );
};

export default Etabviewmore; // Exporte le composant Etabviewmore pour être utilisé dans d'autres parties de l'application.
