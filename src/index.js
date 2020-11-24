import React from 'react';
import configureStore, { history } from './store/configureStore';
import { render } from 'react-dom';
import App from './App';
import 'typeface-roboto';
import './favicon.ico';
import './App.css';

const store = configureStore();

render(
  <App history={history} store={store} />,
  document.getElementById('app')
);

moduleHotAccept(module);

export function moduleHotAccept(mod) {
  if (mod.hot) {
    mod.hot.accept('./App', () => {
      const NewApp = require('./App').default;
      render(
        <NewApp history={history} store={store} />,
        document.getElementById('app')
      );
    });
  }
}
