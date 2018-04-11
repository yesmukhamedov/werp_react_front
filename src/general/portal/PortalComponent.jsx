import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';

export default class PortalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const {
      title,
      closeLabel,
      openLabel,
      openColor,
      closeColor,
      children,
    } = this.props;

    return (
      <div>
        <Button
          content={
            open
              ? closeLabel || 'Скрыть'
              : openLabel || 'Открыть'
          }
          color={
            open
              ? openColor || 'linkedin'
              : closeColor || 'grey'
          }
          onClick={this.handleClick}
        />

        <Modal onClose={this.handleClose} open={open} closeIcon>
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content>
            <Modal.Description>{children}</Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

PortalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired,
  openLabel: PropTypes.string.isRequired,
  openColor: PropTypes.string.isRequired,
  closeColor: PropTypes.string.isRequired,
  children: PropTypes.object,
};
