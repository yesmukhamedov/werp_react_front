import React from 'react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import TextAlignCenter from '../../../../utils/TextAlignCenter';
import { Button } from 'semantic-ui-react';

const Table = ({ data, messages, edit, remove }) => {
    const columns = [
        {
            Header: <TextAlignCenter text="№" />,
            accessor: 'id',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['version']} />,
            accessor: 'releaseVersion',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['L__CREATE_DATE']} />,
            accessor: 'releaseDate',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['L__DESCRIPTION']} />,
            accessor: 'releaseContent',
            Cell: row => <TextAlignCenter text={row.value} />,
            filterAll: true,
        },
        {
            Header: <TextAlignCenter text={messages['Table.Actions']} />,
            filterable: false,
            Cell: ({ row }) => (
                <div style={{ textAlign: 'center' }}>
                    <Button
                        icon="edit"
                        color="black"
                        onClick={() => edit(row._original)}
                    />
                    <Button
                        icon="trash"
                        color="black"
                        onClick={() => remove(row._original.id)}
                    />
                </div>
            ),
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
