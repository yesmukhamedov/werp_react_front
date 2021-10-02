import React, { useState } from 'react';
import ReactTableWrapperFixedColumns from '../../../utils/ReactTableWrapperFixedColumns';
import { Popup, Button } from 'semantic-ui-react';

const Table = props => {
    const { data = [], messages = {} } = props;
    const width = 230.5625;

    const mainHeaderStyle = {
        whiteSpace: 'pre-wrap',
        background: '#fff',
        border: '1px solid #fff',
        color: '#2185d0',
    };

    const initialColumns = [
        {
            fixed: 'left',
            headerStyle: mainHeaderStyle,
            columns: [
                {
                    Header: messages['bukrs'],
                    accessor: 'bukrsName',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    // getProps: (state, rowInfo, column) => {
                    // return {
                    //     style: mainCellStyle,
                    // };
                    // },
                    Cell: row => (
                        <div
                            className="text-wrap"
                            style={{ textAlign: 'center' }}
                        >
                            {row.value}
                        </div>
                    ),
                },
                {
                    Header: messages['branches'],
                    accessor: 'branchName',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div
                            className="text-wrap"
                            style={{ textAlign: 'center' }}
                        >
                            {row.value}
                        </div>
                    ),
                },
                {
                    Header: 'Название расхода',
                    accessor: 'consumptionName',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div
                            className="text-wrap"
                            style={{ textAlign: 'center' }}
                        >
                            {row.value}
                        </div>
                    ),
                },
                {
                    Header: messages['hkont'],
                    accessor: 'generalLedgerAccount',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div
                            className="text-wrap"
                            style={{ textAlign: 'center' }}
                        >
                            {row.value}
                        </div>
                    ),
                },
                {
                    Header: messages['waers'],
                    accessor: 'currencyName',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div
                            className="text-wrap"
                            style={{ textAlign: 'center' }}
                        >
                            {row.value}
                        </div>
                    ),
                },
                {
                    Header: messages['amount'] + ' USD',
                    accessor: 'summUSD',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div
                            className="text-wrap"
                            style={{ textAlign: 'center' }}
                        >
                            {row.value}
                        </div>
                    ),
                },
                {
                    Header: messages['amount'] + ' в валюте',
                    accessor: 'summCurrency',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div
                            className="text-wrap"
                            style={{ textAlign: 'center' }}
                        >
                            {row.value}
                        </div>
                    ),
                },
                {
                    Header: messages['Table.Actions'],
                    //accessor: '',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div
                            className="text-wrap"
                            style={{ textAlign: 'center' }}
                        >
                            <Button class="ui button">
                                messages['in_detail']
                            </Button>
                        </div>
                    ),
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
            defaultPageSize={10}
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
