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

const SaleCartridge = props => {
  const {
    data = [],
    onChangeCartridge,
    disabledEdit,
    onChangeSettingService,
    currency,
  } = props;

  const totalCartridge = data.reduce((total, item) => total + item.sum, 0);

  const columns = [
    {
      Header: '№',
      accessor: 'matnrCode',
      Cell: row => {
        return <div>{row.index + 1}</div>;
      },
      width: 50,
    },
    {
      Header: 'Наименование',
      accessor: 'matnrName',
      width: 500,
    },
    {
      Header: 'F№',
      accessor: 'fno',
      Cell: ({ original }) => (
        <Input
          readOnly
          size="mini"
          style={{ padding: '0' }}
          value={
            original.fno === null || original.fno === '' ? 0 : original.fno
          }
          type="number"
          fluid
        />
      ),
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
        <Checkbox
          readOnly
          disabled={disabledEdit}
          checked={original.warranty}
          label="Гарантия"
          //   onChange={() => warrantySparePart(item)}
        />
      ),
    },
  ];

  return (
    <Segment>
      <h5>Продажа картриджей</h5>
      <Divider />
      <ReactTableWrapper
        data={data}
        columns={columns}
        // className="-striped -highlight"
        pageSize={data.length > 10 ? 10 : data.length}
      />
      {data.length > 0 ? (
        <Segment>
          Общая сумма: {moneyFormat(totalCartridge)} {currency}
        </Segment>
      ) : (
        ''
      )}
    </Segment>
  );
};

export default SaleCartridge;
