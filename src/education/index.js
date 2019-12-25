import React from 'react';

import './education.css';

function Education(props) {
  console.log(props);
  return (
    <div
      className="education"
      onClick={() => {
        props.history.push('edu/components/content');
      }}
    ></div>
  );
}
export default Education;
