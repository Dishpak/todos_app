import React, {useContext, useState} from 'react';
import AppContext from "../../context/AppContext";
import {ACTION_TYPES} from "../../helpers/globalVariables";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import Calendar from "react-calendar";

const AddTodo = () => {
  const {title, setTitle, description, setDescription, baseApiUrl, userId, uid, dispatch} = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [date, setDate] = useState(null);
  const [isCalendarShown, setIsCalendarShown] = useState(false);

  const handleAddTodo = (e) => {
    e.preventDefault()

    if (title) {
      axios.post(`${baseApiUrl}/todos?userId=${userId}`,
        {
          userId: userId,
          id: uid,
          title: title,
          description: description,
          date: date,
          completed: false,
        })
        .then(response => dispatch({type: ACTION_TYPES.ADD_TODO, payload: response.data}));
    } else {
      setErrorMessage('Field cannot be empty!')
    }
    uuidv4();
    setTitle('');
    setDescription('');
    setDate(new Date());
    setIsCalendarShown(false);
  }


  return (
    <>
      <form className='add-form' onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder={'Give a title'}
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="description"
          placeholder={'Give a description (optional)'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete={'off'}
        />

        {errorMessage && <p>{errorMessage}</p>}
        {isCalendarShown && <Calendar onChange={(e) => setDate(e.toDateString())} value={date}/>}

        <div className={'controls'}>
          <button
            className={'btn '}
            type='button'
            className={'btn '}
            onClick={() => setIsCalendarShown(!isCalendarShown)}>
            {isCalendarShown ? 'Hide Calendar' : 'Plan a date'}
          </button>
          <button type="submit" className={'btn '}>Add</button>
        </div>
      </form>
    </>
  );
};

export default AddTodo;
