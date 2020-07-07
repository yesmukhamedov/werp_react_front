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
    console.log(nextProps);
    if (nextProps.type === 'info')
      this.setState({ info: true, success: false, error: false });
    else if (nextProps.type === 'success')
      this.setState({ info: false, success: true, error: false });
    else if (nextProps.type === 'error')
      this.setState({ info: false, success: false, error: true });

    this.setState({ open: true });

    if (nextProps.type !== 'error') {
      setTimeout(() => {
        this.setState({
          open: false,
          info: false,
          success: false,
        });
      }, 1200);
    }
  }

  render() {
    return (
      <Modal open={this.state.open} onClose={this.close} size="small">
        <Modal.Content>
          <Message
            header={this.props.header}
            content={this.props.text}
            info={this.state.info}
            success={this.state.success}
            error={this.state.error}
            onDismiss={() => this.setState({ open: false })}
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

export default connect(mapStateToProps, {})(Notification);
