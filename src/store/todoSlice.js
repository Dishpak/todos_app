import {createSlice} from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: 'todos',
  reducers: {
    addTodo(){},
    removeTodo(){},
    toggleTodo(){}

  },
  initialState: {}
})