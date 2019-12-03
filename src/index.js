import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Router, Route } from 'react-router-dom';
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
import reducers from './reducers';
import browserHistory from './utils/history';
import { AUTH_ERROR, AUTH_USER, UNAUTH_USER } from './actions/types';
import ConnectedIntlProvider from './ConnectedIntlProvider';
import JwtRefresher from './middlewares/JwtRefresher';
import AppWrapper from './AppWrapper';
import Cookies from 'js-cookie';
import { resetLocalStorage } from './utils/helpers';
import jwt from 'jwt-simple';

import './index.css';

import { ROOT_URL } from './utils/constants';
import { loadLang, saveLang } from './utils/localStorage';
import {
  setAuthorizationHeader,
  setContentLanguageHeader,
} from './utils/setHeaders';
import { DEFAULT_LANGUAGE } from './utils/constants';
import changeLanguage from './actions/language';

const promise = axios.get(`${ROOT_URL}/routes`);

axios.interceptors.request.use(
  function(config) {
    config.withCredentials = true;
    let token = Cookies.get(
      process.env.REACT_APP_LEGACY_COOKIE_PARAMS_JWT_TOKEN_NAME,
      [{ domain: '192.168.0.23' }],
    );
    if (token) {
      config.headers['authorization'] = token;
    } else {
      config.headers['authorization'] = '';
    }
    // Do something before request is sent
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    // Edit response config
    return response;
  },
  error => {
    if (error.response.status === 401) {
      resetLocalStorage();
      localStorage.removeItem('currentPathName');
      localStorage.removeItem('breadcrumb');
      browserHistory.push('/');
      store.dispatch(UNAUTH_USER);
    } else return Promise.reject(error);
  },
);

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

store.subscribe(
  throttle(() => {
    saveLang({
      locales: store.getState().locales,
    });
  }, 1000),
);

const token = localStorage.getItem('token');
const jwtlang = Cookies.get(
  process.env.REACT_APP_LEGACY_COOKIE_PARAMS_LANG_TOKEN_NAME,
  [{ domain: '192.168.0.23' }],
);

// console.log(process.env.REACT_APP_LEGACY_URL_LOCAL);
// console.log(process.env.REACT_APP_LEGACY_URL_REMOTE);
// console.log(process.env.REACT_APP_LEGACY_COOKIE_PARAMS_DOMAIN);
// console.log(process.env.REACT_APP_LEGACY_COOKIE_PARAMS_JWT_TOKEN_NAME);
// console.log(process.env.REACT_APP_LEGACY_COOKIE_PARAMS_USERNAME_TOKEN_NAME);
// console.log(process.env.REACT_APP_LEGACY_COOKIE_PARAMS_LANG_TOKEN_NAME);
// console.log(process.env.REACT_APP_LEGACY_COOKIE_PARAMS_LAST_QUERY_TIME);
// console.log(process.env.REACT_APP_ROOT_URL_LOCAL);
// console.log(process.env.REACT_APP_ROOT_URL_REMOTE);
// console.log(
//   process.env.REACT_APP_LEGACY_COOKIE_PARAMS_LANG_TOKEN_NAME,
//   'process.env.REACT_APP_LEGACY_COOKIE_PARAMS_LANG_TOKEN_NAME',
// );

const jwtToken = Cookies.get(
  process.env.REACT_APP_LEGACY_COOKIE_PARAMS_JWT_TOKEN_NAME,
  [{ domain: '192.168.0.23' }],
);
const jwtUsername = Cookies.get(
  process.env.REACT_APP_LEGACY_COOKIE_PARAMS_USERNAME_TOKEN_NAME,
  [{ domain: '192.168.0.23' }],
);
const language =
  jwtlang || localStorage.getItem('language') || DEFAULT_LANGUAGE;
// const lastUrl = localStorage.getItem('currentPathName');

store.dispatch(changeLanguage(language));
// If we have a token, consider the user to be signed in
if (jwtToken) {
  try {
    const payload = jwt.decode(jwtToken, 'secret');
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('username', jwtUsername);
    localStorage.setItem('language', jwtlang);
    store.dispatch({
      type: AUTH_USER,
      payload: { username: localStorage.getItem(jwtUsername) },
    });
  } catch (e) {}
} else if (token) {
  // we need to update application state
  // setAuthorizationHeader(token);
  // setContentLanguageHeader(persistedLang.lang);

  try {
    const payload = jwt.decode(token, 'secret');
    store.dispatch({
      type: AUTH_USER,
      payload: { username: localStorage.getItem('username') },
    });
  } catch (e) {}
}

promise.then(({ data: transactionRoutes }) => {
  const generatedRoutes = generateRoutes(transactionRoutes);
  render(
    <Provider store={store}>
      <ConnectedIntlProvider>
        <AppWrapper routes={generatedRoutes} />
      </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('root'),
  );
});
