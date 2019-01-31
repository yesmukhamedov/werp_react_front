import React, { Component } from 'react';
import AddChange from './AddChange/addChange';

class BaseFunction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        BaseFunction
        <AddChange />
      </div>
    );
  }
}

export default BaseFunction;
