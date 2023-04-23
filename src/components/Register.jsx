import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from "../context/AppContext";
import axios from "axios";
import {ACTION_TYPES} from "../helpers/globalVariables";
import useFormInputs from "../hooks/useFormInputs";

const Register = () => {
  const {users, baseApiUrl, uid, dispatch, setIsLogged} = useContext(AppContext)
  const [formInputs, handleInputChange] = useFormInputs({})
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')



  const handleSubmit = (e) => {
    e.preventDefault()
    if(formInputs.password !== formInputs.confirmPassword) {
      setErrorMessage('Your passwords don\'t match')
    } else if(users.find(user => user.username === formInputs.username)) {
      setErrorMessage('Username is taken. Choose another one')
    } else {
      axios.post(`${baseApiUrl}/users`, {
        id: uid,
        username: formInputs.username,
        password: formInputs.password,
      })
        .then(response => dispatch({type: ACTION_TYPES.ADD_USER, payload: response.data}))
      localStorage.setItem('username', JSON.stringify(formInputs.username));
      localStorage.setItem('userId', JSON.stringify(uid));
      navigate('/todos');
      setIsLogged(true);
    }
  }

  return (
    <>
      <form className={'register-form'} onSubmit={handleSubmit} onChange={() => setErrorMessage('')}>
        <label htmlFor="username">Create a username</label>
        <input
          type="text"
          name='username'
          placeholder={'Enter your name'}
          value={formInputs.username || ''}
          onChange={handleInputChange}
          required={true}
        />
        <label htmlFor="username">Create a password</label>
        <input
          type="password"
          name='password'
          placeholder='********'
          value={formInputs.password || ''}
          onChange={handleInputChange}
          required={true}
        />
        <label htmlFor="username">Confirm password</label>
        <input
          type="password"
          name='confirmPassword'
          placeholder='********'
          value={formInputs.confirmPassword || ''}
          onChange={handleInputChange}
          required={true}
        />
        <div className={'controls'}>
          <button type={'submit'} className={'btn '}>Register</button>
        </div>
      </form>
      <p>{errorMessage && errorMessage}</p>
    </>
  );
};

export default Register;
