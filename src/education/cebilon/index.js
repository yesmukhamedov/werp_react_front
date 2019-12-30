import React from 'react';
import { Image, Container } from 'semantic-ui-react';

import './cebilon.css';
// import logo from './assets/logo.png';
// import certificate from './assets/certificate.png';

function Cebilon(props) {
  console.log(props);
  return (
    <div
      className="cebilon"
      onClick={() => {
        props.history.push('cebilon/content');
      }}
    >
      <Container className="cebilon__container">
        {/* <Image src={logo} alt="logo" size="large" className="logo" /> */}
        {/* <Image
          src={certificate}
          alt="certificate"
          size="large"
          className="certificate"
          verticalAlign="bottom"
        /> */}
      </Container>
    </div>
  );
}
export default Cebilon;
