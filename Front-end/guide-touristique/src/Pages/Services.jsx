import BG from "../Components/BG/BG"; // Importation du composant BG qui gère l'arrière-plan.
import NavBar from "../Components/NavBar/NavBar"; // Importation du composant NavBar qui représente la barre de navigation.
import Options from "../Components/Options/Options"; // Importation du composant Options qui affiche les options de navigation.
import All from "../etablissements/ALL/All"; // Importation du composant All qui affiche tous les établissements.
import Container6 from "../Components/Containers/Container6/Container6"; // Importation du composant Container6 qui définit un conteneur avec une mise en page spécifique.

const Home = () => { // Déclaration du composant Home en tant que fonction fléchée.

  return ( // Rendu du composant.
    <div> {/* Début de la division principale */}
      <BG/> {/* Rendu du composant BG pour afficher l'arrière-plan */}
      <NavBar/> {/* Rendu du composant NavBar pour afficher la barre de navigation */}
      <All/> {/* Rendu du composant All pour afficher tous les établissements */}
      <Container6/> {/* Rendu du composant Container6 pour définir un conteneur avec une mise en page spécifique */}
      <Options/> {/* Rendu du composant Options pour afficher les options de navigation */}
    </div> /* Fin de la division principale */
  );
};

export default Home; // Exportation du composant Home pour être utilisé dans d'autres parties de l'application.
