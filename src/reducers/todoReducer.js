import {ACTION_TYPES} from "../helpers/globalVariables";

export const initialState = {
  todos: [],
  uid: 202,
}


const todoReducer = (todoState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_TODOS: {
      return {
        todos: action.payload
      }
    }
    case ACTION_TYPES.ADD_TODO: {
      return {
        todos: [...todoState.todos, action.payload],
      }
    }
    case ACTION_TYPES.TOGGLE_COMPLETE_TODO: {
      return {
        todos: todoState.todos.map(todo =>
          todo.id === action.payload
            ? {...todo, completed: !todo.completed}
            : todo
        )
      };
    }
    case ACTION_TYPES.DELETE_TODO: {
      return {
        todos: todoState.todos.filter(todo => todo.id != action.payload)
      }
    }
    default: return  todoState
  }
}

export default todoReducer;