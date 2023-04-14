import React, {useContext, useState} from 'react';
import AddTodo from "./AddTodo";
import AppContext from "../context/AppContext";
import {ACTION_TYPES} from "../helpers/globalVariables";
import axios from "axios";

const Todos = () => {
  const {setTodos, toggleComplete, todos, handleDelete, dispatch, baseApiUrl } = useContext(AppContext);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [inEditId, setInEditId] = useState(null);


  const handleClick = (id) => {
    setInEditId(id);
    const searchedTitle = todos.find(todo => todo.id === id).title;
    const searchedDescription = todos.find(todo => todo.id === id).description;

    setNewTitle(searchedTitle)
    setNewDescription(searchedDescription)

    dispatch({type: ACTION_TYPES.TODO_EDIT_MODE, payload: id});
  }

  const handleEditTodo = (e, id) => {
    e.preventDefault();
      newTitle.length > 0 && axios.patch(`${baseApiUrl}/todos/${id}`,
        {
          title: newTitle,
          description: newDescription
        })
        .then(response => {
          return response
        });
      dispatch({type: ACTION_TYPES.EDIT_TODO, payload: {id, newTitle, newDescription}});

      setNewTitle('');
      setNewDescription('');
      setInEditId(null);
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
                      <div className={'todo-info'}>
                        <span className={'title'}>{todo.title}</span>
                        <span className={'description'}>{todo.description}</span>
                      </div>
                      <div className={'todo-controls'}>
                        <button className={'btn-complete'} onClick={() => toggleComplete(todo.id)}>Complete</button>
                        <button className={'btn-delete'} onClick={() => handleDelete(todo.id)}>Delete</button>
                      </div>
                    </>
                    : <form onSubmit={(e) => handleEditTodo(e, todo.id)}>
                      <div className={'todo-info'}><input
                        type="text"
                        name='title-editor'
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder={'Title'}
                        autoFocus={true}
                      />
                        <br/>
                        <textarea
                          name="description-editor"
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          placeholder={'Description'}

                        /></div>
                      <div className={'todo-controls'}>
                        <button className={'btn-save'} type={'submit'}>Save</button>
                        <button className={'btn-cancel'} onClick={(e) => handleCancelEdit(e, todo.id)}>Cancel</button>
                      </div>

                    </form>
                  }
                </div>
            })}
        </div>
    </div>
  );
};

export default Todos;
