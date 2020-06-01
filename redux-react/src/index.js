import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import reducerExample from './reducers/reducer';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(reducerExample);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
