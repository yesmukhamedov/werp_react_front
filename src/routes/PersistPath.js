import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
/**
 * Higher-order component (HOC) to persist pages' current location path
 */
export default function (BaseComponent) {
  class PersistPath extends Component {
    componentWillMount() {
      this.checkAuthentication(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }
    checkAuthentication(params) {
      try {
        localStorage.setItem('currentPathName', params.location.pathname);
      } catch (error) {
        // Ignore write errors.
      }
    }
    render() {
      return <BaseComponent {...this.props} />;
    }
  }
  return withRouter(PersistPath);
}
