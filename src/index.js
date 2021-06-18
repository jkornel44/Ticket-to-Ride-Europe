import React from 'react';
import ReactDOM from 'react-dom';

import { configureStore } from './store/store';
import { Provider } from 'react-redux';

import { App } from './components/App';

 
const store = configureStore();

ReactDOM.render(
  <Provider store = { store }>
      <App />
  </Provider>,
  document.getElementById('root')
);
