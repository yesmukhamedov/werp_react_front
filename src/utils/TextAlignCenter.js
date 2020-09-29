import React from 'react';
import '../service/service.css';

const TextAlignCenter = props => {
  const { text } = props;
  return (
    <div className="text-wrap" style={{ textAlign: 'center' }}>
      {text}
    </div>
  );
};

export default TextAlignCenter;
