import {configureStore} from "@reduxjs/toolkit";
import usersReducer from './usersSlice'
import todoReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    todos: todoReducer,
  },
  devTools: true,
})

export default store;
