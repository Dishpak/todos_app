import React, {useContext} from 'react';
import AppContext from "../context/AppContext";

const CompletedTodos = () => {
  const {todos, toggleComplete, handleDelete} = useContext(AppContext)

  return (
    <div>
      <h1>COMPLETED TODOS</h1>
      <div className={'todo-list'}>
        <h2>Completed Tasks</h2>
        {todos.filter(todo => todo.completed && true).map((todo) => {
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
