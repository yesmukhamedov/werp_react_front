import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import { Segment, Button, Icon } from 'semantic-ui-react';

const ListReports = props => {
    const { messages, dynObjTrLst } = props;

    const download = row => {
        props.download(row);
    };

    const deleteRow = file => {
        if (!window.confirm(messages['Crm.ConfirmDelete'])) {
            return;
        }
        props.deleteFile(file.id);
    };

    const updateZreport = (rowId, e) => {
        e.preventDefault();
        props.updateProps(rowId, e.target.files[0]);
    };

    const columns = [
        {
            Header: 'ID',
            id: 'id',
            accessor: d => d.id,
            width: 100,
            maxWidth: 200,
            minWidth: 100,
        },
        {
            Header: messages['name'],
            accessor: 'name',
            filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ['name'] }),
            filterAll: true,
            width: 200,
            maxWidth: 250,
            minWidth: 100,
        },
        {
            Header: messages['change'],
            Cell: props => (
                <input
                    size="small"
                    type="file"
                    name="file"
                    onChange={updateZreport.bind(this, props.original.id)}
                />
            ),
            width: 300,
            maxWidth: 350,
            minWidth: 200,
            sortable: false,
            filterable: false,
        },
        {
            Cell: props => (
                <Button
                    color="twitter"
                    floated="left"
                    onClick={download.bind(this, props.original)}
                >
                    <Icon name="download" /> {'download'}
                </Button>
            ),
            width: 150,
            maxWidth: 200,
            minWidth: 100,
            sortable: false,
            filterable: false,
        },
        {
            Cell: props => (
                <Button
                    color="red"
                    floated="left"
                    onClick={deleteRow.bind(this, props.original)}
                >
                    <Icon name="delete" /> {messages['Crm.ToDelete']}
                </Button>
            ),
            width: 150,
            maxWidth: 200,
            minWidth: 100,
            sortable: false,
            filterable: false,
        },
    ];

    return (
        <Segment>
            {dynObjTrLst === undefined || dynObjTrLst.length === 0 ? (
                'undergfined'
            ) : (
                <ReactTable
                    data={dynObjTrLst}
                    columns={columns}
                    defaultPageSize={30}
                    showPagination
                    // style={{ height: '400px' }}
                    className="-striped -highlight"
                    loadingText={messages['loadingText']}
                    noDataText={messages['noDataText']}
                    previousText={messages['previousText']}
                    nextText={messages['nextText']}
                    rowsText={messages['rowsText']}
                    pageText={messages['pageText']}
                    ofText={messages['ofText']}
                />
            )}
        </Segment>
    );
};

export default ListReports;
