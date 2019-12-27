import React from 'react';
import { Image, Container } from 'semantic-ui-react';

import './education.css';
import logo from './assets/logo.png';
import certificate from './assets/certificate.png';

function Education(props) {
  console.log(props);
  return (
    <div
      className="education"
      onClick={() => {
        props.history.push('edu/components/content');
      }}
    >
      <Container className="education__container">
        <Image src={logo} alt="logo" size="large" className="logo" />
        <Image
          src={certificate}
          alt="certificate"
          size="large"
          className="certificate"
          verticalAlign="bottom"
        />
      </Container>
    </div>
  );
}
export default Education;
