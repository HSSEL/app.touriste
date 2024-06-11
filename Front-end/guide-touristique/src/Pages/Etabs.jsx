import BG from "../Components/BG/BG"; // Importe le composant BG pour l'arrière-plan.
import NavBar from "../Components/NavBar/NavBar"; // Importe le composant NavBar pour la barre de navigation.
import Options from "../Components/Options/Options"; // Importe le composant Options pour les options.
import Container1 from "../Components/Containers/Container1/Container1"; // Importe Container1 pour le premier conteneur.
import Hotels from "../etablissements/Hotels/Hotels"; // Importe Hotels pour afficher les hôtels.
import { useLocation } from "react-router-dom"; // Importe useLocation pour obtenir l'URL courante.
import { useEffect } from "react"; // Importe useEffect pour effectuer des effets de bord dans les composants fonctionnels.

const Etabs = () => { // Définit le composant Etabs comme une fonction.

    const location = useLocation(); // Obtient l'URL courante de la page.
    const { state } = location; // Extrait l'état passé par la route.

    useEffect(() => { // Utilise useEffect pour effectuer une action lorsque l'état change.
        if (state) { // Vérifie s'il y a un état passé par la route.
            console.log('Received state:', state); // Affiche l'état dans la console.
        }
    }, [state]); // Déclenche l'effet lorsque l'état passé par la route change.

    return ( // Rendu du composant Etabs.
        <div> {/* Début de la division principale */}
            <BG/> {/* Rendu du composant BG pour l'arrière-plan */}
            <NavBar/> {/* Rendu du composant NavBar pour la barre de navigation */}
            <Container1/> {/* Rendu du composant Container1 pour le premier conteneur */}
            <Hotels/> {/* Rendu du composant Hotels pour afficher les hôtels */}
            <Options/> {/* Rendu du composant Options pour les options */}
        </div> /* Fin de la division principale */
    );
};

export default Etabs; // Exporte le composant Etabs pour être utilisé dans d'autres parties de l'application.
