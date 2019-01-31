import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchWerksBranchList,
  f4FetchStaffList,
} from '../../../../reference/f4/f4_action';
import { Dropdown, Table, Icon, Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';

class AddExaminer3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bukrs: '',
      branch_id: '',
      branchOptions: [],
    };
  }
  sEximaner3(se3) {
    this.props.se3(se3);
    this.props.handleClose();
  }

  render() {
    let staffList;
    if (!this.state.branch_id) {
      staffList = [];
    } else {
      staffList = this.props.staffList;
    }
    const { messages } = this.props;
    const columns = [
      {
        Header: messages['nomination'],
        accessor: 'fio',
        Cell: props => {
          return (
            <Button
              style={{ backgroundColor: 'white', color: '#2D2727' }}
              onClick={this.sEximaner3.bind(this, props.original)}
            >
              <Icon name="selected radio" />
              {props.value}
            </Button>
          );
        },
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['fio'] }),
        filterAll: true,
      },
      {
        Header: 'inn',
        accessor: 'iinBin',
        Cell: props => {
          return (
            <Button
              style={{ backgroundColor: 'white', color: '#2D2727' }}
              onClick={this.sEximaner3.bind(this, props.original)}
            >
              {props.value}
            </Button>
          );
        },
      },
    ];
    return (
      <div>
        <Table collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Icon name="folder" />
                {messages['bukrs']}
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  placeholder={messages['bukrs']}
                  selection
                  options={this.props.companyOpts}
                  onChange={(e, { value }) => {
                    this.loadBranches(value);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Icon name="browser" />
                {messages['brnch']}
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  placeholder={messages['brnch']}
                  search
                  selection
                  options={this.state.branchOptions}
                  onChange={(e, { value }) => {
                    this.departmentOpts(value);
                  }}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <ReactTable
          columns={columns}
          data={staffList}
          filterable
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          noDataText={messages['loadingText']}
          defaultPageSize={10}
        />
      </div>
    );
  }

  loadBranches(key) {
    const branchOptions = this.props.branchOptions;
    if (!this.props.branchOptions) {
      return [];
    }
    let map = [];
    for (let item in branchOptions) {
      if (item == key) {
        for (let subItem in branchOptions[item]) {
          map.push({
            key: branchOptions[item][subItem]['key'],
            text: branchOptions[item][subItem]['text'],
            value: branchOptions[item][subItem]['value'],
          });
        }
      }
    }
    this.setState({
      ...this.state,
      bukrs: key,
      branchOptions: map,
    });
  }
  departmentOpts(key) {
    this.setState({
      ...this.state,
      branch_id: key,
    });

    this.props.f4FetchStaffList(
      'fcis',
      this.state.bukrs,
      key,
      '',
      '',
      false,
      value => this.setState({ loading: false }),
    );
  }
}
function mapStateToProps(state) {
  return {
    branchOptions: state.userInfo.branchOptionsAll,
    staffList: state.f4.staffList,
  };
}
export default connect(
  mapStateToProps,
  {
    f4FetchWerksBranchList,
    f4FetchStaffList,
  },
)(AddExaminer3);
