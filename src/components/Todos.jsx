import React, {useEffect, useState} from 'react';
import AddTodo from "./AddTodo";

const Todos = () => {
    const userId = localStorage.getItem('userId');
    const [todos, setTodos] = useState([]);

    const loadData = () => {
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
            .then((response) => response.json())
            .then(data => setTodos(data))
      };

    useEffect(() => {
      return loadData()
  }, []);

    const toggleComplete = (id) => {
        const patchingTodo = todos.findIndex(element => element.id === id);
        const toggle = !patchingTodo.completed;

        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: toggle,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
          .then((response) => response.json())
          .then((data) => setTodos((prev) => {
                 return [
                     ...prev.slice(0, patchingTodo),
                     data,
                     ...prev.slice(patchingTodo + 1)
                 ]
          }));
    }

    return (
    <div className={'flex-child'}>
        <h1>TODOS COMPONENT</h1>
        <AddTodo setTodos={setTodos}/>
        <div className={'todo-list'}>
            <h2>Your Tasks</h2>
            {todos?.filter(todo => !todo.completed).map((todo) => {
                return <div className={'todo-item'} key={todo.id} onClick={() => toggleComplete(todo.id)}>{todo.title}</div>})}
        </div>
        <div className={'todo-list'}>
            <h2>Completed Tasks</h2>
            {todos.filter(todo => todo.completed).map((todo) => {
                return <div className={'todo-item completed'} key={todo.id} onClick={() => toggleComplete(todo.id)}>{todo.title}</div>})}
        </div>

    </div>
  );
};

export default Todos;
