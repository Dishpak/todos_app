import {configureStore} from "@reduxjs/toolkit";
import counterReducer from './counterSlice'
import usersReducer from './usersSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
  },
  devTools: true,
})

export default store;
