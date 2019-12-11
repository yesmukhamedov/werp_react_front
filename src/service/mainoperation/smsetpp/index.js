import React, { useState, useEffect } from 'react';
import Page from './Page';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../serviceReducer';
import { connect } from 'react-redux';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';

const store = createStore(reducer);
const Smsetpp = () => {
  return <Page />;
};

export default Smsetpp;
