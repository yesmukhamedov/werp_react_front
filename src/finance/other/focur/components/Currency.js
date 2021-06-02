import React from 'react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';

export const Currency = props => {
  const { messages = [] } = props;
  const columns = [
    {
      Header: `${messages['waers']}`,
      accessor: 'currency',
    },
    {
      Header: `${messages['Form.DateFrom']}`,
      accessor: 'dateFrom',
    },
    {
      Header: '1 USD',
      accessor: 'usd',
    },
    {
      Header: `${messages['kind']}`,
      accessor: 'view',
    },
    {
      Header: `${messages['bukrs']}`,
      accessor: 'bukrs',
    },
  ];
  return <ReactTableWrapper columns={columns} />;
};
