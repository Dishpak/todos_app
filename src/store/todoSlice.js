import {createSlice} from "@reduxjs/toolkit";

const userId = localStorage.getItem('userId');

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    loadTodo:(state, action) => {
      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
        .then((response) => response.json())
        .then(data => console.log(data))
    },

    addTodo:(state, action) =>  {
      const userId = Number(localStorage.getItem('userId'));
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
    },

    toggleTodo:(state, action) => {},
  },
})

export const {addTodo, loadTodo} = todoSlice.actions;
export default todoSlice.reducer;
