import React, { useState, useEffect, Fragment } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Segment,
  Grid,
  Checkbox,
  Table,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ServiceRequestTable from './table';

const Columns = props => {
  const {
    intl: { messages },
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const serviceColumns = [
    {
      Header: `${messages['Task.Branch']} CN`,
      accessor: 'bukrs',
      show: true,
    },
    {
      Header: `${messages['productSerialNumber']}`,
      accessor: 'Position',
      show: true,
    },
    {
      Header: `${messages['TBL_H__PRODUCT']}`,
      accessor: 'fc',
      show: true,
    },
    {
      Header: `${messages['Application_Date']}`,
      accessor: 'bukrs',
      show: true,
    },
    {
      Header: `${messages['Form.Reco.RecoName']}`,
      accessor: 'bukrs',
      show: true,
    },
    {
      Header: `${messages['Table.Address']}`,
      accessor: 'bukrs',
      show: true,
    },
    {
      Header: `${messages['Phone']}`,
      accessor: 'bukrs',
      show: true,
    },
    {
      Header: `${messages['Masters']}`,
      accessor: 'bukrs',
      show: true,
    },
    {
      Header: `${messages['L__ORDER_STATUS']}`,
      accessor: 'bukrs',
      show: true,
    },
    {
      Header: `${messages['Operator']}`,
      accessor: 'bukrs',
      show: true,
    },
    {
      Header: `${messages['type_of_application']}`,
      accessor: 'bukrs',
      show: true,
    },
    {
      Header: `№ ${messages['Applications']}`,
      accessor: 'bukrs',
      show: true,
    },
    {
      Header: `${messages['service']} №`,
      accessor: 'bukrs',
      show: true,
    },
    {
      Header: `${messages['customer_story']}`,
      accessor: 'bukrs',
      show: true,
    },
  ];

  const [columns, setColumns] = useState(serviceColumns);

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
    console.log('cols', columns);
  };

  return (
    <Fragment>
      <Modal
        trigger={
          <Button color="teal" onClick={() => setModalOpen(true)}>
            {messages['columns']}
          </Button>
        }
        open={modalOpen}
      >
        <Header content={messages['columns']} />
        <Modal.Content>
          <Segment>
            {serviceColumns.map(item => (
              <Table.Row>
                <Table.Cell>{item.Header}</Table.Cell>
                <Table.Cell>
                  <Checkbox
                    onChange={() => {
                      checkColumns(item);
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setModalOpen(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green">
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <ServiceRequestTable columnsName={columns} />
    </Fragment>
  );
};

export default injectIntl(Columns);
