import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Segment, Button, Popup, Divider } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import TableReDistribution1 from './tables/TableReDistribution1';
import TableRedistribution2 from './tables/TableRedistribution2';
require('moment/locale/ru');
require('moment/locale/tr');

const Smrd = props => {
  const {
    intl: { message },
    data,
    clickAddOperator = [],
    operatorOptions,
  } = props;
  console.log('SMRD PROPS', props);

  return (
    <Container fluid>
      <Segment>
        <h3>Перераспределение</h3>
      </Segment>
      <TableReDistribution1 data={data} />
      <Divider />

      {/* <TableRedistribution2 /> */}
      <Segment className="justifySegment">
        <Popup
          content="Добавить оператора"
          trigger={
            <Button color="green" icon="add" onClick={clickAddOperator} />
          }
        />

        <Popup
          content="Перераспределить список"
          trigger={<Button color="blue">Перераспределение</Button>}
        />
      </Segment>
    </Container>
  );
};

export default Smrd;
