import React from 'react';
import {
  Button,
  Segment,
  Icon,
  Divider,
  Input,
  Checkbox,
  Dropdown,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';

const SaleCartridge = props => {
  const { data = [], onChangeCartridge, editStatus } = props;

  const fnoOptions = [
    {
      key: 1,
      text: 1,
      value: 1,
    },
    {
      key: 2,
      text: 2,
      value: 2,
    },
    {
      key: 3,
      text: 3,
      value: 3,
    },
    {
      key: 4,
      text: 4,
      value: 4,
    },
    {
      key: 5,
      text: 5,
      value: 5,
    },
  ];

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
        <Dropdown
          fluid
          selection
          value={original.fno}
          onChange={(e, value) => onChangeCartridge(value, 'fnoEdit', original)}
          options={fnoOptions}
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
          onChange={item =>
            onChangeCartridge(item, 'quantityCartridge', original)
          }
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
          // checked={original.warranty}
          label="Гарантия"
          //   onChange={() => warrantySparePart(item)}
        />
      ),
    },
    {
      Header: '',
      accessor: 'delete',
      Cell: ({ original }) => (
        <Button
          size="mini"
          color="red"
          onClick={() => onChangeCartridge(original, 'deleteCartridge')}
        >
          Удалить
        </Button>
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
      <Divider />

      <Button
        // disabled={editStatus}
        icon
        labelPosition="left"
        color="green"
        size="small"
        onClick={item => onChangeCartridge(item, 'addCartridgeBtn')}
        disabled={editStatus}
      >
        <Icon name="plus" size="small" />
        Добавить картриджей
      </Button>
    </Segment>
  );
};

export default SaleCartridge;
