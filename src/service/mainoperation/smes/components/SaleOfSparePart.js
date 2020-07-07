import React from 'react';
import {
  Button,
  Segment,
  Icon,
  Divider,
  Input,
  Checkbox,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import { moneyFormat } from '../../../../utils/helpers';

const SaleOfSparePart = props => {
  const { data = [], currency, onChangeSparePart, disabledEdit } = props;
  const totalSparePart = data.reduce((total, item) => total + item.sum, 0);
  const columns = [
    {
      Header: '№',
      id: 'row',
      maxWidth: 50,
      filterable: false,
      Cell: row => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      Header: 'Наименование',
      accessor: 'matnrName',
      width: 500,
    },
    {
      Header: 'Количество',
      accessor: 'quantity',
      Cell: ({ original }) => (
        <Input
          readOnly
          size="mini"
          style={{ padding: '0' }}
          value={original.quantity}
          type="number"
          label={{ content: 'шт' }}
          labelPosition="right"
          fluid
        />
      ),
    },
    {
      Header: 'Сумма',
      accessor: 'sum',
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
    },
    {
      Header: 'Гарантия',
      accessor: 'warranty',
      Cell: ({ original }) => (
        <Checkbox checked={original.warranty} readOnly label="Гарантия" />
      ),
    },
  ];

  return (
    <Segment>
      <h5>Продажа запчастей</h5>
      <Divider />
      <ReactTableWrapper
        data={data}
        columns={columns}
        className="-striped -highlight"
        pageSize={data.length > 10 ? 10 : data.length}
      />
      {data.length > 0 ? (
        <Segment>
          Общая сумма: {moneyFormat(totalSparePart)} {currency}
        </Segment>
      ) : (
        ''
      )}
    </Segment>
  );
};

export default SaleOfSparePart;
