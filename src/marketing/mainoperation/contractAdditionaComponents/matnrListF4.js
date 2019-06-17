import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon, Loader, Dimmer } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter, { rankings } from 'match-sorter';
import { LinkToMatnrHistory } from '../../../utils/outlink';

const MatnrListF4 = props => {
  const {
    intl: { messages },
    matnrList = [],
    isLoadingMatnrList = false,
  } = props;

  const getColumns = () => {
    let t1columns = [];
    let t1r1c1 = {},
      t1r1c2 = {},
      t1r1c3 = {},
      t1r1c4 = {};

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
    t1r1c3 = {
      Header: ({ value }) => <b>{messages['employeesOnAccount']}</b>,
      accessor: 'staffFio',
      width: 240,
      className: 'clickableItem',
      Cell: obj => <span>{obj.original.staffFio}</span>,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'staffFio' }],
        }),
      filterAll: true,
    };
    t1r1c4 = {
      Header: ({ value }) => <b>{messages['extraInfo']}</b>,
      accessor: 'matnrListId',
      width: 120,
      Cell: obj => (
        <span>
          <LinkToMatnrHistory
            matnrListId={obj.original.matnrListId}
            viewText={messages['view']}
          />{' '}
        </span>
      ),
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, {
          keys: [{ threshold: rankings.CONTAINS, key: 'matnrListId' }],
        }),
      filterAll: true,
    };

    t1columns.push(t1r1c1);
    t1columns.push(t1r1c2);
    t1columns.push(t1r1c3);
    t1columns.push(t1r1c4);

    return t1columns;
  };
  return (
    <Modal
      open={props.open}
      closeOnEscape={false}
      dimmer={'inverted'}
      onClose={() => props.onCloseMatnrF4(false)}
    >
      <Modal.Header>
        <Icon name="filter" size="big" />
        {messages['goodsInStock']}
      </Modal.Header>

      <Modal.Content>
        <Dimmer active={isLoadingMatnrList}>
          <Loader />
        </Dimmer>
        <ReactTable
          filterable
          data={matnrList}
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
                if (props.onMatnrSelect) {
                  props.onMatnrSelect(rowInfo.original);
                }
                if (props.onCloseMatnrF4) {
                  props.onCloseMatnrF4(false);
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
)(injectIntl(MatnrListF4));
