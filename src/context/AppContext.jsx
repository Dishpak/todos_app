import React, {createContext, useState, useEffect, useReducer} from "react";
import todoReducer, {initialState} from "../reducers/todoReducer";
import {ACTION_TYPES} from "../helpers/globalVariables";
import {v4 as uuidv4} from "uuid";



const AppContext = createContext(initialState);

export const AppProvider = ({children}) => {
  const baseApiUrl = 'http://localhost:3000';
  const userId = localStorage.getItem('userId');
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [title, setTitle] = useState('')
  let uid = uuidv4()

  const loadData = () => {
    fetch(`${baseApiUrl}/todos/?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => dispatch({type: ACTION_TYPES.LOAD_TODOS, payload:data}))
  };

  useEffect(() => {
    return loadData();
  }, []);

  useEffect(() => {
  }, []);


  const handleAddTodo = (e) => {
    e.preventDefault()


    if(title){
      fetch(`${baseApiUrl}/todos?userId=${userId}`, {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          // id: Math.floor(Math.random() * 1000 + 201),
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

  // const handleDelete = () => {
  //   // const clickedTodo = todos.find(element => element.id === id).id;
  //   // console.log(clickedTodo);
  //   fetch(`${baseApiUrl}/todos/387`, {
  //     method: 'DELETE',
  //   })
    //   .then((response) => response.json())
    //   .then((data) => setTodos((prev) => {
    //     return [
    //       ...prev.slice(0, patchingTodo),
    //       data,
    //       ...prev.slice(patchingTodo + 1)
    //     ]
    //   }))
  // }


  return(
    <AppContext.Provider value={
      {
        baseApiUrl,
        // todos,
        // setTodos,
        // handleDelete,
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