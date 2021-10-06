import React, { useState, useEffect } from 'react';
import ReactTableWrapperFixedColumns from '../../../utils/ReactTableWrapperFixedColumns';
import { Popup, Button, Modal } from 'semantic-ui-react';
import Frep3 from './index';

const Table = props => {
    const { data = [], messages = {} } = props;
    const width = 263.5;

    const mainHeaderStyle = {
        whiteSpace: 'pre-wrap',
        background: '#fff',
        border: '1px solid #fff',
        color: '#2185d0',
    };
    const textAlign = {
        textAlign: 'center',
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
                    width: width,
                    Cell: row => (
                        <div className="text-wrap" style={textAlign}>
                            {row.value}
                        </div>
                    ),
                    getProps: (state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                style: {
                                    background:
                                        rowInfo.row.hkontName === null
                                            ? 'yellow'
                                            : null,
                                    fontWeight:
                                        rowInfo.row.hkontName === null
                                            ? 'bold'
                                            : null,
                                    color:
                                        rowInfo.row.hkontName === null
                                            ? 'blue'
                                            : null,
                                },
                            };
                        } else {
                            return {};
                        }
                    },
                },
                {
                    Header: 'Название расхода',
                    accessor: 'hkontName',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div className="text-wrap" style={textAlign}>
                            {row.value}
                        </div>
                    ),
                    getProps: (state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                style: {
                                    background:
                                        rowInfo.row.hkontName === null
                                            ? 'yellow'
                                            : null,
                                    fontWeight:
                                        rowInfo.row.hkontName === null
                                            ? 'bold'
                                            : null,
                                },
                            };
                        } else {
                            return {};
                        }
                    },
                },
                {
                    Header: messages['hkont'],
                    accessor: 'hkont',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div className="text-wrap" style={textAlign}>
                            {row.value}
                        </div>
                    ),
                    getProps: (state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                style: {
                                    background:
                                        rowInfo.row.hkontName === null
                                            ? 'yellow'
                                            : null,
                                    fontWeight:
                                        rowInfo.row.hkontName === null
                                            ? 'bold'
                                            : null,
                                },
                            };
                        } else {
                            return {};
                        }
                    },
                },
                {
                    Header: messages['waers'],
                    accessor: 'waers',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div className="text-wrap" style={textAlign}>
                            {row.value}
                        </div>
                    ),
                    getProps: (state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                style: {
                                    background:
                                        rowInfo.row.hkontName === null
                                            ? 'yellow'
                                            : null,
                                    fontWeight:
                                        rowInfo.row.hkontName === null
                                            ? 'bold'
                                            : null,
                                    color:
                                        rowInfo.row.hkontName === null
                                            ? 'blue'
                                            : null,
                                },
                            };
                        } else {
                            return {};
                        }
                    },
                },
                {
                    Header: messages['amount'] + ' USD',
                    accessor: 'dmbtr',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div className="text-wrap" style={textAlign}>
                            {row.value.toLocaleString()}
                        </div>
                    ),
                    getProps: (state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                style: {
                                    background:
                                        rowInfo.row.hkontName === null
                                            ? 'yellow'
                                            : null,
                                    fontWeight:
                                        rowInfo.row.hkontName === null
                                            ? 'bold'
                                            : null,
                                },
                            };
                        } else {
                            return {};
                        }
                    },
                },
                {
                    Header: messages['amount'] + ' в валюте',
                    accessor: 'wrbtr',
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div className="text-wrap" style={textAlign}>
                            {row.value.toLocaleString()}
                        </div>
                    ),
                    getProps: (state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                style: {
                                    background:
                                        rowInfo.row.hkontName === null
                                            ? 'yellow'
                                            : null,
                                    fontWeight:
                                        rowInfo.row.hkontName === null
                                            ? 'bold'
                                            : null,
                                },
                            };
                        } else {
                            return {};
                        }
                    },
                },
                {
                    Header: messages['Table.Actions'],
                    headerStyle: mainHeaderStyle,
                    width: width,
                    Cell: row => (
                        <div className="text-wrap" style={textAlign}>
                            <Popup
                                content={messages['Detailing']}
                                trigger={
                                    <Button
                                        class="ui button"
                                        color="grey"
                                        onClick={() => {
                                            //Frep3.setDetailParam('0');
                                            //console.log('row: ', row.original);
                                            //Frep3.toDetalization('0');
                                            Frep3.setModalDetalOpen(true);
                                        }}
                                    >
                                        {messages['in_detail']}
                                    </Button>
                                }
                            />
                        </div>
                    ),
                    // if (rowInfo && rowInfo.row) {
                    //     return row.hkontName == null ? (
                    //     null
                    // ) : (

                    // );
                    //   } else {
                    //     return {};
                    // }

                    getProps: (state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                style: {
                                    background:
                                        rowInfo.row.hkontName === null
                                            ? 'yellow'
                                            : null,
                                },
                            };
                        } else {
                            return {};
                        }
                    },
                },
            ],
        },
    ];

    //console.log('rower: ', rower)
    return (
        <div>
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
        </div>
    );
};

export default Table;
