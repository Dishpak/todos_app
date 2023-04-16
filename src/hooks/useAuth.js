import {useState} from "react";
import {useNavigate} from 'react-router-dom'
import {useContext, useEffect} from "react";
import AppContext from "../context/AppContext";

const useAuth = () => {
  const {setIsLogged, loadUsers, users} = useContext(AppContext)
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failedLog, setFailedLog] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()

    const checkUser = () => {
      const searchedUser = users.find((user) => user.username === username.toLowerCase() && user.password === password);

      if (searchedUser) {
        localStorage.setItem('userName', JSON.stringify(username).toLowerCase());
        localStorage.setItem('userId', searchedUser.id);
        setIsLogged(true);
        navigate('/todos');
      } else {
        localStorage.clear()
        setFailedLog(true)
      }
      setUsername('')
      setPassword('');
    }
    checkUser()
  }

  return {
    handleSubmit,
    setUsername,
    setPassword,
    failedLog,
  }
}

export default useAuth;
