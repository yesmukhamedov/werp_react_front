import React from 'react';
import { Segment } from 'semantic-ui-react';
import { moneyFormat } from './helpers';

const TotalCountsTable = props => {
  const { count } = props;
  return (
    <Segment>
      <h5>
        {`Общее количество: 
    ${count ? moneyFormat(count) : 0}`}
      </h5>
    </Segment>
  );
};

export default TotalCountsTable;
