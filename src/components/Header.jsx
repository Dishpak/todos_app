import React from 'react';
import {useNavigate} from "react-router-dom";
import logo from '../assets/logo/logo-black-crop.png';

const Header = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const logOut = () => {
    localStorage.clear();
    navigate('/')
  }

  return (
    <header className={'flex-container row'}>
      <nav>
        <h1>HEADER COMPONENT</h1>
      </nav>
      <div className={'logo'}>
        <a href="/"><img src={logo} alt="logo" style={{height: 50}}/></a>
      </div>
      <div className={'user-bar'}>{userName && `Hello, ${userName} |`} {userName ? <button onClick={logOut}>Log out</button> :
        <button>Register</button>} </div>
    </header>
  );
};

export default Header;
