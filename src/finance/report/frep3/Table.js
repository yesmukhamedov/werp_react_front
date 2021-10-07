import React, { useState, useEffect } from 'react';
import ReactTableWrapperFixedColumns from '../../../utils/ReactTableWrapperFixedColumns';
import { Popup, Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { fetchDetailList } from './frep3Actions';
import Detail from './Modal';

const Table = props => {
    const {
        data = [],
        messages = {},
        detailList,
        language,
        findParam = {},
    } = props;
    const width = 263.5;
    const [detailParam, setDetailParam] = useState({});
    const [modalDetalOpen, setModalDetalOpen] = useState(false);

    const detailTable = () => {
        //setDetailParam({ ...detailParam, language: language }); //ru en kk
        //setDetailParam(detailParam["language"]= 'ru' ); //ru en kk
        try {
            props.fetchDetailList(detailParam);
        } catch {
            alert('shto to ne to, Obratitsya k fermeru');
        }
    };

    const detailParams = rowdata => {
        setDetailParam({ data: 'HHHH' });
        console.log(detailParam);
    };
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
                    accessor: 'branchName',
                    headerStyle: mainHeaderStyle,
                    width: width,

                    Cell: row => {
                        return row.original.hkontName ? (
                            <div className="text-wrap" style={textAlign}>
                                <Popup
                                    content={messages['Detailing']}
                                    trigger={
                                        <Button
                                            class="ui button"
                                            onClick={() => {
                                                console.log(row.original);
                                                detailTable();
                                                // setDetailParam(detailParam["bukrs"]= findParam["bukrs"]);
                                                // setDetailParam(detailParam["branchId"]= row.original.branchId);
                                                // setDetailParam(detailParam["bldatFrom"]= findParam["bldatFrom"]);
                                                // setDetailParam(detailParam["bldatTo"]= findParam["bldatTo"]);
                                                // setDetailParam(detailParam["hkont"]= row.original.hkont);
                                                // setDetailParam(detailParam["waers"]= row.original.waers);

                                                //detailParams(row.original)
                                                setModalDetalOpen(true);
                                                //console.log(detailParam)

                                                setDetailParam({
                                                    ...detailParam,
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
    return (
        <div>
            <Detail
                detail={detailList ? detailList : []}
                messages={messages}
                modalDetalOpen={modalDetalOpen}
                setModalDetalOpen={setModalDetalOpen}
            />
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

//export default Table;

function mapStateToProps(state) {
    return {
        language: state.userInfo.language,
        detailList: state.frep3Reducer.frep3DetailList,
    };
}
export default connect(mapStateToProps, {
    fetchDetailList,
})(injectIntl(Table));
