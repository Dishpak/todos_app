import React, {createContext, useState, useEffect, useReducer} from "react";
import rootReducer, {initialState} from "../reducers/reducers";
import {ACTION_TYPES} from "../helpers/globalVariables";
import {v4 as uuidv4} from "uuid";
import axios from "axios";

const AppContext = createContext(initialState);

export const AppProvider = ({children}) => {
  const baseApiUrl = 'http://localhost:3001';
  const [{todos, users}, dispatch] = useReducer(rootReducer, initialState);
  const userId = localStorage.getItem('userId');
  const username = JSON.parse(localStorage.getItem('username'))
  const [isLogged, setIsLogged] = useState(JSON.parse(localStorage.getItem('userId')));
  let uid = uuidv4()

  const loadTodos = () => {
    axios.get(`${baseApiUrl}/todos/?userId=${userId}`)
      .then(response => dispatch({type: ACTION_TYPES.LOAD_TODOS, payload:response.data}))
      .catch(error => console.log(error))
  };

  const loadUsers = () => {
   axios.get(`${baseApiUrl}/users/`)
      .then(response => dispatch({type: ACTION_TYPES.LOAD_USERS, payload: response.data}))
      .catch(error => console.log(error))
  };

  const toggleComplete = (id) => {
      const searchedTodo = todos.find(todo => todo.id === id);
      const toggle = searchedTodo?.completed;

      //Example of using fetch
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
        .catch(error => console.log(error))
    }

  const handleDelete = (id) => {
    axios.delete(`${baseApiUrl}/todos/${id}`)
      .then(dispatch({type: ACTION_TYPES.DELETE_TODO, payload:id}))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    loadTodos();
    loadUsers();
  }, [isLogged]);


  return(
    <AppContext.Provider value={
      {
        baseApiUrl,
        userId,
        handleDelete,
        toggleComplete,
        todos,
        users,
        uid,
        dispatch,
        isLogged,
        setIsLogged,
        username,
        loadUsers,
      }
    }>
      {children}
    </AppContext.Provider>
  )

}

export default AppContext;