import React from 'react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';

export const History = props => {
  const { messages } = props;
  const columns = [
    {
      Header: `${messages['waers']}`,
      accessor: 'currency',
    },
    {
      Header: 'Дата с',
      accessor: 'dateFrom',
    },
    {
      Header: '1 USD',
      accessor: 'usd',
    },
    {
      Header: 'Вид',
      accessor: 'view',
    },
  ];
  return <ReactTableWrapper columns={columns} filterable />;
};
