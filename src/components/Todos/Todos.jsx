import React, {useContext, useState} from 'react';

import AppContext from "../../context/AppContext";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const Todos = () => {
  const {setTodos} = useContext(AppContext);

  return (
    <main className={'flex-child'}>
        <AddTodo setTodos={setTodos}/>
        <TodoList />
    </main>
  );
};

export default Todos;
