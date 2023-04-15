import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AppContext from "../../context/AppContext";

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
      <div className={'user-bar'}>Hello
        <Link to={`/profile/${userName}`}> {userName}</Link>|
        <button onClick={logOut} className={'btn '}>Log out</button>
      </div>
  );
};

export default UserBar;
