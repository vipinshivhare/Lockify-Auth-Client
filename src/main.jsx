import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import {BrowserRouter} from "react-router-dom";
import {AppContextProvider} from "./context/AppContext.jsx";
import "react-toastify/dist/ReactToastify.css";



ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </StrictMode>
  );
  