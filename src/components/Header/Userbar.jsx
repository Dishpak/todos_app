import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AppContext from "../../context/AppContext";
import logoutIco from "../../assets/logout_ico.png";

const UserBar = () => {
  const userName = JSON.parse(localStorage.getItem('userName'));
  const navigate = useNavigate();
  const {setIsLogged} = useContext(AppContext)

  const logOut = () => {
    setIsLogged(false);
    navigate('/');
    localStorage.clear();
  }

  return (
      <div className={'user-bar'}>
        <p>Hello, <Link to={`/profile/${userName}`}>{userName}</Link> |</p>
        {/*<button onClick={logOut} className={'btn '}>Log out</button>*/}
        <img src={logoutIco} style={{width: "auto", height:"1.5rem" }} alt="logout" onClick={logOut} />
      </div>
  );
};

export default UserBar;
