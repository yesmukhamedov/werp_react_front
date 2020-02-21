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
  const allColumns = [
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
  const [columns, setColumns] = useState(allColumns);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (localStorage.getItem(username)) {
      setColumns(JSON.parse(localStorage.getItem(localStorage.username)));
    } else {
      setColumns(allColumns);
    }
  }, []);

  const checkColumns = e => {
    setColumns(prev => {
      let columns = [...prev];
      columns.map(el => {
        if (el.Header === e.Header) {
          el.show = !el.show;
        }
      });
      return columns;
    });
  };

  const onSave = () => {
    setModalOpen(false);
    localStorage.setItem(localStorage.username, JSON.stringify(columns));
  };

  const onCancel = () => {
    setModalOpen(false);
    const localColumns =
      JSON.parse(localStorage.getItem(localStorage.username)) || allColumns;
    setColumns(localColumns);
  };

  return (
    <Fragment>
      <Modal
        trigger={
          <Button color="blue" onClick={() => setModalOpen(true)}>
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
                  <Table.Cell>{item.Header}</Table.Cell>
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
      <ServiceRequestTable columnsName={columns} />
    </Fragment>
  );
};

export default injectIntl(Columns);
