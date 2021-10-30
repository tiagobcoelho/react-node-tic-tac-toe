import React from 'react';
import ReactDOM from 'react-dom';

// Styles import
import './styles/index.scss';

// Redux imports
import { Provider } from 'react-redux';
import store from './redux/store';

// App import
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

