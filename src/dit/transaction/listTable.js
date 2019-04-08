import React, { Component } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import UpdateTransaction from './updateTransaction';

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
    this.setState({ modalOpen: true, transaction: tr });
  }

  render() {
    const { transactions, messages } = this.props;
    const columns = [
      {
        Header: 'ID',
        id: 'transaction_id',
        accessor: d => d.transaction_id,
        width: 100,
        maxWidth: 200,
        minWidth: 100,
      },
      {
        Header: messages['code'],
        accessor: 'transaction_code',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['transaction_code'] }),
        filterAll: true,
      },
      {
        Header: messages['L__TITLE'] + ' (ru)',
        accessor: 'name_ru',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['name_ru'] }),
        filterAll: true,
      },
      {
        Header: messages['L__TITLE'] + ' (en)',
        accessor: 'name_en',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['name_en'] }),
        filterAll: true,
      },
      {
        Header: messages['L__TITLE'] + ' (tr)',
        accessor: 'name_tr',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['name_tr'] }),
        filterAll: true,
      },
      {
        Cell: props => (
          <Button
            floated="left"
            onClick={this.updateRow.bind(this, props.original)}
          >
            <Icon name="edit" /> {messages['change']}
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
              data={transactions.currentTransactions}
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
                size="large"
                open={this.state.modalOpen}
                onClose={this.handleClose}
              >
                <Modal.Content>
                  <UpdateTransaction
                    transaction={this.state.transaction}
                    {...this.props}
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
