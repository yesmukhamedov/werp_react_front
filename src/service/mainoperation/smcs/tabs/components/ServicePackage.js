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

const ServicePackage = props => {
  const {
    data = [],
    addSparePartBtn,
    deleteSparePart,
    quantitySparePart,
  } = props;

  console.log('DATA', data.length);

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
        onClick={addSparePartBtn}
      >
        <Icon name="plus" size="small" />
        Добавить сервис пакет
      </Button>
    </Segment>
  );
};

export default ServicePackage;
