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

const SaleCartridge = props => {
  const { data = [], onChangeCartridge, editStatus } = props;

  const columns = [
    {
      Header: '№',
      accessor: 'matnrCode',
    },
    {
      Header: 'Наименование',
      accessor: 'matnrName',
      width: 400,
    },
    {
      Header: 'F№',
      accessor: 'fno',
      Cell: ({ original }) => (
        <Input
          size="mini"
          style={{ padding: '0' }}
          value={original.fno === null ? '' : original.fno}
          type="number"
          fluid
          onChange={(e, value) => onChangeCartridge(value, 'fnoEdit', original)}
        />
      ),
    },
    {
      Header: 'Количество',
      accessor: 'quantity',
      Cell: ({ original }) => (
        <Input
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
