import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import axios from 'axios';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import tr from 'react-intl/locale-data/tr';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';

import generateRoutes from './routes/routes';
import App from './App';
import reducers from './reducers';
import { AUTH_USER, CHANGE_LANGUAGE } from './actions/types';
import ConnectedIntlProvider from './ConnectedIntlProvider';
import JwtRefresher from './middlewares/JwtRefresher';

import './index.css';

import { ROOT_URL } from './utils/constants';
import { loadLang, saveLang } from './utils/localStorage';

const promise = axios.get(`${ROOT_URL}/routes`);

addLocaleData([...en, ...ru, ...tr]);
const persistedLang = loadLang();

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(
  reducers,
  persistedLang,
  composeEnhancers(applyMiddleware(JwtRefresher, reduxThunk)),
);

store.subscribe(throttle(() => {
  saveLang({
    locales: store.getState().locales,
  });
}, 1000));

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({
    type: AUTH_USER,
    payload: localStorage.getItem('username'),
  });
} else {
  store.dispatch({
    type: CHANGE_LANGUAGE,
    payload: 'ru',
  });
}

promise.then(({ data: transactionRoutes }) => {
  const generatedRoutes = generateRoutes(transactionRoutes);
  render(
    <Provider store={store}>
      <ConnectedIntlProvider>
        <App routes={generatedRoutes} />
      </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('root'),
  );
});
