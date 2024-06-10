import BG from "../../Components/BG/BG";
import Utilisateurs from "../../Components/Admin/Utilisateurs/utilisateurs";
import Posts from "../../Components/Admin/Posts/Posts";
import NavAdmin from "../../Components/NavBar/NavAdmin";


const Admin = () => {

    return (
        <div>
            <BG/>
            <NavAdmin/>
            <Posts/>
            <Utilisateurs/>
        </div>
    );
};

export default Admin;