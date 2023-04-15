import React, {useContext} from 'react';
import { Routes, Route } from "react-router-dom";
import Todos from "../components/Todos/Todos";
import ErrorPage from "../components/ErrorPage";
import LoginPage from "../components/LoginPage";
import CompletedTodos from "../components/Todos/CompletedTodos";
import AppContext from "../context/AppContext";
import Profile from "../components/Profile";
import UserDetails from "../components/UserDetails";

const AppRouter = () => {
  const {isLogged} = useContext(AppContext);
  const userName = JSON.parse(localStorage.getItem('userName'));

  return (
    <Routes>
      {!isLogged && <Route path='/' element={<LoginPage/>}/>}
      <Route path='/' element={<Todos/>}/>
      {isLogged && <Route path='/todos' element={<Todos/>}/>}
      <Route path='/completed' element={<CompletedTodos />}/>
      {/*<Route path='/details' element={<UserDetails />}/>*/}
      {isLogged && <Route path={`/profile/${userName}`} element={<Profile/>}/>
      }        <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
