import React, {useContext, useState} from 'react';
import AppContext from "../../context/AppContext";
import {ACTION_TYPES} from "../../helpers/globalVariables";
import axios from "axios";
import Calendar from "react-calendar";
import useToggle from "../../hooks/useToggle";
import useFormInputs from "../../hooks/useFormInputs";
import useErrorMessage from "../../hooks/useErrorMessage";

const AddTodo = () => {
  const {baseApiUrl, userId, uid, dispatch} = useContext(AppContext);
  const [isCalendarVisible, toggleCalendar] = useToggle(false);
  const [formInputs, handleInputChange, handleInputsReset] = useFormInputs({});
  const [calendarDate, setCalendarDate] = useState(null);
  const [errorMessage, setErrorMessage] = useErrorMessage('');

  const handleAddTodo = (e) => {
    e.preventDefault()

    if (formInputs.title) {
      axios.post(`${baseApiUrl}/todos?userId=${userId}`,
        {
          userId: userId,
          id: uid,
          title: formInputs.title,
          description: formInputs.description,
          date: calendarDate,
          completed: false,
          created: new Date().toDateString(),
        })
        .then(response => dispatch({type: ACTION_TYPES.ADD_TODO, payload: response.data}));
    } else {
      setErrorMessage('Field cannot be empty!')
    }

    handleInputsReset();
    isCalendarVisible && toggleCalendar();
  }

  return (
    <>
      <form className='add-form' onSubmit={handleAddTodo} onChange={() => setErrorMessage('')}>
        <input
          type="text"
          placeholder={'Give a title'}
          name='title'
          value={formInputs.title || ''}
          onChange={handleInputChange}
          autoComplete={'off'}
        />
        <textarea
          name="description"
          placeholder={'Give a description (optional)'}
          value={formInputs.description || ''}
          onChange={handleInputChange}
          autoComplete={'off'}
        />

        {errorMessage && <p>{errorMessage}</p>}
        {isCalendarVisible &&
          <Calendar name="date" onChange={(e) => setCalendarDate(e.toDateString())} value={calendarDate}/>}

        <div className={'controls'}>
          <button
            className={'btn '}
            type='button'
            onClick={toggleCalendar}>
            {isCalendarVisible ? 'Hide Calendar' : 'Plan a date'}
          </button>
          <button type="submit" className={'btn '}>Add</button>
        </div>
      </form>
    </>
  );
};

export default AddTodo;
