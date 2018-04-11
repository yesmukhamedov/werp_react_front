import React, { Component } from 'react';
import { Button, Segment, Modal } from 'semantic-ui-react';

export default class PortalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClick = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <div>
        <Button
          content={
            open
              ? this.props.closeLabel || 'Скрыть'
              : this.props.openLabel || 'Открыть'
          }
          color={
            open
              ? this.props.openColor || 'linkedin'
              : this.props.closeColor || 'grey'
          }
          onClick={this.handleClick}
        />

        <Modal
          onClose={this.handleClose}
          open={open}
          closeIcon
        >
          <Segment
            style={ this.props.style }
          >
            {this.props.children}
          </Segment>
        </Modal>
      </div>
    );
  }
}
