import React, {useContext} from 'react';
import {NavLink, useNavigate, Link} from "react-router-dom";
import logo from '../assets/logo/logo-black-crop.png';
import AppContext from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const {userId, setIsLogged} = useContext(AppContext);

  const userName = JSON.parse(localStorage.getItem('userName'));

  const logOut = () => {
    setIsLogged(false);
    navigate('/');
    localStorage.clear();
  }



  return (
    <header className={'flex-container row'}>
      {userId && <nav>
        <NavLink to={'/todos'}>Todos</NavLink>
        <NavLink to={'/completed'}>Completed Todos</NavLink>
      </nav>}
      <div className={'logo'}>
        <a href="/"><img src={logo} alt="logo" style={{height: 50}}/></a>
      </div>
      {userId &&
        <div className={'user-bar'}>Hello
          <Link to={'/profile'}> {userName} </Link>
          |
          {/*<div className={'user-bar'}>{`Hello <Link to={'/profile'}> ${userName} </Link> |`}*/}
          <button onClick={logOut}>Log out</button>
        </div>
      }
    </header>
  );
};

export default Header;
