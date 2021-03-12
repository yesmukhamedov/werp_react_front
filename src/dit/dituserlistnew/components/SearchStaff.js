import React from 'react';
import { Form, Input, Button, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';

const SearchStaff = props => {
  const { messages, staffs, searchSt } = props;

  const selectedStaff = row => {
    props.selectedStaff(row);
  };

  const openInNewTab = url => {
    let win = window.open(url, '_blank');
    win.focus();
  };

  const columns = [
    {
      Header: 'ID',
      id: 'staff_id',
      accessor: d => d.staff_id,
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedStaff.bind(this, props.original)}
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
      Header: 'firstname',
      accessor: 'firstname',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedStaff.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['firstname'] }),
      filterAll: true,
      width: 200,
      maxWidth: 300,
      minWidth: 200,
    },
    {
      Header: 'lastname',
      accessor: 'lastname',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedStaff.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['lastname'] }),
      filterAll: true,
      width: 200,
      maxWidth: 300,
      minWidth: 200,
    },
    {
      Header: 'middlename',
      accessor: 'middlename',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedStaff.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['middlename'] }),
      filterAll: true,
      width: 200,
      maxWidth: 300,
      minWidth: 200,
    },
    {
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <Button
            floated="left"
            onClick={openInNewTab.bind(
              this,
              `/hr/staff/view/${row.original.staff_id}`,
            )}
          >
            <Icon name="eye" />
          </Button>
        </div>
      ),
      sortable: false,
      filterable: false,
    },
  ];
  return (
    <div>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            value={searchSt.firstname}
            label={messages['firstname']}
            onChange={(e, o) => props.handleChange('firstname', o)}
          />
          <Form.Field
            control={Input}
            value={searchSt.lastname}
            label={messages['lastname']}
            onChange={(e, o) => props.handleChange('lastname', o)}
          />
          <Form.Field
            control={Input}
            value={searchSt.middlename}
            label={messages['middlename']}
            onChange={(e, o) => props.handleChange('middlename', o)}
          />
        </Form.Group>
        <Button onClick={props.submitSearch} floated="right" color="teal">
          <Icon name="checkmark" />
          {messages['search']}
        </Button>

        <Button floated="right" negative onClick={props.handleClose}>
          {' '}
          {messages['cancel']}
        </Button>
      </Form>
      <br />
      <br />
      <br />
      <ReactTable
        columns={columns}
        data={staffs}
        resolveData={data => data.map(row => row)}
        filterable
        rowsText={messages['rowsText']}
        pageText={messages['pageText']}
        ofText={messages['ofText']}
        previousText={messages['previousText']}
        nextText={messages['nextText']}
        noDataText={messages['loadingText']}
        defaultPageSize={5}
      />
    </div>
  );
};

export default SearchStaff;
