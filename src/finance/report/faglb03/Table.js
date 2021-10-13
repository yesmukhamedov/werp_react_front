import React from 'react';
import ReactTableWrapperFixedColumns from '../../../utils/ReactTableWrapperFixedColumns';

const Table = props => {
    const { data = [], messages = {} } = props;

    const mainHeaderStyle = {
        whiteSpace: 'pre-wrap',
        background: '#fff',
        border: '1px solid #fff',
        color: '#2185d0',
    };

    const div = element => {
        return (
            <div className="text-wrap" style={{ textAlign: 'center' }}>
                {element}
            </div>
        );
    };

    const initialColumns = [
        {
            fixed: 'left',
            headerStyle: mainHeaderStyle,
            columns: [
                {
                    Header: messages['monat'],
                    accessor: 'month',
                    headerStyle: mainHeaderStyle,
                    Cell: row => div(row.value),
                },
                {
                    Header: messages['gjahr'],
                    accessor: 'year',
                    headerStyle: mainHeaderStyle,
                    Cell: row => div(row.value),
                },
                {
                    Header: messages['bukrs'],
                    accessor: 'bukrs',
                    headerStyle: mainHeaderStyle,
                    Cell: row => div(row.value),
                },
                {
                    Header: messages['name'],
                    accessor: 'bukrsName',
                    headerStyle: mainHeaderStyle,
                    Cell: row => div(row.value),
                },
                {
                    Header: messages['fullHtonk'],
                    accessor: 'generalLedgerAccount',
                    headerStyle: mainHeaderStyle,
                    Cell: row => div(row.value),
                },
                {
                    Header: messages['debit'],
                    accessor: 'debit',
                    headerStyle: mainHeaderStyle,
                    Cell: row =>
                        div(row.value ? row.value.toLocaleString() : ''),
                },
                {
                    Header: messages['credit'],
                    accessor: 'credit',
                    headerStyle: mainHeaderStyle,
                    Cell: row =>
                        div(row.value ? row.value.toLocaleString() : ''),
                },
                {
                    Header: messages['waers'],
                    accessor: 'currencyName',
                    headerStyle: mainHeaderStyle,
                    Cell: row => div(row.value),
                },
            ],
        },
    ];

    return (
        <ReactTableWrapperFixedColumns
            data={data ? data : []}
            columns={initialColumns}
            previousText={messages['Table.Previous']}
            nextText={messages['Table.Next']}
            showPagination={true}
            className="-striped -highlight"
            defaultPageSize={25}
            pageSizeOptions={[10, 20, 30, 40]}
            loadingText={messages['Table.Next']}
            noDataText={messages['Table.NoData']}
            rowsText={messages['Table.Rows']}
            pageText={messages['Table.Page']}
            ofText={messages['Table.Of']}
        />
    );
};

export default Table;
