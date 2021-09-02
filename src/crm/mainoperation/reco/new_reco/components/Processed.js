import React, { useState, useEffect } from 'react';
import ReactTableServerSideWrapper from '../../../../../utils/ReactTableServerSideWrapper';
const Processed = props => {
  const { messages, language } = props;
  return (
    <div>
      <ReactTableServerSideWrapper data={[]} />
    </div>
  );
};

export default Processed;
