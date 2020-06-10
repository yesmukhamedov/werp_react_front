import React, { useState } from 'react';

import { Button, Icon, Modal, Header, Checkbox } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const ModalAddServicePacket = props => {
  const {
    intl: { messages },
  } = props;

  const { data = [], onChangeServicePackage, modalStatus } = props;

  const columnsServicePacket = [
    {
      Header: '',
      Cell: ({ original }) => (
        <Checkbox
          checked={original.checked}
          onClick={() =>
            onChangeServicePackage(original, 'checkedServicePackage')
          }
        />
      ),
      width: 50,
    },
    {
      Header: 'Название',
      accessor: 'matnrName',
      filterAll: true,
      width: 500,
    },
    {
      Header: 'Цена',
      accessor: 'sum',
      filterAll: true,
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
      filterAll: true,
    },
  ];

  const [close, setClose] = useState(true);
  return (
    <Modal open={modalStatus} closeOnDimmerClick={false} dimmer={'blurring'}>
      <Header content="Добавить сервис пакет" />
      <Modal.Content>
        <ReactTableWrapper
          data={data}
          columns={columnsServicePacket}
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
          onClick={item =>
            onChangeServicePackage(item, 'closeOpenServicePackage')
          }
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

export default connect(mapStateToProps, {})(injectIntl(ModalAddServicePacket));
