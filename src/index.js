import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import routes from './routes/routes';
import reducers from './reducers';
import {AUTH_USER} from './actions/types';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import kk from 'react-intl/locale-data/kk';
import ConnectedIntlProvider from './ConnectedIntlProvider';

addLocaleData([...en, ...ru, ...kk]);

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if(token) {
  // we need to update application state
  store.dispatch({type: AUTH_USER, payload: localStorage.getItem('username')});
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <Router history={browserHistory} routes={routes} />
        </ConnectedIntlProvider>
    </Provider>, 
    document.getElementById('root'));
