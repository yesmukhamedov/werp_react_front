import React from 'react';

import { Button, Icon, Modal, Header, Checkbox } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import checkedSparePart from '../tabs/TabSmcsWithoutRequest';

const ModalAddSparePart = props => {
  const {
    intl: { messages },
  } = props;

  const {
    data = [],
    modalOpen = false,
    handleApplySparePart,
    checkedSparePart,
  } = props;

  const columnsSparePart = [
    {
      Header: '',
      Cell: ({ original }) => (
        <Checkbox
          checked={original.checked}
          onClick={() => checkedSparePart(original)}
        />
      ),
      filterAll: true,
      width: 50,
    },
    {
      Header: 'Название',
      accessor: 'matnrName',
      width: 500,
    },
    {
      Header: 'Цена',
      accessor: 'matnrPrice',
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
      filterAll: true,
    },
    {
      Header: 'В подочете',
      accessor: 'menge',
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
        <Button color="green" onClick={handleApplySparePart}>
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
  injectIntl(ModalAddSparePart),
);
