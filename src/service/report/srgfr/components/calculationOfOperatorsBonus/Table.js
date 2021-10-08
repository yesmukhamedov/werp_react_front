import React from 'react';
import { injectIntl } from 'react-intl';
import { moneyFormat } from '../../../../../utils/helpers';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import TextAlignCenter from '../../../../../utils/TextAlignCenter';

const textWithMultipleLines = text => <TextAlignCenter text={text} />;

const Table = ({ data = [], intl: { messages } }) => {
    const getTotalOf = accessor => {
        if (data.length === 0) {
            return 0;
        }
        return (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
                {messages['totalAmount'] +
                    ': ' +
                    moneyFormat(
                        data.reduce((total, item) => total + item[accessor], 0),
                    )}
            </div>
        );
    };

    const columns = [
        {
            Header: textWithMultipleLines('#'),
            accessor: 'operatorId',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['fio']),
            accessor: 'operatorFIO',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(
                messages['number_of_completed_services'],
            ),
            accessor: 'operatorDoneServiceCount',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['bonus']),
            accessor: 'bonusSum',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('bonusSum'),
        },
        {
            Header: textWithMultipleLines(messages['salary']),
            accessor: 'salarySum',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('salarySum'),
        },
        {
            Header: textWithMultipleLines(messages['total_salary']),
            accessor: 'totalSalarySum',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('totalSalarySum'),
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
