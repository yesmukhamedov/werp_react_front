import React from 'react';
import { Segment } from 'semantic-ui-react';
import { moneyFormat } from './helpers';

const TotalCountsTable = props => {
  const { count, text } = props;
  return (
    <Segment>
      <h5>
        {`${text}: 
    ${count ? moneyFormat(count) : 0}`}
      </h5>
    </Segment>
  );
};

export default TotalCountsTable;
