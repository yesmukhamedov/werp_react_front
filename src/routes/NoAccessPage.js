import React from 'react';
import { Link } from 'react-router-dom';
import { Message, Icon, Container } from 'semantic-ui-react';

const NoAccess = () => (
  <Container style={{ marginTop: '2em' }}>
    <Message negative icon>
      <Icon name="spy" />
      <Message.Content>
        <Message.Header>
          You don't have permission to access this route
        </Message.Header>
        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </Message.Content>
    </Message>
  </Container>
);

export default NoAccess;
