import React, { useState } from 'react';
import Content from './components/content';

import './cebilon.css';

function Cebilon(props) {
  const [contentLoading, setContentLoading] = useState(false);

  return (
    <div
      className="ceb"
      onClick={() => {
        setContentLoading(true);
      }}
    >
      {contentLoading ? <Content /> : <div className="cebilon"></div>}
    </div>
  );
}
export default Cebilon;
