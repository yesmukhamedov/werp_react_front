import React from 'react';
import { Segment } from 'semantic-ui-react';

const HeaderTransactionJustifyed = props => {
  const { headerText, rightComponent } = props;
  return (
    <Segment>
      <h3>{headerText}</h3>
      <div>{rightComponent}</div>
    </Segment>
  );
};

export default HeaderTransaction;
