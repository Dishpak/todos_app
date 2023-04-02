import {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from "../context/AppContext";
import axios from "axios";
import {ACTION_TYPES} from "../helpers/globalVariables";
import Register from "./Register";

const LoginPage = () => {
    const {setIsLogged, loadUsers, users} = useContext(AppContext)
    const navigate = useNavigate();

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failedLog, setFailedLog] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    // const loadUsers = () => {
    //     axios.get(`${baseApiUrl}/users`)
    //       .then(response => dispatch({type: ACTION_TYPES.LOAD_USERS, payload: response.data}))
    //       .catch(error => console.log(error))
    // }

    useEffect(() => {
        loadUsers();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault()

        localStorage.setItem('userName', JSON.stringify(userName).toLowerCase());
        setUsername('')
        setPassword('');

        const checkUser = () => {
            const searchedUser = users.find((user) => user.name === userName.toLowerCase() && user.password === password);
            if(searchedUser){
                localStorage.setItem('userId', searchedUser.id)
                setIsLogged(true);
                navigate('/todos')
            } else {
                localStorage.clear();
                setFailedLog(true);
            }
        }
        checkUser();
    }


    return (
      <div className={'login-container'}>
          <form onSubmit={handleSubmit}>
              <input type="text"
                     placeholder='Enter your Name'
                     name='userName'
                     value={userName}
                     onChange={(e) => setUsername(e.target.value)}
              />
              <input type="password"
                     placeholder='********'
                     name='password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
              />
              <button type={"submit"}>Log In</button>
          </form>
          <br/>
          <br/>
          {failedLog && <p>Check your username or password <a onClick={() => setShowRegister(true)}>Register?</a></p>}
          {<Register />}
      </div>
    );
};

export default LoginPage;
