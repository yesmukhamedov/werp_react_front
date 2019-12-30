import React from 'react';
import { Image, Container } from 'semantic-ui-react';

import './cebilon.css';

function Cebilon(props) {
  console.log(props);
  return (
    <div
      className="cebilon"
      onClick={() => {
        props.history.push('cebilon/content');
      }}
    ></div>
  );
}
export default Cebilon;
