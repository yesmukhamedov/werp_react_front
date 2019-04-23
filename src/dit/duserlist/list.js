import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import UpdateRow from './updateRow';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: {
        rname: [],
        internal_number: '',
      },
      passtype: 'password',
    };
  }

  close() {
    this.props.showUpdateModal(false);
  }

  updateRow(row) {
    if (row.is_root === 1) row['rootChecked'] = true;
    else row['rootChecked'] = false;
    this.setState({ row: row });
    this.props.fetchBrchesByBukrs(row.bukrs);
    this.props.showUpdateModal(true);
  }

  handleChange(fieldName, o) {
    const row = Object.assign({}, this.state.row);
    switch (fieldName) {
      case 'active':
        row.active = o.checked;
        break;
      case 'is_root':
        if (o.checked === true) {
          row.is_root = 1;
          row.rootChecked = true;
        } else {
          row.is_root = 0;
          row.rootChecked = false;
        }
        break;
      case 'bukrs':
        row.bukrs = o.value;
        this.props.f4FetchBranchesByBukrs(row.bukrs);
        o.options.some(c => {
          if (Number(c.key) === o.value) {
            row.bukrsname = c.text;
            return true;
          } else {
            return false;
          }
        });
        break;
      case 'branchId':
        row.branchId = o.value;
        o.options.some(c => {
          if (Number(c.key) === o.value) {
            row.branchname = c.text;
            return true;
          } else {
            return false;
          }
        });
        break;
      case 'internal_number':
        row.internal_number = o.value;
        break;
      case 'role_id':
        row.rids = o.value;
        row.rname = [];
        for (let i = 0; i < o.value.length; i++) {
          o.options.some(c => {
            if (c.key === o.value[i]) {
              row.rname[i] = c.text;
              return true;
            } else {
              return false;
            }
          });
        }
        break;
      default:
        row[fieldName] = o.value;
    }

    this.setState({
      ...this.state,
      row,
    });
  }

  submitUpdate() {
    this.props.submitUpdate(this.state.row);
  }

  render() {
    const { users } = this.props;
    const { messages } = this.props;
    const columns = [
      {
        Header: 'ID',
        id: 'id',
        accessor: d => d.id,
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
        Header: messages['L__USER'],
        accessor: 'username',
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
          matchSorter(rows, filter.value, { keys: ['username'] }),
        filterAll: true,
      },
      {
        Header: messages['internal_number'],
        accessor: 'internal_number',
        /* Cell: ({ value }) => (value === "null" ? "" : value), */
        Cell: props => {
          return (
            <Button
              style={{
                visibility:
                  props.original.internal_number != 0 ? 'visible' : 'hidden',
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
          matchSorter(rows, filter.value, { keys: ['internal_number'] }),
        filterAll: true,
        width: 100,
        maxWidth: 200,
        minWidth: 100,
      },
      {
        Header: messages['L__COMPANY'],
        accessor: 'bukrsname',
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
          matchSorter(rows, filter.value, { keys: ['bukrsname'] }),
        filterAll: true,
      },
      {
        Header: messages['L__BRANCH'],
        accessor: 'branchname',
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
          matchSorter(rows, filter.value, { keys: ['branchname'] }),
        filterAll: true,
      },
      {
        Header: messages['role'],
        accessor: 'rname',
        /* Cell: ({ value }) => (value === "null" ? "" : value), */
        Cell: props => {
          return (
            <Button
              style={{
                visibility: props.original.role_id != 0 ? 'visible' : 'hidden',
                backgroundColor:
                  props.original.active === false ? '#ff4d4d' : 'white',
                color: props.original.active === false ? 'white' : 'black',
              }}
              onClick={this.updateRow.bind(this, props.original)}
            >
              {props.value.map((val, i) => {
                return (
                  <span key={i}>
                    {val}
                    <br />
                  </span>
                );
              })}
            </Button>
          );
        },
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['rolename'] }),
        filterAll: true,
        width: 400,
        maxWidth: 500,
        minWidth: 400,
      },
      {
        Header: messages['L__STATUS'],
        accessor: 'active',
        // Cell: ({ value }) => String(value),
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
      },
    ];
    return (
      <div>
        <ReactTable
          columns={columns}
          data={users}
          resolveData={data => data.map(row => row)}
          filterable
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          noDataText={messages['loadingText']}
        />
        <UpdateRow
          messages={messages}
          companyOpts={this.props.companyOpts}
          branchOptions={this.props.branchOptions}
          roles={this.props.roles}
          handleChange={this.handleChange.bind(this)}
          submitUpdate={this.submitUpdate.bind(this)}
          updateModalOpened={this.props.updateModalOpened}
          close={this.close.bind(this)}
          {...this.state}
          iconClicked={this.iconClicked.bind(this)}
          randomGenerate={this.randomGenerate.bind(this)}
        />
      </div>
    );
  }
  iconClicked() {
    let { passtype } = this.state;
    passtype === 'text' ? (passtype = 'password') : (passtype = 'text');
    this.setState({ passtype: passtype });
  }
  randomGenerate() {
    let { row } = this.state;
    const chars = [...'abcdefghijklmnopqrstuvwxyz'];
    const numChars = [...'1234567890'];
    let letters = [...Array(5)].map(
      i => chars[(Math.random() * chars.length) | 0],
    ).join``;
    let num = [...Array(3)].map(
      i => numChars[(Math.random() * numChars.length) | 0],
    ).join``;
    row.password = letters.charAt(0).toUpperCase() + letters.slice(1) + num;
    this.setState({ row: row });
  }
}

export default List;
