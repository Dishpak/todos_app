import React, {useContext, useState} from 'react';
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import AppContext from "../../context/AppContext";

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
