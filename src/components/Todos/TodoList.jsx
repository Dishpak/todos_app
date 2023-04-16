import {useContext, useState} from 'react';
import Calendar from "react-calendar";
import AppContext from "../../context/AppContext";
import {ACTION_TYPES} from "../../helpers/globalVariables";
import axios from "axios";
import useToggle from "../../hooks/useToggle";
import todoList from "./TodoList";

const TodoList = () => {

  const {toggleComplete, todos, handleDelete, dispatch, baseApiUrl } = useContext(AppContext);
  const [inEditId, setInEditId] = useState(null);
  const [isCalendarVisible, toggleCalendar] = useToggle(false);
  const [todoData, setTodoData] = useState({
    newTitle: '',
    newDescription: '',
    newDate: null,
  });


  const handleClick = (id) => {
    dispatch({type: ACTION_TYPES.TODO_EDIT_MODE, payload: inEditId});
    setInEditId(null);
    setInEditId(id);
    const searchedTitle = todos.find(todo => todo.id === id).title;
    const searchedDescription = todos.find(todo => todo.id === id).description;

    setTodoData({
      ...todoData,
      newTitle: searchedTitle,
      newDescription: searchedDescription,
    })

    dispatch({type: ACTION_TYPES.TODO_EDIT_MODE, payload: id});
  }

  const handleEditTodo = (e, id) => {
    e.preventDefault();
    todoData.newTitle && axios.patch(`${baseApiUrl}/todos/${id}`,
      {
        title: todoData.newTitle,
        description: todoData.newDescription,
        date: todoData.newDate
      })
      .then(response => {
        return response
      });
    dispatch({type: ACTION_TYPES.EDIT_TODO, payload: {id, ...todoData}});

    setTodoData({
      ...todoData,
      newTitle: '',
      newDescription: '',
    })
    setInEditId(null);
    toggleCalendar()
  }


  const handleCancelEdit = (e, id) => {
    e.preventDefault()
    setInEditId(null);
    dispatch({type: ACTION_TYPES.TODO_EDIT_MODE, payload:id});
    setTodoData({
      ...todoData,
      newTitle: '',
    })
    toggleCalendar();
  }


  return (
    <div className={'todo-list'}>
      <h2>Your Tasks</h2>
      {todos?.filter(todo => !todo.completed).map((todo) => {
        return <div className={`todo-item ${inEditId === todo.id ? 'in-edit' : ''}`} key={todo.id}>
          {!todo.editMode
            ? <>
              <div className={'todo-info'} onClick={() => handleClick(todo.id)}>
                <h3 className={'todo-title'}>{todo.title}</h3>
                <span className={'todo-deadline'}>{todo.date}</span>
                <span className={'todo-description'}>{todo.description}</span>
              </div>
              <div className={'todo-controls'}>
                <button className={'btn btn-complete'} onClick={() => toggleComplete(todo.id)}>Complete</button>
                <button className={'btn btn-edit'} onClick={() => !inEditId ? handleClick(todo.id) : null}>Edit</button>
                <button className={'btn btn-delete'} onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </>
            : <form onSubmit={(e) => handleEditTodo(e, todo.id)}>
              <div className={'todo-info'}>
                <input
                  type="text"
                  name='title-editor'
                  value={todoData.newTitle}
                  onChange={(e) => setTodoData({...todoData, newTitle: e.target.value})}
                  placeholder={'Title'}
                  autoFocus={true}
                  autoComplete={'off'}
                />
                <br/>
                <textarea
                  name="description-editor"
                  value={todoData.newDescription}
                  onChange={(e) => setTodoData({...todoData, newDescription: e.target.value})}
                  placeholder={'Description'}
                  autoComplete={'off'}

                />
                <span style={{cursor: "pointer"}} onClick={() => {
                  setTodoData({...todoData, newDate: todo.date})
                  toggleCalendar()
                }}>
                          {todo.date}
                        </span>
                {isCalendarVisible && <Calendar onChange={(e) => setTodoData({...todoData, newDate: e.toDateString()})} value={todoData.newDate}/>}
              </div>
              <div className={'todo-controls'}>
                <button className={'btn btn-save'} type={'submit'}>Save</button>
                <button className={'btn btn-cancel'} onClick={(e) => handleCancelEdit(e, todo.id)}>Cancel</button>
              </div>

            </form>
          }
        </div>
      })}
    </div>
  );
};

export default TodoList;
