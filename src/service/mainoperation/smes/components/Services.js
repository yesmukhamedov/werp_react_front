import React from 'react';
import { Segment, Divider, Input } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import { moneyFormat } from '../../../../utils/helpers';

const Services = props => {
  const { data = [], currency } = props;

  const totalServices = data.reduce((total, item) => total + item.sum, 0);

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
      Header: 'Наименование услуг',
      accessor: 'serviceTypeId',
      width: 500,
      Cell: ({ original }) => <div>{original.serviceTypeName}</div>,
    },
    {
      Header: 'Сумма',
      accessor: 'sum',
      Cell: ({ original }) => <div>{moneyFormat(original.sum)}</div>,
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
    },
  ];

  return (
    <Segment>
      <h5>Услуги</h5>
      <Divider />
      <ReactTableWrapper
        data={data}
        columns={columns}
        className="-striped -highlight"
        pageSize={data.length > 10 ? 10 : data.length}
      />
      {data.length > 0 ? (
        <Segment>
          Общая сумма: {moneyFormat(totalServices)} {currency}
        </Segment>
      ) : (
        ''
      )}
    </Segment>
  );
};

export default Services;
