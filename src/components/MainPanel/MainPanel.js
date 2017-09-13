import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

class MainPanel extends Component {
  render() {
    return (
      <div>
          <Message success>
             <Message.Header> <Icon name='attention' />
              <strong>
                <FormattedMessage
                  id={ 'Header.greeting' }
                  defaultMessage={ 'Welcome page' }
                />  
              </strong>
             </Message.Header>          
          </Message>
      </div>
    );
  }
}

export default MainPanel;
