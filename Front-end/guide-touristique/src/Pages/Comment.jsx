import BG from "../Components/BG/BG";
import NavBar from "../Components/NavBar/NavBar";
import Options from "../Components/Options/Options";
import Container1 from "../Components/Containers/Container1/Container1";
import Container4 from "../Components/Containers/Container4/Container4";
import Container5 from "../Components/Containers/Container5/Container5";

const Home = () => {

  return (
    <div>
      <BG/>
      <NavBar/>
      <Container1/>
      <Container4/>
      <Container5/>
      <Options/>
    </div>
  );
};

export default Home;
