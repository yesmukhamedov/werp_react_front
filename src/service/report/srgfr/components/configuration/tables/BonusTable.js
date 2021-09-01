import React from 'react';
import { injectIntl } from 'react-intl';
import { moneyFormat } from '../../../../../../utils/helpers';
import ReactTableWrapper from '../../../../../../utils/ReactTableWrapper';
import TextAlignCenter from '../../../../../../utils/TextAlignCenter';

const textWithMultipleLines = text => <TextAlignCenter text={text} />;

const BonusTable = ({ data, intl: { messages }, edit }) => {
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
            accessor: 'fromPercent',
            Cell: row => <TextAlignCenter text={`${row.value ?? 0} %`} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['Task.DateTo']),
            accessor: 'toPercent',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['percent']),
            accessor: 'percentAmount',
            Cell: row => <TextAlignCenter text={`${row.value ?? 0} %`} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['TBL_H__AMOUNT']),
            accessor: 'bonusAmount',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
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

export default injectIntl(BonusTable);
