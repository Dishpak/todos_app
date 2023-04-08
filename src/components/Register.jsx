import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from "../context/AppContext";
import axios from "axios";
import {ACTION_TYPES} from "../helpers/globalVariables";

const Register = () => {
  const {users, baseApiUrl, uid, dispatch} = useContext(AppContext)
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')



  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      setErrorMessage('Your passwords don\'t match')
    } else if(users.find(user => user.name === userName)) {
      setErrorMessage('Username is taken. Choose another one')
    } else {
      axios.post(`${baseApiUrl}/users`, {
        id: uid,
        name: userName,
        password: password,
      })
        .then(response => dispatch({type: ACTION_TYPES.ADD_USER, payload: response.data}))
      localStorage.setItem('userName', JSON.stringify(userName).toLowerCase());
      localStorage.setItem('userId', uid);
      navigate('/todos')
    }
  }

  // console.log(users);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder={'Enter your name'}
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value)
            setErrorMessage('')
          }}
        />
        <input
          type="password"
          placeholder={'Create a password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrorMessage('')
          }}
        />
        <input
          type="password"
          placeholder={'Confirm password'}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            setErrorMessage('')
          }}
        />
        <button type={'submit'}>Register</button>
      </form>
      <p>{errorMessage && errorMessage}</p>
    </div>
  );
};

export default Register;
