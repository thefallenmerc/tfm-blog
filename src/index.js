import React from 'react';
import ReactDOM from 'react-dom';
import './_styles/tailwind.style.css';
import './_styles/main.style.scss';
import * as serviceWorker from './serviceWorker';
import { App } from './_components';
import { FirebaseContext } from './_contexts';
import { Firebase } from './_config';

const firebase = new Firebase();

ReactDOM.render(
  <React.StrictMode>
      <FirebaseContext.Provider value={firebase}>
        <App />
      </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
