import React, {createContext, useState, useEffect, useReducer} from "react";
import todoReducer, {initialState} from "../reducers/todoReducer";
import {ACTION_TYPES} from "../helpers/globalVariables";
import {v4 as uuidv4} from "uuid";



const AppContext = createContext(initialState);

export const AppProvider = ({children}) => {
  const baseApiUrl = 'http://localhost:3001';
  const userId = localStorage.getItem('userId');
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [title, setTitle] = useState('')
  let uid = uuidv4()

  const loadData = () => {
    fetch(`${baseApiUrl}/todos/?userId=${userId}`)
    // fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => dispatch({type: ACTION_TYPES.LOAD_TODOS, payload:data}))
  };

  useEffect(() => {
    return loadData();
  }, [userId]);


  const handleAddTodo = (e) => {
    e.preventDefault()


    if(title){
      fetch(`${baseApiUrl}/todos?userId=${userId}`, {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          id: uid,
          title: title,
          completed: false,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => dispatch({type: ACTION_TYPES.ADD_TODO, payload:data}));
    } else {
      alert('ghjkl;')
    }
    uuidv4();
    setTitle('')

  }

    const toggleComplete = (id) => {
      const searchedTodo = state.todos.find(element => element.id === id);
      const toggle = searchedTodo?.completed;

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
        .then((data) => dispatch({type: ACTION_TYPES.TOGGLE_COMPLETE_TODO, payload:data.id}))
    }

  const handleDelete = (id) => {
    // const searchedTodo = state.todos.find(element => element.id === id);
    // console.log(searchedTodo);
    fetch(`${baseApiUrl}/posts/1`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  // console.log(`${baseApiUrl}/todos/b03fd010-218a-4d3d-9e1d-cf10ea74b8a8`)

  return(
    <AppContext.Provider value={
      {
        baseApiUrl,
        handleDelete,
        toggleComplete,
        userId,
        state,
        handleAddTodo,
        title,
        setTitle
      }
    }>
      {children}
    </AppContext.Provider>
  )

}

export default AppContext;