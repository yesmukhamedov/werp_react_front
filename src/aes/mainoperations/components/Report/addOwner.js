import React, { Component } from 'react';
import {
  Table,
  Icon,
  Form,
  Segment,
  Button,
  Container,
  Label,
  Modal,
  Header,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';

class AddOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  se0(su) {
    this.props.se0(su);
    this.props.handleClose();
  }
  render() {
    const props = this.props;
    const columns = [
      {
        Header: props.messages['nomination'],
        accessor: 'fio',
        Cell: props => {
          return (
            <Button
              style={{ backgroundColor: 'white', color: '#2D2727' }}
              onClick={this.se0.bind(this, props.original)}
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
        Cell: props => {
          return (
            <Button
              style={{ backgroundColor: 'white', color: '#2D2727' }}
              onClick={this.se0.bind(this, props.original)}
            >
              {props.value}
            </Button>
          );
        },
        accessor: 'iinBin',
      },
    ];

    return (
      <div>
        <ReactTable
          columns={columns}
          data={props.staffList}
          filterable
          rowsText={props.messages['rowsText']}
          pageText={props.messages['pageText']}
          ofText={props.messages['ofText']}
          previousText={props.messages['previousText']}
          nextText={props.messages['nextText']}
          noDataText={props.messages['loadingText']}
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default AddOwner;
