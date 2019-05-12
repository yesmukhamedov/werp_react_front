import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class SubSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approve: [],
      selectAll: 0,
      reject: [],
      rejectAll: 0,
    };
    this.toggleRow = this.toggleRow.bind(this);
  }

  handleClick() {
    var approveds = [];
    var rejecteds = [];
    this.state.approve.map((c, id) => {
      if (c == true) {
        approveds.push(id);
      }
    });

    this.state.reject.map((c, id) => {
      if (c == true) {
        rejecteds.push(id);
      }
    });
    this.props.apprRejected(approveds, rejecteds);
  }

  toggleRow(id) {
    const selectedCopy = Object.assign([], this.state.approve);
    selectedCopy[id] = !this.state.approve[id];
    this.setState({
      approve: selectedCopy,
      selectAll: 2,
    });
  }

  toggleRow2(id) {
    const rejectedCopy = Object.assign([], this.state.reject);
    rejectedCopy[id] = !this.state.reject[id];
    this.setState({
      reject: rejectedCopy,
      rejectAll: 2,
    });
  }

  toggleSelectAll() {
    let selectedCopy = [];

    if (this.state.selectAll === 0) {
      this.props.listAes.forEach(x => {
        selectedCopy[x.id] = true;
      });
    }

    this.setState({
      approve: selectedCopy,
      selectAll: this.state.selectAll === 0 ? 1 : 0,
    });
  }

  toggleSelectAll2() {
    let rejectedCopy = [];

    if (this.state.rejectAll === 0) {
      this.props.listAes.forEach(x => {
        rejectedCopy[x.id] = true;
      });
    }

    this.setState({
      reject: rejectedCopy,
      rejectAll: this.state.rejectAll === 0 ? 1 : 0,
    });
  }

  render() {
    const { listAes, messages } = this.props;
    const columns = [
      {
        Header: messages['bukrs'],
        accessor: 'bukrs_name',
        minWidth: 90,
        maxWidth: 250,
      },
      {
        Header: messages['country'],
        accessor: 'country_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['brnch'],
        accessor: 'branch_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['dep'],
        accessor: 'dep_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['os_name'],
        accessor: 'os_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['type1'],
        accessor: 'type1_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['type2'],
        accessor: 'type2_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['type3'],
        accessor: 'type3_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['os_det'],
        accessor: 'detail_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        id: messages['rnum'],
        Header: messages['rnum'],
        accessor: row => `${row.rname} ${row.rnum}`,
        filterMethod: (filter, row) =>
          row._original.rname.startsWith(filter.value) ||
          row._original.rnum.startsWith(filter.value),
      },
      {
        Header: messages['TBL_H__STATUS'],
        accessor: 'status_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['amount'],
        accessor: 'price',
        minWidth: 90,
        maxWidth: 250,
      },
      {
        Header: messages['waers'],
        accessor: 'currency',
        minWidth: 70,
        maxWidth: 250,
      },
      {
        Header: messages['owner'],
        accessor: 'se0_name',
        width: 280,
        minWidth: 250,
        maxWidth: 500,
      },
      {
        Header: messages['examiner'],
        accessor: 'se1_name',
        width: 280,
        minWidth: 250,
        maxWidth: 500,
      },
      {
        Header: messages['examiner2'],
        accessor: 'se2_name',
        width: 280,
        minWidth: 250,
        maxWidth: 500,
      },
      {
        Header: messages['examiner3'],
        accessor: 'se3_name',
        width: 280,
        minWidth: 250,
        maxWidth: 500,
      },
      {
        Header: messages['buying_date'],
        accessor: 'buying_time',
        minWidth: 150,
        maxWidth: 250,
      },
      {
        Header: messages['count'],
        accessor: 'quantity',
        minWidth: 90,
        maxWidth: 90,
      },
      {
        id: 'checkbox',
        accessor: '',
        Cell: ({ original }) => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.approve[original.id] === true}
              onChange={() => this.toggleRow(original.id)}
            />
          );
        },
        Header: x => {
          return (
            <div>
              <input
                type="checkbox"
                className="checkbox"
                checked={this.state.selectAll === 1}
                ref={input => {
                  if (input) {
                    input.indeterminate = this.state.selectAll === 2;
                  }
                }}
                onChange={() => this.toggleSelectAll()}
              />
              {messages['approve']}
            </div>
          );
        },
        sortable: false,
        filterable: false,
        width: 100,
      },
      {
        id: 'checkbox',
        accessor: '',
        Cell: ({ original }) => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.reject[original.id] === true}
              onChange={() => this.toggleRow2(original.id)}
            />
          );
        },
        Header: x => {
          return (
            <div>
              <input
                type="checkbox"
                className="checkbox"
                checked={this.state.rejectAll === 1}
                ref={input => {
                  if (input) {
                    input.indeterminate = this.state.rejectAll === 2;
                  }
                }}
                onChange={() => this.toggleSelectAll2()}
              />
              {messages['rejecte']}
            </div>
          );
        },
        sortable: false,
        filterable: false,
        width: 100,
      },
    ];

    return (
      <div>
        {listAes === undefined || listAes.length == 0 ? (
          ''
        ) : (
          <ReactTable
            data={listAes}
            columns={columns}
            rowsText={messages['rowsText']}
            pageText={messages['pageText']}
            ofText={messages['ofText']}
            previousText={messages['previousText']}
            nextText={messages['nextText']}
            noDataText={messages['loadingText']}
            defaultPageSize={5}
            className="-striped -highlight"
          />
        )}
        <br />
        <Button
          floated="right"
          onClick={this.handleClick.bind(this)}
          color="teal"
        >
          {messages['save']}
        </Button>
      </div>
    );
  }
}
export default SubSection;
