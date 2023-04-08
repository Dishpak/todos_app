import {ACTION_TYPES} from "../helpers/globalVariables";
import {combineReducers} from "@reduxjs/toolkit";

export const initialState = {
  todos: [],
  users:[],
}


export const todosReducer = (state = initialState.todos, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_TODOS: {
      return action.payload;
    }
    case ACTION_TYPES.ADD_TODO: {
      return [...state, action.payload]
    }
    case ACTION_TYPES.TOGGLE_COMPLETE_TODO: {
      return state.map(todo =>
        todo.id === action.payload
          ? {...todo, completed: !todo.completed}
          : todo
      );
    }
    case ACTION_TYPES.DELETE_TODO: {
      return [...state.filter(todo => todo.id !== action.payload)]
    }
    case ACTION_TYPES.EDIT_TODO: {
      return {}
    }
    default: return  state
  }
}

export const usersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_USERS: {
      return action.payload;
    }
    case ACTION_TYPES.ADD_USER: {
      return [...state, action.payload]
    }
    default: return state;
  }
}

export const rootReducer = combineReducers({
  todos: todosReducer,
  users: usersReducer,
})

export default rootReducer;
