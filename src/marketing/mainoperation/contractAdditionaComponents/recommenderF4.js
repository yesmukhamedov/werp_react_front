import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Modal, Table, Button, Icon, Input } from 'semantic-ui-react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { handleFocus, moneyFormat } from '../../../utils/helpers';
import {
  fetchDynObjMarketing,
  changeDynObjMarketing,
} from '../../marketingAction';

const RecommenderF4 = props => {
  const [contractNumberSearch, setContractNumberSearch] = useState('');
  const [isLoadingRecommenderList, setIsLoadingRecommenderList] = useState(
    false,
  );

  const {
    bukrs = '',
    tcode = '',
    recommenderList = [],
    intl: { messages },
  } = props;

  const onSearchRecommender = () => {
    props.changeDynObjMarketing({ recommenderList: [] });
    props.fetchDynObjMarketing(
      'marketing/contract/recommenderF4/fetch_recommender_list',
      { bukrs, tcode, contractNumber: contractNumberSearch },
      bool => setIsLoadingRecommenderList(bool),
    );
  };

  const getColumns = () => {
    let t1columns = [];
    let t1r1c1 = {},
      t1r1c2 = {},
      t1r1c3 = {},
      t1r1c4 = {},
      t1r1c5 = {},
      t1r1c6 = {},
      t1r1c7 = {},
      t1r1c8 = {};

    t1r1c1 = {
      Header: ({ value }) => <b>{messages['snNum']}</b>,
      id: 'contractNumber',
      accessor: d => d.contractNumber,
      width: 80,
      className: 'clickableItem',
    };
    t1r1c2 = {
      Header: ({ value }) => <b>{messages['brnch']}</b>,
      id: 'branchName',
      accessor: d => d.branchName,
      width: 140,
      className: 'clickableItem',
    };
    t1r1c3 = {
      Header: ({ value }) => <b>{messages['contractDate']}</b>,
      id: 'contractDate',
      accessor: d => d.contractDate,
      width: 140,
      className: 'clickableItem',
    };
    t1r1c4 = {
      Header: ({ value }) => <b>{messages['contractType']}</b>,
      id: 'contractTypeName',
      accessor: d => d.contractTypeName,
      width: 160,
      className: 'clickableItem',
    };
    t1r1c5 = {
      Header: ({ value }) => <b>{messages['client']}</b>,
      id: 'customerName',
      accessor: d => d.customerName,
      width: 220,
      className: 'clickableItem',
    };
    t1r1c6 = {
      Header: ({ value }) => <b>{messages['waers']}</b>,
      id: 'waers',
      accessor: d => d.waers,
      width: 80,
      className: 'clickableItem',
    };

    t1r1c7 = {
      Header: ({ value }) => <b>{messages['price']}</b>,
      accessor: 'price',
      width: 160,
      className: 'clickableItem',
      Cell: obj => <span>{moneyFormat(obj.original.price)}</span>,
    };
    t1r1c8 = {
      Header: ({ value }) => <b>{messages['paid']}</b>,
      accessor: 'paid',
      width: 160,
      className: 'clickableItem',
      Cell: obj => <span>{moneyFormat(obj.original.price)}</span>,
    };

    t1columns.push(t1r1c1);
    t1columns.push(t1r1c2);
    t1columns.push(t1r1c3);
    t1columns.push(t1r1c4);
    t1columns.push(t1r1c5);
    t1columns.push(t1r1c6);
    t1columns.push(t1r1c7);
    t1columns.push(t1r1c8);

    return t1columns;
  };
  return (
    <Modal
      open={props.open}
      closeOnEscape={false}
      dimmer={'inverted'}
      onClose={() => props.onCloseRecommenderListF4(false)}
    >
      <Modal.Header>
        <Icon name="filter" size="big" />
        {messages['recommender']}
      </Modal.Header>
      <Modal.Content>
        <Table collapsing className="borderLess">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Input
                  value={contractNumberSearch}
                  maxLength="13"
                  placeholder={messages['snNum']}
                  onFocus={handleFocus}
                  onChange={(e, { value }) => setContractNumberSearch(value)}
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  loading={isLoadingRecommenderList}
                  onClick={() => onSearchRecommender(contractNumberSearch)}
                >
                  <Icon name="search" size="large" /> {messages['search']}
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <ReactTable
          data={recommenderList}
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
                if (props.onRecommenderSelect) {
                  props.onRecommenderSelect(rowInfo.original);
                }
                if (props.onCloseRecommenderListF4) {
                  props.onCloseRecommenderListF4(false);
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
  // console.log(state,'state')
  return {
    recommenderList: state.marketing.dynamicObject.recommenderList,
  };
}

export default connect(
  mapStateToProps,
  { fetchDynObjMarketing, changeDynObjMarketing },
)(injectIntl(RecommenderF4));
