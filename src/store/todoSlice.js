import {createSlice} from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo:(state, action) =>  {
      const userId = Number(localStorage.getItem('userId'));
      const newTodo = () => {
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`, {
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                id: 2000,
                title: action.payload.title,
                completed: false,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
          .then((response) => response.json())
          .then((data) => state.push((prev) => [...prev, data]));

      }
      // state.push(newTodo)
    },
    toggleTodo:(state, action) => {},
  },
})

export const {addTodo, toggleTodo} = todoSlice.actions;
export default todoSlice.reducer;
