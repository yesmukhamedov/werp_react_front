import React, { Component } from 'react';
import { Confirm } from 'semantic-ui-react';

class Confirmation extends Component {
  handleConfirm() {
    this.props.handleConfirm(this.props.id);
  }

  render() {
    return (
      <Confirm
        open={this.props.open}
        cancelButton="Never mind"
        confirmButton="Let's do it"
        content="Are you sure to delete user ? "
        onCancel={this.props.handleCancel}
        onConfirm={this.handleConfirm.bind(this)}
      />
    );
  }
}

export default Confirmation;
