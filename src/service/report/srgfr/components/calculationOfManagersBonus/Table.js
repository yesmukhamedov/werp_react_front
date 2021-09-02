import React from 'react';
import { injectIntl } from 'react-intl';
import { moneyFormat } from '../../../../../utils/helpers';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import TextAlignCenter from '../../../../../utils/TextAlignCenter';

const textWithMultipleLines = text => <TextAlignCenter text={text} />;

const Table = ({ data, intl: { messages } }) => {
    const columns = [
        {
            Header: textWithMultipleLines(messages['country']),
            accessor: 'countryName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['Task.Branch']),
            accessor: 'branchName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['bonus']),
            accessor: 'bonusAmount',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['bonus_as_percentage']),
            accessor: 'bonusAmountPercent',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(
                messages['percentage_of_completed_works'],
            ),
            accessor: 'donePercent',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(
                messages['total_amount_with_discount'],
            ),
            accessor: 'sumTotalWithDiscount',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
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

export default injectIntl(Table);
