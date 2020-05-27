import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Segment,
  Button,
  Popup,
  Divider,
  Dropdown,
  Input,
} from 'semantic-ui-react';
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
    operatorsByBranch = [],
  } = props;

  const operatorOptions = operatorsByBranch.map(item => {
    return {
      key: item.staffId,
      text: item.fullName,
      value: item.staffId,
    };
  });

  const [state, setState] = useState([]);
  const [showTable, setshowTable] = useState(false);

  console.log('STATE', state);

  const addOperatorRow = () => {
    let length = state.length;

    setState([
      ...state,
      {
        id: 1 + length,
        toOperatorId: null,
        amountPercent: '',
      },
    ]);
    setshowTable(true);
  };

  const changePercent = (e, row) => {
    setState(
      state.map(item =>
        item.id === row.id
          ? {
              ...item,
              amountPercent: e.target.value,
            }
          : item,
      ),
    );
  };

  const removeOperator = row => {
    console.log(row.id);
    let filterRemove = state.filter(item => item.id != row.id);
    setState(filterRemove);
  };

  const onOperatorSelect = (o, row) => {
    console.log(o.value, row);
    setState(
      state.map(item =>
        item.id === row.id
          ? {
              ...item,
              toOperatorId: o.value,
            }
          : item,
      ),
    );
  };

  return (
    <Container fluid>
      <Segment>
        <h3>Перераспределение</h3>
      </Segment>
      <TableReDistribution1 data={data} />
      <Divider />
      {showTable ? (
        <Segment>
          <TableRedistribution2
            data={state}
            pageSize={state.length}
            operatorOptions={operatorOptions}
            changePercent={changePercent}
            removeOperator={removeOperator}
            onOperatorSelect={onOperatorSelect}
          />
        </Segment>
      ) : null}
      <Segment className="justifySegment">
        <Popup
          content="Добавить оператора"
          trigger={
            <Button
              color="green"
              icon="add"
              onClick={() => {
                addOperatorRow();
                clickAddOperator();
              }}
            />
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
