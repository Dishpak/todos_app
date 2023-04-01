import {ACTION_TYPES} from "../helpers/globalVariables";

export const initialState = {
  todos: [],
  uid: 202,
}


const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_TODOS: {
      return {
        todos: action.payload
      }
    }
    case ACTION_TYPES.ADD_TODO: {
      return {
        todos: [...state.todos, action.payload],
      }
    }
    case ACTION_TYPES.TOGGLE_COMPLETE_TODO: {
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? {...todo, completed: !todo.completed}
            : todo
        )
      };
    }
    case ACTION_TYPES.DELETE_TODO: {
      return {
        todos: state.todos.filter(todo => todo.id != action.payload)
      }
    }
    default: return  state
  }
}

export default todoReducer;