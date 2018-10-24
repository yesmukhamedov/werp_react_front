import { Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import history from './utils/history';
import App from './App';

class AppWrapper extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" render={props => <App routes={this.props.routes} {...props} />} />
      </Router>
    );
  }
}

export default AppWrapper;
