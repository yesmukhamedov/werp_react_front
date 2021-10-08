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
            accessor: 'contractDate',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['productSerialNumber']} />,
            accessor: 'tovarSerial',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['Form.ClientFullName']} />,
            accessor: 'customerFullName',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: (
                <TextAlignCenter text={messages['phone_number_of_client']} />
            ),
            accessor: 'fullPhone',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['Dealer.Fullname']} />,
            accessor: 'dealerFullName',
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
