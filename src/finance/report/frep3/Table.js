import React from 'react';
import ReactTableWrapperFixedColumns from '../../../utils/ReactTableWrapperFixedColumns';
import { Popup, Button, Modal } from 'semantic-ui-react';

const Table = props => {
    const { data = [], messages = {}, findParam = {}, detailTable } = props;

    const mainHeaderStyle = {
        whiteSpace: 'pre-wrap',
        background: '#fff',
        border: '1px solid #fff',
        color: '#2185d0',
    };
    const textAlign = {
        textAlign: 'center',
    };

    const conditionalStyle = rowInfo => {
        if (rowInfo && rowInfo.row) {
            return {
                style: {
                    background:
                        rowInfo.row.hkontName === null ? 'yellow' : null,
                    fontWeight: rowInfo.row.hkontName === null ? 'bold' : null,
                },
            };
        }
        return {};
    };

    const conditionalStyleWithTextColor = rowInfo => {
        if (rowInfo && rowInfo.row) {
            return {
                style: {
                    background:
                        rowInfo.row.hkontName === null ? 'yellow' : null,
                    fontWeight: rowInfo.row.hkontName === null ? 'bold' : null,
                    color: rowInfo.row.hkontName === null ? 'blue' : null,
                },
            };
        }
        return {};
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
                    Header: messages['branches'],
                    accessor: 'branchName',
                    headerStyle: mainHeaderStyle,
                    getProps: (state, rowInfo) => {
                        return conditionalStyleWithTextColor(rowInfo);
                    },
                    Cell: row => div(row.value),
                },
                {
                    Header: messages['name'],
                    accessor: 'hkontName',
                    headerStyle: mainHeaderStyle,
                    getProps: (state, rowInfo) => {
                        return conditionalStyle(rowInfo);
                    },
                    Cell: row => div(row.value),
                },
                {
                    Header: messages['hkont'],
                    accessor: 'hkont',
                    headerStyle: mainHeaderStyle,
                    getProps: (state, rowInfo) => {
                        return conditionalStyle(rowInfo);
                    },
                    Cell: row => div(row.value),
                },
                {
                    Header: messages['waers'],
                    accessor: 'waers',
                    headerStyle: mainHeaderStyle,
                    getProps: (state, rowInfo) => {
                        return conditionalStyleWithTextColor(rowInfo);
                    },
                    Cell: row => div(row.value),
                },
                {
                    Header: messages['amount'] + ' USD',
                    accessor: 'dmbtr',
                    headerStyle: mainHeaderStyle,
                    getProps: (state, rowInfo) => {
                        return conditionalStyle(rowInfo);
                    },
                    Cell: row => div(row.value),
                },
                {
                    Header: messages['amount'] + ' в валюте',
                    accessor: 'wrbtr',
                    headerStyle: mainHeaderStyle,
                    getProps: (state, rowInfo) => {
                        return conditionalStyle(rowInfo);
                    },
                    Cell: row => div(row.value),
                },
                {
                    Header: messages['Table.Actions'],
                    accessor: 'branchName',
                    headerStyle: mainHeaderStyle,
                    getProps: (state, rowInfo) => {
                        return conditionalStyle(rowInfo);
                    },
                    Cell: row => {
                        return row.original.hkontName ? (
                            <div className="text-wrap" style={textAlign}>
                                <Popup
                                    content={messages['Detailing']}
                                    trigger={
                                        <Button
                                            className="ui button"
                                            onClick={() => {
                                                detailTable({
                                                    branchId:
                                                        row.original.branchId,
                                                    bukrs: findParam['bukrs'],
                                                    bldatFrom:
                                                        findParam['bldatFrom'],
                                                    bldatTo:
                                                        findParam['bldatTo'],
                                                    hkont: row.original.hkont,
                                                    waers: row.original.waers,
                                                });
                                            }}
                                        >
                                            {messages['in_detail']}
                                        </Button>
                                    }
                                />
                            </div>
                        ) : null;
                    },
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
