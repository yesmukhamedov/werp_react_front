import React from 'react';
import {
  Header,
  Grid,
  Segment,
  Button,
  Container,
  Dropdown,
  Form,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default function ListStaf(props) {
  const { messages, staffList } = props;
  return (
    <Segment>
      {staffList === undefined || staffList.length == 0 ? (
        ''
      ) : (
        <ReactTable
          data={staffList}
          // columns={getColumns()}
          defaultPageSize={10}
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
}
