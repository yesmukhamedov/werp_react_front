import React from 'react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import TextAlignCenter from '../../../../../utils/TextAlignCenter';

const Table = ({ data, messages }) => {
    const columns = [
        {
            Header: <TextAlignCenter text={messages['fio']} />,
            accessor: 'staffFullName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['L__COMPANY']} />,
            accessor: 'companyName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['business_area']} />,
            accessor: 'businessAreaName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['L__BRANCH']} />,
            accessor: 'branchName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['country']} />,
            accessor: 'countryName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['number_of_sales']} />,
            accessor: 'qty',
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

export default Table;
