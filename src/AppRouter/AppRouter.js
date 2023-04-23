import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import Todos from "../components/Todos/Todos";
import ErrorPage from "../components/ErrorPage";
import LoginPage from "../components/LoginPage";
import CompletedTodos from "../components/Todos/CompletedTodos";
import AppContext from "../context/AppContext";
import Profile from "../components/Profile";

const AppRouter = () => {
  const {isLogged, username} = useContext(AppContext);

  return (
    <Routes>
      {!isLogged && <Route path='/' element={<LoginPage/>}/>}
      <Route path='/' element={<Todos/>}/>
      {isLogged && <Route path='/todos' element={<Todos/>}/>}
      <Route path='/completed' element={<CompletedTodos/>}/>
      {isLogged && <Route path={`/profile/${username}`} element={<Profile/>}/>}
      <Route path='*' element={<ErrorPage/>} />
    </Routes>
  );
};

export default AppRouter;
