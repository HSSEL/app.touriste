import './Options.css'
import icon1 from '../../assets/Options/icon1.svg'
import icon2 from '../../assets/Options/icon2.svg'
import icon3 from '../../assets/Options/icon3.svg'
import { useLocation, useNavigate } from 'react-router-dom';

const Options = () => {

  const location = useLocation();

  const navigate = useNavigate();
  const handlelogout = () => {
    navigate('/logout')
  }

  const handleprof = () => {
    navigate('/usertouriste', {state: { ...location.state }})
  }

    return (
    <div className='option'>
            
        <img onClick={handleprof} src={icon1} alt=''/>
        <img src={icon3} alt=''/>
        <img onClick={handlelogout} src={icon2} alt=''/>

</div>
  );
};

export default Options;
