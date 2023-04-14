import React, {useContext, useState} from 'react';
import AppContext from "../context/AppContext";
import {ACTION_TYPES} from "../helpers/globalVariables";
import {v4 as uuidv4} from "uuid";
import axios from "axios";

const AddTodo = () => {
  const {title, setTitle, baseApiUrl, userId, uid, dispatch} = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault()

    if(title){
      axios.post(`${baseApiUrl}/todos?userId=${userId}`,
        {
            userId: userId,
            id: uid,
            title: title,
            completed: false,
      })
        .then(response => dispatch({type: ACTION_TYPES.ADD_TODO, payload:response.data}));
    } else {
      setErrorMessage('Field cannot be empty!')
    }
        uuidv4();
        setTitle('')
  }

  return (
      <>
          <form className='add-form' onSubmit={handleAddTodo}>
              <input
                  type="text"
                  placeholder={'Give a title'}
                  name='title'
                  value={title}
                  onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            <textarea name="descpition" placeholder={'Give a description (optional)'}></textarea>
            {errorMessage && <p>{errorMessage}</p>}
              <button type="submit">Add</button>
          </form>
      </>
    );
};

export default AddTodo;
