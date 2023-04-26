import {useState} from "react";
import {useNavigate} from 'react-router-dom'
import {useContext, useEffect} from "react";
import AppContext from "../context/AppContext";
import {useFormInputs} from "../hooks";

export const useAuth = () => {
  const {loadUsers, users, setIsLogged} = useContext(AppContext)
  const [formInputs, handleInputChange, handleInputsReset] = useFormInputs({});
  const navigate = useNavigate();

  const [failedLog, setFailedLog] = useState(false);
  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()

    const checkUser = users.find((user) => user.username === formInputs.username && user.password === formInputs.password);

      if (checkUser) {
        localStorage.setItem('username', JSON.stringify(formInputs.username));
        localStorage.setItem('userId', JSON.stringify(checkUser.id));
        navigate('/todos');
        setIsLogged(true);
      } else {
        setFailedLog(true)
        handleInputsReset();
      }

      handleInputsReset();
  }

  return {
    handleSubmit,
    failedLog,
    formInputs,
    handleInputChange,
  }
}

