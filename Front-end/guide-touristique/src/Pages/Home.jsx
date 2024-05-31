import BG from "../Components/BG/BG";
import NavBar from "../Components/NavBar/NavBar";
import Options from "../Components/Options/Options";
import Container1 from "../Components/Containers/Container1/Container1";
import Container2 from "../Components/Containers/Container2/Container2";
import Container3 from "../Components/Containers/Container3/Container3";

const Home = () => {

  return (
    <div>
      <BG/>
      <NavBar/>
      <Container1/>
      <Container2/>
      <Container3/>
      <Options/>
    </div>
  );
};

export default Home;
