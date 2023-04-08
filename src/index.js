import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {AppProvider} from "./context/AppContext";
import {UserProvider} from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    {/*<UserProvider>*/}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/*</UserProvider>*/}
  </AppProvider>
);
