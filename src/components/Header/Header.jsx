import React, {useContext} from 'react';

import AppContext from "../../context/AppContext";
import logo from '../../assets/logo/logo-black-crop.png';
import Userbar from "./Userbar";
import Navbar from "./Navbar";

const Header = () => {
  const {isLogged} = useContext(AppContext);

  return (
    <header>
      <div className={'header-wrapper'}>
        <div className={'logo'}>
          <a href="/"><img src={logo} alt="logo" style={{height: 50}}/></a>
        </div>
        {isLogged &&
          <>
            <Userbar/>
            <Navbar/>
          </>
        }
      </div>
    </header>
  );
};

export default Header;
