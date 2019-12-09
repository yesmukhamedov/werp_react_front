import React from 'react';
import { Provider } from 'react-redux';
import reducer from './smsetppReducer';
import { createStore } from 'redux';
import Page from './Page';
const store = createStore(reducer);

const Smsetpp = () => {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
};

export default Smsetpp;
