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
import reducers from './reducers';
import {
    AUTH_USER,
    // UNAUTH_USER
} from './actions/types';
import ConnectedIntlProvider from './ConnectedIntlProvider';
import JwtRefresher from './middlewares/JwtRefresher';
//import jwt from 'jwt-simple';
import { resetLocalStorage } from './utils/helpers';
import { loadLang, saveLang } from './utils/localStorage';
import {
    DEFAULT_LANGUAGE,
    // TOKEN_PASSWORD
} from './utils/constants';
import AppWrapper from './AppWrapper';

import './index.css';

import { ROOT_URL } from './utils/constants';
import changeLanguage from './actions/language';

const promise = axios.get(`${ROOT_URL}/api/core/routes`);

addLocaleData([...en, ...ru, ...tr]);
const persistedLang = loadLang();

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(
    reducers,
    persistedLang,
    composeEnhancers(applyMiddleware(JwtRefresher, reduxThunk)),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(
    throttle(() => {
        saveLang({
            locales: store.getState().locales,
        });
    }, 1000),
);

const token = localStorage.getItem('token');
const language = localStorage.getItem('language') || DEFAULT_LANGUAGE;
// const lastUrl = localStorage.getItem('currentPathName');

store.dispatch(changeLanguage(language));
// If we have a token, consider the user to be signed in
if (token) {
    // we need to update application state
    // setAuthorizationHeader(token);
    // setContentLanguageHeader(persistedLang.lang);
    try {
        store.dispatch({
            type: AUTH_USER,
            payload: { username: localStorage.getItem('username') },
        });
    } catch (e) {
        resetLocalStorage();
    }
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
