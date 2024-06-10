import BG from "../Components/BG/BG"; // Importation du composant BG qui gère l'arrière-plan.
import Login0 from "../Components/LOGIN/Login"; // Importation du composant Login0 pour la page de connexion.

const Logout = () => { // Déclaration du composant Logout en tant que fonction fléchée.

  return ( // Rendu du composant.
    <div> {/* Début de la division principale */}
      <BG/> {/* Rendu du composant BG pour afficher l'arrière-plan */}
      <Login0/> {/* Rendu du composant Login0 pour la page de connexion */}
    </div> /* Fin de la division principale */
  );
};

export default Logout; // Exportation du composant Logout pour être utilisé dans d'autres parties de l'application.
