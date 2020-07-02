import React from 'react';
import { Container, Header, Image, Segment, Icon } from 'semantic-ui-react';
import './style.css';

const ForbiddenPage = props => {
  console.log('forbidden PAGE');
  return (
    <Container fluid className="forbidden">
      <div className="text403">403</div>
      <div className="background"></div>
      <h1>У Вас нет доступа...</h1>
    </Container>
  );
};

export default ForbiddenPage;
