import React from 'react';
import { Image } from 'semantic-ui-react';

import './education.css';

function Education(props) {
  console.log(props);
  return (
    <div
      className="education"
      onClick={() => {
        props.history.push('roboclean/content');
      }}
    ></div>
  );
}
export default Education;
