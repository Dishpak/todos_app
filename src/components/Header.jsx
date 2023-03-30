import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
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
        <NavLink to={'/todos'} >Todos</NavLink>
        <NavLink to={'/todos/completed'} >Completed Todos</NavLink>
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
