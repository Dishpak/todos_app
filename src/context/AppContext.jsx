import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext({});

export const AppProvider = ({children}) => {
  const baseApiUrl = 'http://localhost:3000';
  const [todos, setTodos] = useState([]);
  const userId = localStorage.getItem('userId');

  const loadData = () => {
    fetch(`${baseApiUrl}/todos/?userId=${userId}`)
      .then((response) => response.json())
      .then(data => setTodos(data))
  };

  useEffect(() => {
    return loadData();
  }, [todos]);


  const toggleComplete = (id) => {
    const patchingTodo = todos.findIndex(element => element.id === id);
    const toggle = todos[patchingTodo].completed;

    fetch(`${baseApiUrl}/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: !toggle,
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

  const handleDelete = (id) => {
    const patchingTodo = todos.findIndex(element => element.id === id);
    fetch(`${baseApiUrl}/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => setTodos((prev) => {
        return [
          ...prev.slice(0, patchingTodo),
          data,
          ...prev.slice(patchingTodo + 1)
        ]
      }))
  }


  return(
    <AppContext.Provider value={
      {
        baseApiUrl,
        todos,
        setTodos,
        handleDelete,
        toggleComplete,
        userId
      }
    }>
      {children}
    </AppContext.Provider>
  )

}

export default AppContext;