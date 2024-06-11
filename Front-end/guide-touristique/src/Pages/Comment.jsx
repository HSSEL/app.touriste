import BG from "../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import NavBar from "../Components/NavBar/NavBar"; // Importe le composant NavBar pour la barre de navigation.
import Options from "../Components/Options/Options"; // Importe le composant Options pour les options de la page.
import Container1 from "../Components/Containers/Container1/Container1"; // Importe le composant Container1 pour un conteneur spécifique.
import Container4 from "../Components/Containers/Container4/Container4"; // Importe le composant Container4 pour un autre conteneur spécifique.
import Container5 from "../Components/Containers/Container5/Container5"; // Importe le composant Container5 pour un autre conteneur spécifique.

const Comment = () => { // Définit le composant Comment comme une fonction.

  return ( // Rendu du composant Comment.
    <div> {/* Début de la division principale */}
      <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
      <NavBar/> {/* Rendu du composant NavBar pour la barre de navigation */}
      <Container1/> {/* Rendu du composant Container1 pour un conteneur spécifique */}
      <Container4/> {/* Rendu du composant Container4 pour un autre conteneur spécifique */}
      <Container5/> {/* Rendu du composant Container5 pour un autre conteneur spécifique */}
      <Options/> {/* Rendu du composant Options pour les options de la page */}
    </div> /* Fin de la division principale */
  );
};

export default Comment; // Exporte le composant Comment pour être utilisé dans d'autres parties de l'application.
