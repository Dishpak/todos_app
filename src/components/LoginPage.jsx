import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {usersDb}  from './Users'

const LoginPage = () => {
    const navigate = useNavigate();

    const [userName, setUsername] = useState('');
    const [failedLog, setFailedLog] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        localStorage.setItem('userName', JSON.stringify(userName).toLowerCase());
        setUsername('')

        const checkUser = () => {
            const searchedUser = usersDb.find((user) => user.name === userName.toLowerCase());
            if(searchedUser){
                localStorage.setItem('userId', searchedUser.id)
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


    return (
      <div>
          <form action="" onSubmit={handleSubmit}>
              <input type="text"
                     placeholder='Enter your Name'
                     name='userName'
                     value={userName}
                     onChange={(e) => setUsername(e.target.value)}
              />
          </form>
          {failedLog && <p>There's no such user. <a onClick={handleRegister}>Register?</a></p>}
      </div>
    );
};

export default LoginPage;
