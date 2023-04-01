import React, {useContext} from 'react';
import AddTodo from "./AddTodo";
import AppContext from "../context/AppContext";

const Todos = () => {
  const {setTodos, toggleComplete, todoState, handleDelete } = useContext(AppContext);

  return (
    <div className={'flex-child'}>
        <h1>TODOS COMPONENT</h1>
        <AddTodo setTodos={setTodos}/>
        <div className={'todo-list'}>
            <h2>Your Tasks</h2>
            {todoState.todos?.filter(todo => !todo.completed && true).map((todo) => {
                return <div className={'todo-item'} key={todo.id}>
                  <span className={'title'}>{todo.title}</span>
                  <button className={'btn-complete'} onClick={() => toggleComplete(todo.id)}>Complete</button>
                  <button className={'btn-delete'} onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
            })}
        </div>
    </div>
  );
};

export default Todos;
