import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon, Loader, Dimmer } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter, { rankings } from 'match-sorter';

const TradeInMatnrListF4 = props => {
  const {
    intl: { messages },
    tradeInMatnrList = [],
    isLoadingTradeInMatnrList = false,
  } = props;

  const getColumns = () => {
    let t1columns = [];
    let t1r1c1 = {},
      t1r1c2 = {};

    t1r1c1 = {
      Header: ({ value }) => <b>{messages['name']}</b>,
      id: 'matnrName',
      accessor: d => d.matnrName,
      width: 200,
      className: 'clickableItem',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'matnrName' }],
        }),
      filterAll: true,
    };
    t1r1c2 = {
      Header: ({ value }) => <b>{messages['productSerialNumber']}</b>,
      accessor: 'tovarSerial',
      width: 120,
      className: 'clickableItem',
      Cell: obj => <span>{obj.original.tovarSerial}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'tovarSerial' }],
        }),
      filterAll: true,
    };

    t1columns.push(t1r1c1);
    t1columns.push(t1r1c2);

    return t1columns;
  };
  return (
    <Modal
      open={props.open}
      closeOnEscape={false}
      dimmer={'inverted'}
      onClose={() => props.onCloseTradeInMatnrF4(false)}
    >
      <Modal.Header>
        <Icon name="filter" size="big" />
        {messages['goodsInStock']}
      </Modal.Header>

      <Modal.Content>
        <Dimmer active={isLoadingTradeInMatnrList}>
          <Loader />
        </Dimmer>
        <ReactTable
          filterable
          data={tradeInMatnrList}
          columns={getColumns()}
          defaultPageSize={10}
          showPagination
          className="-striped -highlight"
          loadingText={messages['loadingText']}
          noDataText={messages['noDataText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
          showPageSizeOptions={false}
          getTrProps={(state, rowInfo, column) => {
            return {
              onClick: (e, handleOriginal) => {
                if (props.onTradeInMatnrSelect) {
                  props.onTradeInMatnrSelect(rowInfo.original);
                }
                if (props.onCloseTradeInMatnrF4) {
                  props.onCloseTradeInMatnrF4(false);
                }
              },
            };
          }}
        />
      </Modal.Content>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {},
)(injectIntl(TradeInMatnrListF4));
