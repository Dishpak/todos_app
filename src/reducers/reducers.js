import {ACTION_TYPES} from "../helpers/globalVariables";
import {combineReducers} from "@reduxjs/toolkit";

export const initialState = {
  todos: [],
  users:[],
}


export const todosReducer = (state = initialState.todos, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_TODOS: {
      return {
        todos: action.payload,
      }
    }
    case ACTION_TYPES.ADD_TODO: {
      return {
        todos: [...state, action.payload],
      }
    }
    case ACTION_TYPES.TOGGLE_COMPLETE_TODO: {
      return {
        todos: state.map(todo =>
          todo.id === action.payload
            ? {...todo, completed: !todo.completed}
            : todo
        )
      };
    }
    case ACTION_TYPES.DELETE_TODO: {
      return {
        todos: state.filter(todo => todo.id != action.payload)
      }
    }
    default: return  [...state]
  }
}

export const usersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_USERS: {
      return action.payload;
    }
    case ACTION_TYPES.ADD_TODO: {
      return {
        users: [...state, action.payload]
      }
    }
    default: return state;
  }
}

export const rootReducer = combineReducers({
  todos: todosReducer,
  users: usersReducer,
})

export default rootReducer;
