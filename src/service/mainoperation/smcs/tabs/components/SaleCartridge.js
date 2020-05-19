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
  const {
    data = [],
    addCartridgeBtn,
    deleteSparePart,
    quantitySparePart,
    onChangeCartridge,
  } = props;

  console.log('DATA CARTRIDGE', data);

  const columns = [
    {
      Header: '№',
      accessor: 'matnrCode',
    },
    {
      Header: 'Наименование',
      accessor: 'matnrName',
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
          onChange={e => quantitySparePart(e, original)}
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
          onClick={() => deleteSparePart(original)}
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
      >
        <Icon name="plus" size="small" />
        Добавить картриджей
      </Button>
    </Segment>
  );
};

export default SaleCartridge;
