import React, {useContext} from 'react';
import logo from '../../assets/logo/logo-black-crop.png';
import AppContext from "../../context/AppContext";
import Userbar from "./Userbar";
import Navbar from "./Navbar";

const Header = () => {
  const {userId} = useContext(AppContext);




  return (
    <header>
      <div className={'header-wrapper'}>
        <div className={'logo'}>
          <a href="/"><img src={logo} alt="logo" style={{height: 50}}/></a>
        </div>
        {userId && <Userbar />}
        {userId && <Navbar />}
      </div>
    </header>
  );
};

export default Header;
