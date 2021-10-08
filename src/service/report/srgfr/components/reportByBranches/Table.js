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
            Header: textWithMultipleLines(messages['service_center']),
            accessor: 'branchName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(messages['plan_by_program']),
            accessor: 'categoryName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: textWithMultipleLines(
                messages['total_arrival_for_the_current_month'],
            ),
            accessor: 'sumTotalWithDiscount',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('sumTotalWithDiscount'),
        },
        {
            Header: textWithMultipleLines(messages['salary_of_master']),
            accessor: 'masterSalary',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('masterSalary'),
        },
        {
            Header: textWithMultipleLines(messages['master_award']),
            accessor: 'masterPremium',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('masterPremium'),
        },
        {
            Header: textWithMultipleLines(messages['salary_of_operator']),
            accessor: 'operatorSalary',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('operatorSalary'),
        },
        {
            Header: textWithMultipleLines(messages['operator_award']),
            accessor: 'operatorPremium',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('operatorPremium'),
        },
        {
            Header: textWithMultipleLines(
                `${messages['sum_cost_sparepart']} (${messages['on_sale']})`,
            ),
            accessor: 'sellPartsExpenseSum',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('sellPartsExpenseSum'),
        },
        {
            Header: textWithMultipleLines(
                `${messages['sum_cost_sparepart']} (${messages['in_guarantee']})`,
            ),
            accessor: 'warrantyPartsExpenseSum',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('warrantyPartsExpenseSum'),
        },
        {
            Header: textWithMultipleLines(messages['taxiExpence']),
            accessor: 'taxiExpense',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('taxiExpense'),
        },
        {
            Header: textWithMultipleLines(messages['consumables']),
            accessor: 'materialExpense',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('materialExpense'),
        },
        {
            Header: textWithMultipleLines(
                messages['difference_of_profit_in_tg'],
            ),
            accessor: 'differenceOfProfit',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('differenceOfProfit'),
        },
        {
            Header: textWithMultipleLines(messages['salary_of_manager']),
            accessor: 'managerAndCoordinatorSalary',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('managerAndCoordinatorSalary'),
        },
        {
            Header: textWithMultipleLines(messages['bonus_of_manager']),
            accessor: 'managerPremium',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('managerPremium'),
        },
        {
            Header: textWithMultipleLines(messages['total_profit_in_tg']),
            accessor: 'profitSum',
            Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
            filterAll: true,
            Footer: getTotalOf('profitSum'),
        },
        {
            Header: textWithMultipleLines(messages['total_profit_in_percent']),
            accessor: 'profitSumInPercent',
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

export default injectIntl(Table);
