import React, {useContext} from 'react';
import AppContext from "../context/AppContext";
import {ACTION_TYPES} from "../helpers/globalVariables";
import {v4 as uuidv4} from "uuid";

const AddTodo = () => {
  const {title, setTitle, baseApiUrl, userId, uid, dispatch} = useContext(AppContext);

  const handleAddTodo = (e) => {
    e.preventDefault()


    if(title){
      fetch(`${baseApiUrl}/todos?userId=${userId}`, {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          id: uid,
          title: title,
          completed: false,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => dispatch({type: ACTION_TYPES.ADD_TODO, payload:data}));
    } else {
      alert('ghjkl;')
    }
    uuidv4();
    setTitle('')

  }

  return (
      <>
          <form action="" className='add-form'>
              <input
                type="text"
                placeholder={'Give a title'}
                name='title'
                value={title}
                onChange={({target}) => setTitle(target.value)}
                minLength={4}
              />
              <button onClick={handleAddTodo}>Add</button>
          </form>
      </>
    );
};

export default AddTodo;
