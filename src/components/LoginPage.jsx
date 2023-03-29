import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import usersDb  from './Users'

const LoginPage = () => {
    const navigate = useNavigate();

    const [userName, setUsername] = useState('');


    const usersDb = [
        {
            name: 'dishpak',
            id: 1,
        },
        {
            name: 'kapshid',
            id: 2,
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()

        // setCurrentUser(userName)
        localStorage.setItem('userName', userName.toLowerCase());
        setUsername('')

        const checkUser = () => {
            const searchedUser = usersDb.find((user) => user.name === userName.toLowerCase());
            if(searchedUser){
                localStorage.setItem('userId', searchedUser.id)
                navigate('/todos')
            }
        }

        checkUser()
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
      </div>
    );
};

export default LoginPage;
