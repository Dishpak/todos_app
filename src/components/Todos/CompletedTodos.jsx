import React, {useContext} from 'react';
import AppContext from "../../context/AppContext";

const CompletedTodos = () => {
  const {toggleComplete, handleDelete, todos} = useContext(AppContext)

  return (
    <main className={'flex-child'}>
      <h1>Completed Tasks</h1>
      <div className={'todo-list'}>
        {todos.filter(todo => todo.completed).map((todo) => {
          return <div className={'todo-item completed'} key={todo.id}>
            <div className={'todo-info'}>
              <span className={'todo-title'}>{todo.title}</span>
              <span className={'todo-deadline'}>{todo.date}</span>
              <span className={'todo-description'}>{todo.description}</span>
            </div>
            <div className={'todo-controls'}>
              <button className={'btn btn-complete'} onClick={() => toggleComplete(todo.id)}>Complete</button>
              <button className={'btn btn-delete'} onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </div>
        })}
      </div>
    </main>
  );
};

export default CompletedTodos;
