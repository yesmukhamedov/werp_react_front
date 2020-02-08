import React, { useState, useEffect } from 'react';

import {
  Segment,
  Grid,
  Form,
  Button,
  Table,
  Input,
  Icon,
  Divider,
  Dropdown,
  Modal,
  Header,
  Checkbox,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import checkedSparePart from '../tabs/TabSmcsWithoutRequest';

const ModalAddCartridge = props => {
  const {
    intl: { messages },
  } = props;

  const {
    data = [],
    modalOpen = false,
    modalClose = false,
    handleApplyCartridge,
    onRowClick = null,
    checked = [],
    checkedCartridge,
  } = props;

  const columnsSparePart = [
    {
      Header: '',
      Cell: ({ original }) => (
        <Checkbox
          checked={original.checked}
          onClick={() => checkedCartridge(original)}
        />
      ),
      filterAll: true,
      width: 30,
      maxWidth: 50,
      minWidth: 20,
    },
    {
      Header: 'Код',
      accessor: 'matnrCode',
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Название',
      accessor: 'matnrName',
      filterAll: true,
      width: 500,
      maxWidth: 500,
      minWidth: 300,
    },
    {
      Header: 'Цена',
      accessor: 'matnrPrice',
      filterAll: true,
      width: 100,
      maxWidth: 150,
      minWidth: 50,
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
      filterAll: true,
      width: 70,
      maxWidth: 100,
      minWidth: 50,
    },
    {
      Header: 'В подочете',
      accessor: 'menge',
      filterAll: true,
      width: 100,
      maxWidth: 150,
      minWidth: 100,
    },
  ];
  const closeModal = () => {
    modalOpen = false;
  };
  return (
    <Modal open={modalOpen} closeOnDimmerClick dimmer={'blurring'}>
      <Header content="Добавление запчастей" />
      <Modal.Content>
        <ReactTableWrapper
          data={data}
          columns={columnsSparePart}
          previousText={messages['Table.Previous']}
          nextText={messages['Table.Next']}
          showPagination={true}
          className="-striped -highlight"
          defaultPageSize={10}
          pageSizeOptions={[10, 20, 30, 40]}
          loadingText={messages['Table.Next']}
          noDataText={messages['Table.NoData']}
          rowsText={messages['Table.Rows']}
          pageText={messages['Table.Page']}
          ofText={messages['Table.Of']}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={handleApplyCartridge}>
          <Icon name="checkmark" /> Применить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { checkedSparePart })(
  injectIntl(ModalAddCartridge),
);
