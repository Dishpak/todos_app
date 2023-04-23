import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './styles/styles.scss';
import App from './App';
import {HashRouter} from "react-router-dom";
import {AppProvider} from "./context/AppContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
      <HashRouter>
        <App />
      </HashRouter>
  </AppProvider>
);
