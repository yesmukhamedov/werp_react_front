import React, { useState, useEffect, Fragment } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Checkbox,
  Table,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

const ColumnsModal = props => {
  const {
    intl: { messages },
    turnOnReactFetch,
    columnsForTable,
    headersForTable,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const allColumns = [
    {
      accessor: 'contractNumber',
      show: true,
    },
    {
      accessor: 'tovarSn',
      show: true,
    },
    {
      accessor: 'matnr',
      show: true,
      filterable: false,
    },
    {
      accessor: 'adate',
      show: true,
    },
    {
      accessor: 'applicantName',
      show: true,
    },
    {
      accessor: 'address',
      show: true,
    },
    {
      accessor: 'inPhoneNum',
      show: true,
      filterable: false,
    },
    {
      accessor: 'masterName',
      show: true,
      filterable: false,
    },
    {
      accessor: 'appStatusName',
      show: true,
      filterable: false,
    },
    {
      accessor: 'operatorName',
      show: true,
    },
    {
      accessor: 'appTypeName',
      show: true,
      filterable: false,
    },
    {
      accessor: 'id',
      show: true,
      filterable: false,
    },
    {
      accessor: 'serviceId',
      show: true,
      filterable: false,
    },
    {
      accessor: 'clientStory',
      show: true,
      filterable: false,
    },
  ];
  let headers = [
    {
      Header: `CN `,
    },
    {
      Header: messages['productSerialNumber'],
    },
    {
      Header: messages['TBL_H__PRODUCT'],
    },
    {
      Header: messages['Application_Date'],
    },
    {
      Header: messages['Form.Reco.RecoName'],
    },
    {
      Header: messages['Table.Address'],
    },
    {
      Header: messages['Phone'],
    },
    {
      Header: messages['Masters'],
    },
    {
      Header: messages['L__ORDER_STATUS'],
    },
    {
      Header: messages['Operator'],
    },
    {
      Header: messages['type_of_application'],
    },
    {
      Header: `№ ${messages['Applications']}`,
    },
    {
      Header: `${messages['service']} №`,
    },
    {
      Header: messages['customer_story'],
    },
  ];

  const [columns, setColumns] = useState(allColumns);

  useEffect(() => {
    const transactionCode = localStorage.getItem('smappl');
    if (transactionCode) {
      columnsForTable(JSON.parse(localStorage.getItem('smappl')));
      headersForTable(headers);
      setColumns(JSON.parse(localStorage.getItem('smappl')));
    } else {
      setColumns(allColumns);
      columnsForTable(allColumns);
      headersForTable(headers);
    }
  }, []);

  const checkColumns = e => {
    setColumns(prev => {
      let columns = [...prev];
      columns.map(el => {
        if (el.accessor === e.accessor) {
          el.show = !el.show;
        }
      });
      return columns;
    });
  };

  const onSave = () => {
    columnsForTable(columns);
    headersForTable(headers);
    setModalOpen(false);
    localStorage.setItem('smappl', JSON.stringify(columns));
  };

  const onCancel = () => {
    setModalOpen(false);
    const localColumns =
      JSON.parse(localStorage.getItem('smappl')) || allColumns;
    setColumns(localColumns);
  };

  return (
    <Fragment>
      <Modal
        trigger={
          <Button color="pink" onClick={() => setModalOpen(true)}>
            {messages['columns']}
          </Button>
        }
        open={modalOpen}
        size="small"
      >
        <Header content={messages['columns']} />
        <Modal.Content>
          <Table singleLine>
            <Table.Body>
              {columns.map((item, id) => (
                <Table.Row key={id}>
                  <Table.Cell>{headers[id].Header}</Table.Cell>
                  <Table.Cell>
                    <Checkbox
                      onChange={() => {
                        checkColumns(item);
                      }}
                      checked={item.show}
                      style={{ float: 'right' }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={onCancel}>
            <Icon name="remove" /> {messages['cancel']}
          </Button>
          <Button color="green" onClick={onSave}>
            <Icon name="checkmark" /> {messages['save']}
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default injectIntl(ColumnsModal);
