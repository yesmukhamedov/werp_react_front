import React from 'react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import TextAlignCenter from '../../../../../utils/TextAlignCenter';

const Table = ({ data, messages }) => {
    const columns = [
        {
            Header: '№',
            accessor: 'id',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['fio']} />,
            accessor: 'fio',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['L__COMPANY']} />,
            accessor: 'company',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['business_area']} />,
            accessor: 'business_area',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['L__BRANCH']} />,
            accessor: 'branch',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['country']} />,
            accessor: 'country',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['number_of_sales']} />,
            accessor: 'number_of_sales',
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
