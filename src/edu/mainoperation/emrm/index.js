import React, { useState } from 'react';
import Content from './components/content';
import './education.css';

function Education(props) {
  const [contentLoading, setContentLoading] = useState(false);
  return (
    <div
      className="edu"
      onClick={() => {
        setContentLoading(true);
      }}
    >
      {contentLoading ? <Content /> : <div className="education"></div>}
    </div>
  );
}
export default Education;
