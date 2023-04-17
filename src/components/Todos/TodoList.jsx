import {useContext, useState} from 'react';
import AppContext from "../../context/AppContext";
import {ACTION_TYPES} from "../../helpers/globalVariables";
import TodoEdit from "./TodoEdit";

const TodoList = () => {
  const {toggleComplete, todos, handleDelete, dispatch} = useContext(AppContext);

  const handleClick = (id) => {
    dispatch({type: ACTION_TYPES.TODO_EDIT_MODE, payload: id});
  }

  return (
    <div className={'todo-list'}>
      <h2>Your Tasks</h2>
      {todos?.filter(todo => !todo.completed).map((todo) => {
        return <div className={`todo-item ${todo.editMode ? 'in-edit' : ''}`} key={todo.id}>
          {!todo.editMode
            ? <>
              <div className={'todo-info'} onClick={() => handleClick(todo.id)}>
                <h3 className={'todo-title'}>{todo.title}</h3>
                <span className={'todo-deadline'}>{todo.date}</span>
                <span className={'todo-description'}>{todo.description}</span>
              </div>
              <div className={'todo-controls'}>
                <button className={'btn btn-complete'} onClick={() => toggleComplete(todo.id)}>Complete</button>
                <button className={'btn btn-edit'} onClick={() => !todo.editMode ? handleClick(todo.id) : null}>Edit
                </button>
                <button className={'btn btn-delete'} onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </>
            : <TodoEdit todo={todo}/>
          }
        </div>
      })}
    </div>
  );
};

export default TodoList;
