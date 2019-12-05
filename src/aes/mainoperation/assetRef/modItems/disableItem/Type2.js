import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';

export default function Type2(props) {
  const selType2 = item => {
    props.selType2(item);
    props.handleClose();
  };
  const { messages } = props;
  const columns = [
    {
      Header: messages['nomination'] + ' & ' + messages['code'],
      accessor: 'text',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['text'] }),
      filterAll: true,
    },
    {
      Cell: props => {
        return (
          <Button
            floated="left"
            style={{ backgroundColor: '#FF8800', color: 'black' }}
            onClick={selType2.bind(this, props.original)}
          >
            <Icon name="edit" />
            {messages['stopAction']}
          </Button>
        );
      },

      sortable: false,
      filterable: false,
    },
  ];
  return (
    <div>
      <ReactTable
        columns={columns}
        data={props.listType2}
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
