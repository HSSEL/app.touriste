import BG from "../Components/BG/BG";
import NavBar from "../Components/NavBar/NavBar";
import Options from "../Components/Options/Options";
import All from "../etablissements/ALL/All";

const Home = () => {

  return (
    <div>
      <BG/>
      <NavBar/>
      <All/>
      <Options/>
    </div>
  );
};

export default Home;
