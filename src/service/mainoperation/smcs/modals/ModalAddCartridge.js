import React from 'react';

import { Button, Icon, Modal, Header, Checkbox } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';

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
    handleApplyCartridge,
    checkedCartridge,

    onChangeCartridge,
  } = props;

  const columnsSparePart = [
    {
      Header: '',
      Cell: ({ original }) => (
        <Checkbox
          checked={original.checked}
          onClick={() => onChangeCartridge(original, 'checkedCartridge')}
        />
      ),
      filterAll: true,
      width: 50,
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
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
      filterAll: true,
    },
    {
      Header: 'В подочете',
      accessor: 'menge',
      filterAll: true,
    },
  ];

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
        <Button
          color="green"
          onClick={item => onChangeCartridge(item, 'closeModalCartridge')}
        >
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
