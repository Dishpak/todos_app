import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {usersDb}  from './Users'
import AppContext from "../context/AppContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const {setIsLogged} = useContext(AppContext)

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [failedLog, setFailedLog] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        localStorage.setItem('userName', JSON.stringify(userName).toLowerCase());
        setUsername('');
        setPassword('');

        const checkUser = () => {
            const searchedUser = usersDb.find((user) => user.name === userName.toLowerCase() && user.password === password);
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

    const handleRegister = () => {
        return alert('hello');
    }

    console.log(userName,password);


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
          {failedLog && <p>Check your username or password <a onClick={handleRegister}>Register?</a></p>}
      </div>
    );
};

export default LoginPage;
