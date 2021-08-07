import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './components/app/App';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {reducers} from './redux/reducers'

const store=createStore(reducers,compose(applyMiddleware(thunk)))
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
