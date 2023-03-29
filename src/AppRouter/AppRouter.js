import React from 'react';
import { Routes, Route } from "react-router-dom";
import Todos from "../components/Todos";
import ErrorPage from "../components/ErrorPage";
import LoginPage from "../components/LoginPage";

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/todos' element={<Todos />}/>
        <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
