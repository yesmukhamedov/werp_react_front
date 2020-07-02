import React from 'react';

const TextAlignCenter = props => {
  const { text } = props;
  return <div style={{ textAlign: 'center' }}>{text}</div>;
};

export default TextAlignCenter;
