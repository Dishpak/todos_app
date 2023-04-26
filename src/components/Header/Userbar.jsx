import {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";

import AppContext from "../../context/AppContext";
import logoutIco from "../../assets/logout_ico.png";

const UserBar = () => {
  const navigate = useNavigate();
  const {username, setIsLogged} = useContext(AppContext)

  const handleLogout = () => {
    navigate('/');
    setIsLogged(false);
    localStorage.clear();
  }

  return (
      <div className={'user-bar'}>
        <p>Hello, <Link to={`/profile/${username}`}>{username}</Link> |</p>
        <img src={logoutIco} alt="logout" onClick={handleLogout} />
      </div>
  );
};

export default UserBar;
