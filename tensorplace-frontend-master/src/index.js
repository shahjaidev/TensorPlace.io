import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'react-circular-progressbar/dist/styles.css';
import 'react-input-range/lib/css/index.css';
require('./assets/scss/style.scss');

// Initialize store
const mountApp = document.getElementById('root');


ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  mountApp,
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <AppContainer>
        <App />
      </AppContainer>,
      mountApp,
    );
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
