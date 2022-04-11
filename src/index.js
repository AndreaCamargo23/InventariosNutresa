//Llama al root que se encuentra en index.html

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';//repartir al app
import reportWebVitals from './reportWebVitals';
//es componente hijo del index, la etiqueta padre de todos los javaScript es esta
ReactDOM.render(
  <React.StrictMode>
    <App/> 
  </React.StrictMode>,
  document.getElementById('root')//se comunica con la etiqueta de root, se enlaza con root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
