import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import {BrowserRouter} from "react-router-dom";
import {AppProvider} from "./context/AppContext";

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </AppProvider>
);
