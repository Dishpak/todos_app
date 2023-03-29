import React, {useEffect, useState} from 'react';
import AddTodo from "./AddTodo";

const Todos = () => {
    const userId = localStorage.getItem('userId');
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const loadData = () => {
              fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
                .then((response) => response.json())
                .then(data => setTodos(data))
      };

      loadData()
  }, [todos]);

    return (
    <div>
        <h1>TODOS COMPONENT</h1>
        <AddTodo todos={todos} setTodos={setTodos}/>
        <div>
            {todos.map((item, index) => {
                return <div className={'todo-item'} key={index}>{item.title}</div>
            })}
        </div>

    </div>
  );
};

export default Todos;
