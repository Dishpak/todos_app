import React, {useContext, useState} from 'react';
import AddTodo from "./AddTodo";
import AppContext from "../context/AppContext";
import {ACTION_TYPES} from "../helpers/globalVariables";
import axios from "axios";

const Todos = () => {
  const {setTodos, toggleComplete, todos, handleDelete, dispatch, baseApiUrl } = useContext(AppContext);
  const [newTitle, setNewTitle] = useState('');


  const handleClick = (id) => {
    dispatch({type: ACTION_TYPES.TODO_EDIT_MODE, payload: id})
  }

  const handleEditTodo = (id) => {
      newTitle.length > 0 && axios.patch(`${baseApiUrl}/todos/${id}`,
        {
          title: newTitle,
        })
        .then(response => response);

      dispatch({type: ACTION_TYPES.EDIT_TODO, payload: {id, newTitle}});
      setNewTitle('');
  }

  const handleKeyDown = (e, id) => {
    if(e.key === 'Enter') {
      handleEditTodo(id);
    }
  }

  return (
    <div className={'flex-child'}>
        <h1>TODOS COMPONENT</h1>
        <AddTodo setTodos={setTodos}/>
        <div className={'todo-list'}>
            <h2>Your Tasks</h2>
            {todos?.filter(todo => !todo.completed).map((todo) => {
                return <div className={`todo-item `} key={todo.id} onClick={() => handleClick(todo.id)}>
                  {!todo.editMode
                    ? <>
                      <>
                        <span className={'title'}>{todo.title}</span>
                      </>
                      <>
                        <button className={'btn-complete'} onClick={() => toggleComplete(todo.id)}>Complete</button>
                        <button className={'btn-delete'} onClick={() => handleDelete(todo.id)}>Delete</button>
                      </>
                    </>
                    : <div onBlur={() => handleEditTodo(todo.id)}>
                        <input
                        type="text"
                        name='title-editor'
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, todo.id)}
                        autoFocus={true}
                    />

                    </div>
                  }
                </div>
            })}
        </div>
    </div>
  );
};

export default Todos;
