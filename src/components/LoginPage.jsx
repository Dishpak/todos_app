import {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from "../context/AppContext";
import Register from "./Register";

const LoginPage = () => {
    const {setIsLogged, loadUsers, users} = useContext(AppContext)
    const navigate = useNavigate();

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failedLog, setFailedLog] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault()

        const checkUser = () => {
            const searchedUser = users.find((user) => user.username === userName.toLowerCase() && user.password === password);
            if(searchedUser){
                localStorage.setItem('userName', JSON.stringify(userName).toLowerCase());
                localStorage.setItem('userId', searchedUser.id);
                setIsLogged(true);
                navigate('/todos')
            } else {
                localStorage.clear();
                setFailedLog(true);
            }
            setUsername('')
            setPassword('');
        }
        checkUser();
    }


    return (
      <>
          <div className={'login-container flex-container'}>
              {!showRegister && <h3>Please Log in</h3>}
              <form onSubmit={handleSubmit}>
                  <label htmlFor="userName">Username</label>
                  <input type="text"
                         placeholder='Enter your Name'
                         name='userName'
                         value={userName}
                         onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                  <input type="password"
                         placeholder='********'
                         name='password'
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type={"submit"} className={'btn '}>Log In</button>
              </form>

              {failedLog &&
                <p>Check your username or password <br/>
                    <a onClick={() => setShowRegister(true)}>Register?</a>
                </p>
              }
          </div>
          {showRegister && <Register/>}
      </>
    );
};

export default LoginPage;
