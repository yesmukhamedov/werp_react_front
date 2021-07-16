import React from 'react';
import { injectIntl } from 'react-intl';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import TextAlignCenter from '../../../../../utils/TextAlignCenter';

const ExchangeRateTable = ({ data, intl: { messages } }) => {
  const columns = [
    {
      Header: 'id',
      accessor: 'id',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['TBL_H__DATE'],
      accessor: 'dateOpen',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['Task.DateFrom'],
      accessor: 'fromCurrency',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['Task.DateTo'],
      accessor: 'toCurrency',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['amount'],
      accessor: 'amount',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
  ];

  return (
    <ReactTableWrapper
      data={data}
      columns={columns}
      defaultPageSize={20}
      className="-striped -highlight"
      showPagination={true}
    />
  );
};

export default injectIntl(ExchangeRateTable);
