import BG from "../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import NavBar from "../Components/NavBar/NavBar"; // Importe le composant NavBar pour la barre de navigation.
import Options from "../Components/Options/Options"; // Importe le composant Options pour les options.
import Container1 from "../Components/Containers/Container1/Container1"; // Importe Container1 pour le premier conteneur.
import Container2 from "../Components/Containers/Container2/Container2"; // Importe Container2 pour le deuxième conteneur.
import Container3 from "../Components/Containers/Container3/Container3"; // Importe Container3 pour le troisième conteneur.
import { useLocation } from "react-router-dom"; // Importe useLocation pour obtenir l'URL actuelle.
import { useEffect } from "react"; // Importe useEffect pour exécuter un effet de côté.

const Home = () => { // Définit le composant Home comme une fonction.

    const location = useLocation(); // Récupère l'URL actuelle à partir du hook useLocation.
    const { state } = location; // Destructure la propriété state de l'objet location.

    useEffect(() => { // Utilise useEffect pour effectuer une action lorsque le composant est monté ou lorsque state change.
        if (state) { // Vérifie si state est défini.
            console.log('Received state:', state); // Affiche l'état reçu dans la console.
        }
    }, [state]); // Déclenche l'effet uniquement lorsque state change.

    return ( // Rendu du composant Home.
        <div> {/* Début de la division principale */}
            <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
            <NavBar/> {/* Rendu du composant NavBar pour la barre de navigation */}
            <Container1/> {/* Rendu du composant Container1 pour le premier conteneur */}
            <Container2/> {/* Rendu du composant Container2 pour le deuxième conteneur */}
            <Container3/> {/* Rendu du composant Container3 pour le troisième conteneur */}
            <Options/> {/* Rendu du composant Options pour les options */}
        </div> /* Fin de la division principale */
    );
};

export default Home; // Exporte le composant Home pour être utilisé dans d'autres parties de l'application.
