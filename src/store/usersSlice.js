import {createSlice} from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'users',
    reducers: {

    },
    initialState:
      [
          {
              id: 1,
              name: 'dishpak'
          },
          {
              id: 2,
              name: 'vika'

          }
      ]
})
export default usersSlice.reducer;
