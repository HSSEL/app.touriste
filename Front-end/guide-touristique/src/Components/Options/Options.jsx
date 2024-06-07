import './Options.css'
import icon1 from '../../assets/Options/icon1.svg'
import icon2 from '../../assets/Options/icon2.svg'
import icon3 from '../../assets/Options/icon3.svg'
import { useNavigate } from 'react-router-dom';

const Options = () => {

  const navigate = useNavigate();
  const handlelogout = () => {
    navigate('/logout')
  }

    return (
    <div className='option'>
            
        <img src={icon1} alt=''/>
        <img src={icon3} alt=''/>
        <img onClick={handlelogout} src={icon2} alt=''/>

</div>
  );
};

export default Options;
