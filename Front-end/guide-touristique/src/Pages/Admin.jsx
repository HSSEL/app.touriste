import NavAdmin from "../Components/NavBar/NavAdmin";
import Container12 from "../Components/Containers/container12/container12.jsx";

const Admin = () => {
    const location = useLocation();
    const nom = location.state.nom;

    return (
        <div>
            
            <NavAdmin/>
            <Container12/>
            
        </div>
    );
};

export default Admin;