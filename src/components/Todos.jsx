import React, {useContext, useState} from 'react';
import AddTodo from "./AddTodo";
import AppContext from "../context/AppContext";
import {ACTION_TYPES} from "../helpers/globalVariables";
import axios from "axios";

const Todos = () => {
  const {setTodos, toggleComplete, todos, handleDelete, dispatch, baseApiUrl } = useContext(AppContext);
  const [newTitle, setNewTitle] = useState('');
  const [inEditId, setInEditId] = useState(null);


  const handleClick = (id) => {
    setInEditId(id);
    dispatch({type: ACTION_TYPES.TODO_EDIT_MODE, payload: id});
  }

  const handleEditTodo = (e, id) => {
    e.preventDefault();

      newTitle.length > 0 && axios.patch(`${baseApiUrl}/todos/${id}`,
        {
          title: newTitle,
        })
        .then(response => {
          return response
        });
      dispatch({type: ACTION_TYPES.EDIT_TODO, payload: {id, newTitle}});

      setNewTitle('');
      setInEditId(null)

  }


  const handleCancelEdit = (e, id) => {
    e.preventDefault()
    setInEditId(null);
    dispatch({type: ACTION_TYPES.TODO_EDIT_MODE, payload:id});
    setNewTitle('')
  }

  return (
    <div className={'flex-child'}>
        <h1>TODOS COMPONENT</h1>
        <AddTodo setTodos={setTodos}/>
        <div className={'todo-list'}>
            <h2>Your Tasks</h2>
            {todos?.filter(todo => !todo.completed).map((todo) => {
                return <div className={`todo-item ${inEditId === todo.id ? 'in-edit' : ''}`} key={todo.id} onClick={() => !inEditId ? handleClick(todo.id) : null}>
                  {!todo.editMode
                    ? <>
                        <span className={'title'}>{todo.title}</span>
                        <button className={'btn-complete'} onClick={() => toggleComplete(todo.id)}>Complete</button>
                        <button className={'btn-delete'} onClick={() => handleDelete(todo.id)}>Delete</button>
                    </>
                    : <form onSubmit={(e) => handleEditTodo(e, todo.id)}>
                        <input
                        type="text"
                        name='title-editor'
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        autoFocus={true}
                    />
                      <button className={'btn-save'} type={'submit'}>Save</button>
                      <button className={'btn-cancel'} onClick={(e) => handleCancelEdit(e, todo.id)}>Cancel</button>

                    </form>
                  }
                </div>
            })}
        </div>
    </div>
  );
};

export default Todos;
