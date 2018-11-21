import React from 'react';
import { Message } from 'semantic-ui-react';

export default class WarnMessage extends React.Component {
  state = { visible: true };

  handleDismiss = () => {
    const { dismissable } = this.props;

    if (!!dismissable) { this.setState({ visible: false }) }
  };

  render() {
    if (this.state.visible) {
      const { header, content } = this.props;
      return (
        <Message
          negative
          onDismiss={this.handleDismiss}
          header={header}
          content={content}
        />
      );
    }
  }
}
