import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import Update from './update';

class RenderPListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bukrs: '',
      updRow: '',
      showAddModal: false,
      showUpdateModal: false,
    };
  }

  inputChange(fieldName, o) {
    let { bukrs, updRow } = this.state;
    switch (fieldName) {
      case 'active':
        updRow.active = o.checked;
        break;
      case 'bukrs':
        bukrs = o.value;
        break;
    }

    this.setState({
      ...this.state,
      bukrs: bukrs,
      updRow,
    });
  }

  updateRow(row) {
    this.setState({
      ...this.state,
      showUpdateModal: true,
      updRow: row,
    });
  }

  resetUpdate = () =>
    this.setState({
      ...this.state,
      showUpdateModal: false,
      updRow: [],
    });

  saveUpdate = () => {
    const updRow = Object.assign({}, this.state.updRow);
    this.props.updateRow(updRow);
    this.setState({
      ...this.state,
      showUpdateModal: false,
    });
  };

  render() {
    const { messages, items } = this.props;
    if (items.length === 0 || items.length === undefined) {
      return [];
    }
    const columns = [
      {
        Header: 'ID',
        id: 'price_list_id',
        accessor: d => d.price_list_id,
        Cell: props => {
          return (
            <Button
              style={{
                backgroundColor:
                  props.original.active === false ? '#ff4d4d' : 'white',
                color: props.original.active === false ? 'white' : 'black',
              }}
              onClick={this.updateRow.bind(this, props.original)}
            >
              {props.value}
            </Button>
          );
        },
        width: 100,
        maxWidth: 200,
        minWidth: 100,
      },
      {
        Header: messages['code'],
        accessor: 'code',
        Cell: props => {
          return (
            <Button
              style={{
                backgroundColor:
                  props.original.active === false ? '#ff4d4d' : 'white',
                color: props.original.active === false ? 'white' : 'black',
              }}
              onClick={this.updateRow.bind(this, props.original)}
            >
              {props.value}
            </Button>
          );
        },
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['code'] }),
        filterAll: true,
        width: 100,
        maxWidth: 250,
        minWidth: 100,
      },
      {
        Header: messages['nomination'],
        accessor: 'name',
        Cell: props => {
          return (
            <Button
              style={{
                backgroundColor:
                  props.original.active === false ? '#ff4d4d' : 'white',
                color: props.original.active === false ? 'white' : 'black',
              }}
              onClick={this.updateRow.bind(this, props.original)}
            >
              {props.value}
            </Button>
          );
        },
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['name'] }),
        filterAll: true,
      },
      {
        Header: messages['price'],
        accessor: 'price',
        Cell: props => {
          return (
            <Button
              style={{
                backgroundColor:
                  props.original.active === false ? '#ff4d4d' : 'white',
                color: props.original.active === false ? 'white' : 'black',
              }}
              onClick={this.updateRow.bind(this, props.original)}
            >
              {props.value}
            </Button>
          );
        },
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['price'] }),
        filterAll: true,
        width: 100,
        maxWidth: 200,
        minWidth: 100,
      },
      {
        Header: messages['waers'],
        accessor: 'waers',
        Cell: props => {
          return (
            <Button
              style={{
                backgroundColor:
                  props.original.active === false ? '#ff4d4d' : 'white',
                color: props.original.active === false ? 'white' : 'black',
              }}
              onClick={this.updateRow.bind(this, props.original)}
            >
              {props.value}
            </Button>
          );
        },
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['waers'] }),
        filterAll: true,
        width: 100,
        maxWidth: 200,
        minWidth: 100,
      },
      {
        Header: messages['date'],
        accessor: 'from_date',
        Cell: props => {
          return (
            <Button
              style={{
                backgroundColor:
                  props.original.active === false ? '#ff4d4d' : 'white',
                color: props.original.active === false ? 'white' : 'black',
              }}
              onClick={this.updateRow.bind(this, props.original)}
            >
              {props.value}
            </Button>
          );
        },
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['from_date'] }),
        filterAll: true,
      },
      {
        Header: messages['L__STATUS'],
        accessor: 'active',
        Cell: props => {
          return (
            <Button
              style={{
                backgroundColor:
                  props.original.active === false ? '#ff4d4d' : 'white',
                color: props.original.active === false ? 'white' : 'black',
              }}
              onClick={this.updateRow.bind(this, props.original)}
            >
              {String(props.value)}
            </Button>
          );
        },
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['active'] }),
        filterAll: true,
        width: 100,
        maxWidth: 200,
        minWidth: 100,
      },
    ];

    return (
      <div style={{ backgroundColor: 'white', color: 'black' }}>
        <ReactTable
          columns={columns}
          data={items}
          resolveData={data => data.map(row => row)}
          filterable
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          noDataText={messages['loadingText']}
          defaultPageSize={30}
          /*  getTrProps={(state, rowInfo, column) => {
                    return {
                        style:{
                        backgroundColor:
                        rowInfo.original.active === false ? '#ff4d4d' : 'white',
                        }
                    }
                    }}*/
        />
        <Update
          messages={messages}
          {...this.state}
          resetUpdate={this.resetUpdate}
          saveUpdate={this.saveUpdate}
          inputChange={this.inputChange.bind(this)}
        />
      </div>
    );
  }
}
export default RenderPListTable;
