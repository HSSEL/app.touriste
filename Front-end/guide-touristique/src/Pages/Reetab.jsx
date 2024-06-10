import BG from "../Components/BG/BG"; // Importation du composant BG qui gère l'arrière-plan.
import NavBar from "../Components/NavBar/NavBar"; // Importation du composant NavBar qui représente la barre de navigation.
import Options from "../Components/Options/Options"; // Importation du composant Options qui affiche les options de navigation.
import Container10 from "../Components/Containers/Container10/Container10"; // Importation du composant Container10 qui définit un conteneur avec une mise en page spécifique.

const Reetab = () => { // Déclaration du composant Reetab en tant que fonction fléchée.

  return ( // Rendu du composant.
    <div> {/* Début de la division principale */}
      <BG/> {/* Rendu du composant BG pour afficher l'arrière-plan */}
      <NavBar/> {/* Rendu du composant NavBar pour afficher la barre de navigation */}
      <Container10/> {/* Rendu du composant Container10 pour définir un conteneur avec une mise en page spécifique */}
      <Options/> {/* Rendu du composant Options pour afficher les options de navigation */}
    </div> /* Fin de la division principale */
  );
};

export default Reetab; // Exportation du composant Reetab pour être utilisé dans d'autres parties de l'application.
