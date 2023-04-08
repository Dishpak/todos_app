import React, {useContext, useState} from 'react';
import AddTodo from "./AddTodo";
import AppContext from "../context/AppContext";

const Todos = () => {
  const {setTodos, toggleComplete, todos, handleDelete } = useContext(AppContext);
  const [editable, setEditable] = useState(false);

  const handleEdit = () => {
    setEditable(true)
  }

  return (
    <div className={'flex-child'}>
        <h1>TODOS COMPONENT</h1>
        <AddTodo setTodos={setTodos}/>
        <div className={'todo-list'}>
            <h2>Your Tasks</h2>
            {todos?.filter(todo => !todo.completed).map((todo) => {
                return <div className={'todo-item'} key={todo.id}>
                  {editable ? <span>editable</span> : <span className={'title'} onClick={handleEdit}>{todo.title}</span>}
                  <button className={'btn-complete'} onClick={() => toggleComplete(todo.id)}>Complete</button>
                  <button className={'btn-delete'} onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
            })}
        </div>
    </div>
  );
};

export default Todos;
