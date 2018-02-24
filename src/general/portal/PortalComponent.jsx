import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Header, Segment, Portal } from 'semantic-ui-react';

const portalContentStyle = {
  left: '50%',
  position: 'absolute',
  top: '50%',
  zIndex: 1000,
  transform: "translate(-50%, -50%)"
};

export default class PortalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClick = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    const { left, right } = this.props;

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

        <Portal onClose={this.handleClose} open={open}>
          <Segment
            style={ this.props.style || portalContentStyle }
          >
            {this.props.children}
          </Segment>
        </Portal>
      </div>
    );
  }
}
