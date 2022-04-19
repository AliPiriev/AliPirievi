import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/rootReducer'

const store = createStore(reducer, composeWithDevTools());
 

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);


reportWebVitals();
