import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import ListTableUpdate from './listTableUpdate';

class ListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  updateRow(tr) {
    this.setState({ modalOpen: true, pos: tr });
  }

  render() {
    const { positions, messages } = this.props;
    const columns = [
      {
        Header: 'ID',
        id: 'position_id',
        accessor: d => d.position_id,
        width: 100,
        maxWidth: 200,
        minWidth: 100,
      },
      {
        Header: messages['name'] + ' (ru)',
        accessor: 'text',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['text'] }),
        filterAll: true,
      },
      {
        Header: messages['name'] + ' (en)',
        accessor: 'text_en',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['text_en'] }),
        filterAll: true,
      },
      {
        Header: messages['name'] + ' (tr)',
        accessor: 'text_tr',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['text_tr'] }),
        filterAll: true,
      },
      {
        Header: messages['Table.Actions'],
        Cell: props => (
          <Button
            floated="left"
            onClick={this.updateRow.bind(this, props.original)}
          >
            <Icon name="edit" />
            {messages['change']}
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
      <div>
        <div id="table_style">
          <div className="list_table_header" />
          <div>
            <ReactTable
              columns={columns}
              data={positions.currentPosition}
              resolveData={data => data.map(row => row)}
              filterable
              rowsText={messages['rowsText']}
              pageText={messages['pageText']}
              ofText={messages['ofText']}
              previousText={messages['previousText']}
              nextText={messages['nextText']}
              noDataText={messages['loadingText']}
            />
            {
              <Modal
                size="fullscreen"
                open={this.state.modalOpen}
                onClose={this.handleClose}
              >
                <Modal.Header>{messages['changePos']}</Modal.Header>
                <Modal.Content>
                  <ListTableUpdate
                    pos={this.state.pos}
                    messages={messages}
                    updatePosition={this.props.updatePosition}
                    handleClose={this.handleClose}
                  />
                </Modal.Content>
              </Modal>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ListTable;
