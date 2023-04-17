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
      return [action.payload, ...state]
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

    case ACTION_TYPES.TODO_EDIT_MODE: {
      return state.map(todo =>
        todo.id === action.payload
          ? {...todo, editMode: !todo.editMode}
          : {...todo, editMode: false}
      );
    }

    case ACTION_TYPES.EDIT_TODO: {
      return state.map(todo => {
        if(todo.id === action.payload.id){
          if(action.payload.title.length > 0) {
            return {
              ...todo,
              editMode: false,
              title: action.payload.title,
              description: action.payload.description,
              date: action.payload.date,
            }
          } else {
            return {...todo, editMode: false}
          }
        } return todo
        }
      );
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
    case ACTION_TYPES.EDIT_USER: {
      return state.map(user => {
        if(user.id === action.payload.id) {
          return {
            ...user,
            name: action.payload.newName,
            surname: action.payload.surname,
            location: action.payload.location,
            additional: action.payload.additional,
          }
        }
      });
    }
    default: return state;
  }
}

export const rootReducer = combineReducers({
  todos: todosReducer,
  users: usersReducer,
})

export default rootReducer;
