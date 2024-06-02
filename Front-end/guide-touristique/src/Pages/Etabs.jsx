import BG from "../Components/BG/BG";
import NavBar from "../Components/NavBar/NavBar";
import Options from "../Components/Options/Options";
import Container1 from "../Components/Containers/Container1/Container1";
import Hotels from "../etablissements/Hotels/Hotels";
import { useLocation } from "react-router-dom";

const Etabs = () => {
    const location = useLocation();
    const nom = location.state.nom;

    return (
        <div>
            <BG/>
            <NavBar/>
            <Container1/>
            <Hotels/>
            <Options/>
        </div>
    );
};

export default Etabs;
