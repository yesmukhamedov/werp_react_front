import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';

class MainPanel extends Component {
  render() {
    return (
      <div>
          <Message success>
             <Message.Header> <Icon name='attention' /><strong>Welcome page</strong></Message.Header>          
          </Message>
      </div>
    );
  }
}

export default MainPanel;
