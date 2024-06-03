import BG from "../Components/BG/BG";
import NavBar from "../Components/NavBar/NavBar";
import Options from "../Components/Options/Options";
import All from "../etablissements/ALL/All";
import Container6 from "../Components/Containers/Container6/Container6";

const Home = () => {

  return (
    <div>
      <BG/>
      <NavBar/>
      <All/>
      <Container6/>
      <Options/>
    </div>
  );
};

export default Home;
