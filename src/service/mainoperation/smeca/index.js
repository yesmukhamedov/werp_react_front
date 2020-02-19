import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';

const Smeca = () => {
  return (
    <Container
      fluid
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <Segment clearing tertiary>
        {' '}
        <Header as="h2">Редактирование заявки клиента</Header>{' '}
      </Segment>
    </Container>
  );
};
export default Smeca;
