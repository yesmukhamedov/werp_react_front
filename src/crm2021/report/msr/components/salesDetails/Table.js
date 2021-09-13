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
            Header: <TextAlignCenter text={messages['Crm.DateOfSale']} />,
            accessor: 'Crm.DateOfSale',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['productSerialNumber']} />,
            accessor: 'productSerialNumber',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['Form.ClientFullName']} />,
            accessor: 'Form.ClientFullName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: (
                <TextAlignCenter text={messages['phone_number_of_client']} />
            ),
            accessor: 'phone_number_of_client',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['Dealer.Fullname']} />,
            accessor: 'Dealer.Fullname',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['L__COMPANY']} />,
            accessor: 'L__COMPANY',
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
            accessor: 'L__BRANCH',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['country']} />,
            accessor: 'country',
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
