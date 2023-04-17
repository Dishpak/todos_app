import {useContext, useState} from 'react';
import useFormInputs from "../../hooks/useFormInputs";
import axios from "axios";
import {ACTION_TYPES} from "../../helpers/globalVariables";
import AppContext from "../../context/AppContext";
import useToggle from "../../hooks/useToggle";
import Calendar from "react-calendar";

const TodoEdit = ({todo}) => {
  const {dispatch, baseApiUrl} = useContext(AppContext);
  const [formInputs, handleInputChange, handleInputsReset] = useFormInputs({
    title: todo.title, description: todo.description,
  });
  const [calendarDate, setCalendarDate] = useState(null);
  const [isCalendarVisible, toggleCalendar] = useToggle(false);

  const handleEditTodo = (e, id) => {
    e.preventDefault();
    formInputs.title && axios.patch(`${baseApiUrl}/todos/${id}`, {
      title: formInputs.title, description: formInputs.description, date: calendarDate ? calendarDate : todo.date,
    })
      .then(response => dispatch({type: ACTION_TYPES.EDIT_TODO, payload: {id, ...response.data}}));


    handleInputsReset();
    isCalendarVisible && toggleCalendar()
  }


  const handleCancelEdit = (e, id) => {
    e.preventDefault()

    dispatch({type: ACTION_TYPES.TODO_EDIT_MODE, payload: id});

    handleInputsReset();
    isCalendarVisible && toggleCalendar();
  }

  return (<form onSubmit={(e) => handleEditTodo(e, todo.id)}>
      <div className={'todo-info'}>
        <input
          type="text"
          name='title'
          value={formInputs.title || ''}
          onChange={handleInputChange}
          placeholder={'Title'}
          autoFocus={true}
          autoComplete={'off'}
        />
        <br/>
        <textarea
          name="description"
          value={formInputs.description || ''}
          onChange={handleInputChange}
          placeholder={'Description'}
          autoComplete={'off'}
        />
        <span style={{cursor: "pointer"}} onClick={() => {
          setCalendarDate((e) => e)
          toggleCalendar()
        }}>
                  {todo.date ? todo.date : 'Plan a date'}
                </span>
        {isCalendarVisible && <Calendar onChange={(e) => setCalendarDate(e.toDateString())} value={todo.date}/>}
      </div>
      <div className={'todo-controls'}>
        <button className={'btn btn-save'} type={'submit'}>Save</button>
        <button className={'btn btn-cancel'} onClick={(e) => handleCancelEdit(e, todo.id)}>Cancel</button>
      </div>

    </form>);
};

export default TodoEdit;
