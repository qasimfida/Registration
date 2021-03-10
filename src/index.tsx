import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import {Slide} from '@material-ui/core';


ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={4} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }} 
    
    >  
     <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
