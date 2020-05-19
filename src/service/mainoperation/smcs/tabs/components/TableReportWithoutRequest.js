import React from 'react';
import {
  Button,
  Segment,
  Icon,
  Divider,
  Input,
  Checkbox,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';

const TableReportWithoutRequest = props => {
  const { data = [] } = props;

  return (
    <Segment>
      <p>Таблица</p>
    </Segment>
  );
};

export default TableReportWithoutRequest;
