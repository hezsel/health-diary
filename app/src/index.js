import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Login from './pages/Login/index';

import * as serviceWorker from './serviceWorker';

import { BrowserRoute, BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Login/>
    </React.StrictMode>,
  </BrowserRouter>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
