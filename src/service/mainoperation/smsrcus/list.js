//Excuse me for hard code   :-)  !
//Excuse me for hard code   :-O  !
//Excuse me for hard code   :-D  !

import React, { useState, useEffect } from 'react';
import 'react-table/react-table.css';
import DataTable from './table';
import { Checkbox, Icon, Button, Table, Modal } from 'semantic-ui-react';
const List = props => {
  //When first login and just login and when refresh page( onClick F5 )
  useEffect(() => {
    const tableColumns = localStorage.getItem(localStorage.username) || columns;
    tableColumns.length === columns.length
      ? setColumnsName(tableColumns)
      : setColumnsName(JSON.parse(tableColumns));
  }, []);
  const {
    messages,
    dynamicObject,
    fetchSmsrcus,
    turnOnReactFetch,
    searchParams,
  } = props;

  //When first login
  let allColumns = [
    {
      id: 0,
      accessor: 'branchName',
      show: true,
    },
    {
      id: 1,
      accessor: 'contractNumber',
      show: true,
    },
    { id: 2, accessor: 'tovarSerial', show: true },
    {
      id: 3,
      accessor: 'contractDate',
      show: true,
    },
    {
      id: 4,
      accessor: 'contractStatusName',
      show: true,
    },
    {
      id: 5,
      accessor: 'customerName',
      show: true,
    },
    {
      id: 6,
      accessor: 'iinBin',
      show: true,
    },
    {
      id: 7,
      accessor: 'fullAddress',
      show: true,
    },
    {
      id: 8,
      accessor: 'fullPhone',
      show: true,
    },
    {
      id: 9,
      accessor: 'customerStory',
      show: true,
    },
  ];

  let headersName = [
    {
      id: 0,
      Header: messages['brnch'],
    },
    {
      id: 1,
      Header: 'CN',
    },
    {
      id: 2,
      Header: messages['factory_number'],
    },
    {
      id: 3,
      Header: messages['Table.Date'],
    },
    {
      id: 4,
      Header: messages['financial_status'],
    },
    {
      id: 5,
      Header: messages['full_name_of_client'],
    },
    {
      id: 6,
      Header: messages['customer_key'],
    },
    {
      id: 7,
      Header: messages['address'],
    },
    {
      id: 8,
      Header: messages['telephone'],
    },
    {
      id: 9,
      Header: messages['customer_story'],
    },
  ];

  const columns =
    JSON.parse(localStorage.getItem(localStorage.username)) || allColumns;

  const [open, setOpen] = useState(false);

  const [columnsName, setColumnsName] = useState(columns);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleSave = () => {
    handleOpen();
    localStorage.setItem(localStorage.username, JSON.stringify(columnsName));
  };

  const handleClose = () => {
    handleOpen();
    setColumnsName(columns);
  };
  const tableRows = () => {
    let rows = columnsName.map(e => {
      return (
        <Table.Row key={e.id}>
          <Table.Cell>{headersName[e.id].Header}</Table.Cell>
          <Table.Cell>
            <Checkbox
              checked={e.show}
              onChange={() => {
                checkColumns(e);
              }}
            />{' '}
          </Table.Cell>
        </Table.Row>
      );
    });
    return rows;
  };

  const checkColumns = e => {
    setColumnsName(prev => {
      let columns = [...prev];
      columns.map(el => {
        if (el.accessor === e.accessor) {
          el.show = !el.show;
        }
      });
      return columns;
    });
  };
  return (
    <div>
      <b>{messages['columns']}</b> <br />
      <Button color="blue" onClick={handleOpen} icon labelPosition="left">
        <Icon name="checkmark box" />
        {messages['choose_columns']}
      </Button>
      <Modal size="mini" open={open}>
        <Modal.Header align="center">
          {' '}
          {messages['choose_columns']}{' '}
        </Modal.Header>
        <Modal.Content>
          <Table singleLine>
            <Table.Body>{tableRows()}</Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Actions>
          <p align="center">
            <Button
              negative
              onClick={handleClose}
              content={messages['BTN__CANCEL']}
            />
            <Button positive content="OK" onClick={handleSave} />
          </p>
        </Modal.Actions>
      </Modal>
      <DataTable
        columnsName={columnsName}
        messages={messages}
        dynamicObject={dynamicObject}
        fetchSmsrcus={fetchSmsrcus}
        turnOnReactFetch={turnOnReactFetch}
        searchParams={searchParams}
        headersName={headersName}
      />
    </div>
  );
};

export default List;
