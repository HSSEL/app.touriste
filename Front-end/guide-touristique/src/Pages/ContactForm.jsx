import BG from "../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import NavBar from "../Components/NavBar/NavBar"; // Importe le composant NavBar pour la barre de navigation.
import ContacForm from "../Components/CONTACT/ContatcForm"; // Importe le composant ContacForm pour le formulaire de contact.

const ContactFomre = () => { // Définit le composant ContactFomre comme une fonction.

  return ( // Rendu du composant ContactFomre.
    <div> {/* Début de la division principale */}
      <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
      <NavBar/> {/* Rendu du composant NavBar pour la barre de navigation */}
      <ContacForm /> {/* Rendu du composant ContacForm pour le formulaire de contact */}
    </div> /* Fin de la division principale */
  );
};

export default ContactFomre; // Exporte le composant ContactFomre pour être utilisé dans d'autres parties de l'application.
