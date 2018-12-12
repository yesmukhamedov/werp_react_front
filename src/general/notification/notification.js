import React, { Component } from 'react';
import { Modal, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './notification.css';

// const arrayList= ;
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      info: false,
      success: false,
      error: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log();
    if (nextProps.type === 'info')
      this.setState({ info: true, success: false, error: false });
    else if (nextProps.type === 'success')
      this.setState({ info: false, success: true, error: false });
    else if (nextProps.type === 'error')
      this.setState({ info: false, success: false, error: true });

    this.setState({ open: true });
    setTimeout(() => {
      this.setState({
        open: false,
        info: false,
        success: false,
        error: false,
      });
    }, 2000);
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        closeOnEscape={false}
        onClose={this.close}
        dimmer={false}
        size="tiny"
      >
        <Modal.Content>
          <Message
            header={this.props.header}
            content={this.props.text}
            info={this.state.info}
            success={this.state.success}
            error={this.state.error}
          />
        </Modal.Content>
      </Modal>
    );
  }
}
// export default Notification;
function mapStateToProps(state) {
  return {
    type: state.notification.type,
    text: state.notification.text,
    header: state.notification.header,
    number: state.notification.number,
  };
}

export default connect(
  mapStateToProps,
  {},
)(Notification);
