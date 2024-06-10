import BG from "../Components/BG/BG"; // Importation du composant BG qui gère l'arrière-plan.
import NewAccountEta from "../Components/LOGIN/OUT/NewAccountEta"; // Importation du composant NewAccountEta pour créer un nouveau compte établissement.
import Newaccount from "../Components/LOGIN/OUT/Newaccount"; // Importation du composant Newaccount pour créer un nouveau compte.

const New = () => { // Déclaration du composant New en tant que fonction fléchée.




   
    return ( // Rendu du composant.
        <div style={{ display: "flex", justifyContent: "space-around" }}> {/* Début de la division principale avec une disposition flex et un espacement autour des éléments. */}
            <BG/> {/* Rendu du composant BG pour afficher l'arrière-plan */}
            <div style={{ flex: 1 }}> {/* Début de la division pour NewAccountEta avec un flex de 1 pour occuper tout l'espace disponible. */}
                <NewAccountEta/> {/* Rendu du composant NewAccountEta pour créer un nouveau compte établissement */}
            </div> {/* Fin de la division pour NewAccountEta */}
            <div style={{ flex: 1 }}> {/* Début de la division pour Newaccount avec un flex de 1 pour occuper tout l'espace disponible. */}
                <Newaccount/> {/* Rendu du composant Newaccount pour créer un nouveau compte */}
            </div> {/* Fin de la division pour Newaccount */}
        </div> /* Fin de la division principale */

    );
};

export default New; // Exportation du composant New pour être utilisé dans d'autres parties de l'application.
