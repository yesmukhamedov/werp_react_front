import React from 'react';
import { injectIntl } from 'react-intl';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import TextAlignCenter from '../../../../../utils/TextAlignCenter';

const Table = ({ data, intl: { messages } }) => {
  const columns = [
    {
      Header: messages['service_center'],
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
      Header: messages['total_arrival_for_the_current_month'],
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
      Header: 'sellPartsExpenseSum',
      accessor: 'sellPartsExpenseSum',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'warrantyPartsExpenseSum',
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
      Header: 'differenceOfProfit',
      accessor: 'differenceOfProfit',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'managerAndCoordinatorSalary',
      accessor: 'managerAndCoordinatorSalary',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'managerPremium',
      accessor: 'managerPremium',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'profitSum',
      accessor: 'profitSum',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'profitSumInPercent',
      accessor: 'profitSumInPercent',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: 'materialExpense',
      accessor: 'materialExpense',
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
