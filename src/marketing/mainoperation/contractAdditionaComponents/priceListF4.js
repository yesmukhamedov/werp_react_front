import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { moneyFormat } from '../../../utils/helpers';
import { getTradeIn } from '../contractAdditionaComponents/marketingConstants';

const PriceListF4 = props => {
  const {
    intl: { messages },
    priceList = [],
  } = props;

  const getColumns = () => {
    let t1columns = [];
    let t1r1c1 = {},
      t1r1c2 = {},
      t1r1c3 = {},
      t1r1c4 = {},
      t1r1c5 = {},
      t1r1c6 = {},
      t1r1c7 = {};

    t1r1c1 = {
      Header: ({ value }) => <b>{messages['waers']}</b>,
      id: 'waers',
      accessor: d => d.waers,
      width: 80,
      className: 'clickableItem',
    };
    t1r1c2 = {
      Header: ({ value }) => <b>{messages['price']}</b>,
      accessor: 'price',
      width: 160,
      className: 'clickableItem',
      Cell: obj => <span>{moneyFormat(obj.original.price)}</span>,
    };
    t1r1c3 = {
      Header: ({ value }) => <b>{messages['firstPayment']}</b>,
      accessor: 'firstPayment',
      width: 160,
      className: 'clickableItem',
      Cell: obj => <span>{moneyFormat(obj.original.firstPayment)}</span>,
    };
    t1r1c4 = {
      Header: ({ value }) => <b>{messages['remainder']}</b>,
      accessor: 'remain',
      width: 160,
      className: 'clickableItem',
      Cell: obj => <span>{moneyFormat(obj.original.remain)}</span>,
    };
    t1r1c5 = {
      Header: ({ value }) => <b>{messages['termInMonth']}</b>,
      accessor: 'month',
      width: 80,
      className: 'clickableItem',
      Cell: obj => <span>{obj.original.month}</span>,
    };
    t1r1c6 = {
      Header: ({ value }) => <b>{messages['premTermInMonth']}</b>,
      accessor: 'premDiv',
      width: 80,
      className: 'clickableItem',
      Cell: obj => <span>{obj.original.premDiv}</span>,
    };
    t1r1c7 = {
      Header: ({ value }) => <b>Trade-In</b>,
      accessor: 'tradeIn',
      width: 160,
      className: 'clickableItem',
      Cell: obj => <span>{getTradeIn(obj.original.tradeIn)}</span>,
    };

    t1columns.push(t1r1c1);
    t1columns.push(t1r1c2);
    t1columns.push(t1r1c3);
    t1columns.push(t1r1c4);
    t1columns.push(t1r1c5);
    t1columns.push(t1r1c6);
    t1columns.push(t1r1c7);

    return t1columns;
  };
  return (
    <Modal
      open={props.open}
      closeOnEscape={false}
      dimmer={'inverted'}
      onClose={() => props.onClosePriceListF4(false)}
    >
      <Modal.Header>
        <Icon name="filter" size="big" />
        {messages['priceList']}
      </Modal.Header>
      <Modal.Content>
        <ReactTable
          data={priceList}
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
                if (props.onPriceSelect) {
                  props.onPriceSelect(rowInfo.original);
                }
                if (props.onClosePriceListF4) {
                  props.onClosePriceListF4(false);
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
)(injectIntl(PriceListF4));
