import React from 'react';
import { injectIntl } from 'react-intl';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import TextAlignCenter from '../../../../../utils/TextAlignCenter';

const Table = ({ data, intl: { messages } }) => {
    const columns = [
        {
            Header: () => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {messages['service_center']}
                </div>
            ),
            accessor: 'branchName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: messages['plan_by_program'],
            accessor: 'categoryName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: () => (
                <div className="text-wrap" style={{ textAlign: 'center' }}>
                    {messages['total_arrival_for_the_current_month']}
                </div>
            ),

            accessor: 'sumTotalWithDiscount',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: messages['salary_of_master'],
            accessor: 'masterSalary',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: messages['master_award'],
            accessor: 'masterPremium',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: messages['salary_of_operator'],
            accessor: 'operatorSalary',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: messages['operator_award'],
            accessor: 'operatorPremium',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: `${messages['sum_cost_sparepart']} (${messages['on_sale']})`,
            accessor: 'sellPartsExpenseSum',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: `${messages['sum_cost_sparepart']} (${messages['in_guarantee']})`,
            accessor: 'warrantyPartsExpenseSum',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: messages['taxiExpence'],
            accessor: 'taxiExpense',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: messages['difference_of_profit_in_tg'],
            accessor: 'differenceOfProfit',
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
