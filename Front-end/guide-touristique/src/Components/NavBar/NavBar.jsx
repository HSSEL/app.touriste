import './NavBar.css';

const NavBar = () => {

  return (
    <div className='NAV'>
    <div className='nav'>
      <div className="nav-logo">SARINI</div>
      <ul className='nav-menu'>
        <li className='home'>HOME</li>
        <li>SERVICES</li>
        <li>ABOUT US</li>
        <li className='nav-contact'>CONTACT</li>
      </ul>
    </div>
    </div>
  );
};

export default NavBar;
