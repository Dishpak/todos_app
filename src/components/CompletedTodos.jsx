import React, {useContext} from 'react';
import AppContext from "../context/AppContext";

const CompletedTodos = () => {
  const {toggleComplete, handleDelete, todos} = useContext(AppContext)

  return (
    <div>
      <h1>Completed Tasks</h1>
      <div className={'todo-list'}>
        {todos.filter(todo => todo.completed).map((todo) => {
          return <div className={'todo-item completed'} key={todo.id}>
            <span className={'title'}>{todo.title}</span>
            <button className={'btn-complete'} onClick={() => toggleComplete(todo.id)}>Incomplete</button>
            <button className={'btn-delete'} onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        })}
      </div>
    </div>
  );
};

export default CompletedTodos;
