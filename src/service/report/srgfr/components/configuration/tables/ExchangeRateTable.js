import React from 'react';
import { injectIntl } from 'react-intl';
import ReactTableWrapper from '../../../../../../utils/ReactTableWrapper';
import TextAlignCenter from '../../../../../../utils/TextAlignCenter';

const textWithMultipleLines = text => (
    <div className="text-wrap" style={{ textAlign: 'center' }}>
        {text}
    </div>
);

const ExchangeRateTable = ({ data, intl: { messages }, edit }) => {
    const columns = [
        {
            Header: '#',
            accessor: 'id',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['TBL_H__DATE']),
            accessor: 'dateOpen',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['Task.DateFrom']),
            accessor: 'fromCurrency',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['Task.DateTo']),
            accessor: 'toCurrency',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['amount']),
            accessor: 'amount',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['BTN__EDIT']),
            filterable: false,
            fixed: 'right',
            Cell: ({ row }) => (
                <div style={{ textAlign: 'center' }}>{edit(row)}</div>
            ),
        },
    ];

    return (
        <ReactTableWrapper
            data={data}
            columns={columns}
            defaultPageSize={5}
            className="-striped -highlight"
            showPagination={true}
        />
    );
};

export default injectIntl(ExchangeRateTable);
