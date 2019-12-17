import React, { useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import {
  Header,
  Icon,
  Segment,
  Button,
  Container,
  Modal,
  Form,
  Dropdown,
  Input,
} from 'semantic-ui-react';
import 'react-table/react-table.css';

export default function List(props) {
  const {
    messages,
    companyOptions,
    branchOptions,
    countryList,
    products,
    getCountryOptions,
    getCompanyOptions,
    getProductOptions,
    editSmsetct,
  } = props; //+ dynamicObject

  const emptysm_set_ct_Edit = {
    country: '',
    bukrs: '',
    branchId: '',
    products: '',
    configuration_F1: '',
    configuration_F2: '',
    configuration_F3: '',
    configuration_F4: '',
    configuration_F5: '',
    configuration_F6: '',
    configuration_F7: '',
    note: '',
  };
  const [sm_set_ct_Edit, set_sm_set_ct_Edit] = useState({
    ...emptysm_set_ct_Edit,
  });
  const [open, setOpen] = useState(false);

  const onEditTable = (o, fieldName) => {
    set_sm_set_ct_Edit(prev => {
      let varSm_Set_Ct = { ...prev };
      switch (fieldName) {
        case 'countryId':
          varSm_Set_Ct.country = o.value;
          break;

        case 'bukrs':
          varSm_Set_Ct.bukrs = o.value;
          break;

        case 'brnch':
          varSm_Set_Ct.branchId = o.value;
          break;

        case 'products':
          varSm_Set_Ct.products = o.value;
          break;

        case 'F1':
          varSm_Set_Ct.configureF1 = o.value;
          break;

        case 'F2':
          varSm_Set_Ct.configureF2 = o.value;
          break;

        case 'F3':
          varSm_Set_Ct.configureF3 = o.value;
          break;

        case 'F4':
          varSm_Set_Ct.configureF4 = o.value;
          break;

        case 'F5':
          varSm_Set_Ct.configureF5 = o.value;
          break;

        case 'F6':
          varSm_Set_Ct.configureF6 = o.value;
          break;

        case 'F7':
          varSm_Set_Ct.configureF7 = o.value;
          break;

        case 'note':
          varSm_Set_Ct.note = o.value;
          break;

        default:
          varSm_Set_Ct[fieldName] = o.value;
      }
      return varSm_Set_Ct;
    });
  };

  const onOpenEdit = row_data => {
    set_sm_set_ct_Edit(prop => {
      const sm_set_ct_Row = { ...prop };
      {
        sm_set_ct_Row.configuration_F1 = row_data.configuration_F1;
        sm_set_ct_Row.configuration_F2 = row_data.configuration_F2;
        sm_set_ct_Row.configuration_F3 = row_data.configuration_F3;
        sm_set_ct_Row.configuration_F4 = row_data.configuration_F4;
        sm_set_ct_Row.configuration_F5 = row_data.configuration_F5;
        sm_set_ct_Row.configuration_F6 = row_data.configuration_F6;
        sm_set_ct_Row.configuration_F7 = row_data.configuration_F7;
        sm_set_ct_Row.note = row_data.note;
      }
      return sm_set_ct_Row;
    });
    setOpen(true);
  };

  const onCloseEdit = () => {
    setOpen(false);
  };

  let dynamicObject = [
    {
      id: '1',
      configuration_F1: 'F1',
      configuration_F7: 'F1',
      configuration_F6: 'F6',
      configuration_F5: 'F1',
      configuration_F2: 'F1',
      configuration_F3: 'F1',
      configuration_F4: 'F1',
    },

    {
      id: '2',
      configuration_F1: 'F1',
      configuration_F7: 'F7',
      configuration_F6: 'F1',
      configuration_F5: 'F1',
      configuration_F2: 'F1',
      configuration_F3: 'F1',
      configuration_F4: 'F1',
    },

    {
      id: '3',
      configuration_F1: 'F1',
      configuration_F7: 'F1',
      configuration_F6: 'F6',
      configuration_F5: 'F5',
      configuration_F2: 'F1',
      configuration_F3: 'F1',
      configuration_F4: 'F1',
    },
    {
      id: '4',
      configuration_F1: 'F1',
      configuration_F7: 'F1',
      configuration_F6: 'F1',
      configuration_F5: 'F1',
      configuration_F2: 'F1',
      configuration_F3: 'F1',
      configuration_F4: 'F4',
    },

    {
      id: '1',
      configuration_F1: 'F1',
      configuration_F7: 'F1',
      configuration_F6: 'F1',
      configuration_F5: 'F1',
      configuration_F2: 'F2',
      configuration_F3: 'F1',
      configuration_F4: 'F1',
    },

    {
      id: '1',
      configuration_F1: 'F1',
      configuration_F7: 'F1',
      configuration_F6: 'F1',
      configuration_F5: 'F1',
      configuration_F2: 'F1',
      configuration_F3: 'F3',
      configuration_F4: 'F1',
    },

    {
      id: '1',
      configuration_F1: 'F1',
      configuration_F7: 'F11',
      configuration_F6: 'F1',
      configuration_F5: 'F1',
      configuration_F2: 'F1',
      configuration_F3: 'F1',
      configuration_F4: 'F1',
    },
  ];

  let historyDynamicObject = [
    {
      id: '1',
      date: '11.11.2011',
      operationType: 'Добавление',
      brnch: 'Алматы',
      previous: '11',
      current: 'F1',
      configuration: 'F1',
      note: 'F1',
      changed_by_employee: 'Имя Фомилия',
    },

    {
      id: '2',
      date: '11.11.2011',
      operationType: 'Добавление',
      brnch: 'Алматы',
      previous: '11',
      current: 'F1',
      configuration: 'F1',
      note: 'F1',
      changed_by_employee: 'Имя Фомилия',
    },

    {
      id: '3',
      date: '11.11.2011',
      operationType: 'Добавление',
      brnch: 'Алматы',
      previous: '11',
      current: 'F1',
      configuration: 'F1',
      note: 'F1',
      changed_by_employee: 'Имя Фомилия',
    },
  ];

  let columns = [
    {
      Header: 'ID',
      accessor: 'id',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['id'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['country'],
      accessor: 'country',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['country'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['bukrs'],
      accessor: 'bukrs',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['bukrs'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['brnch'],
      accessor: 'brnch',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['brnch'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['TBL_H__PRODUCT'],
      accessor: 'product',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['product'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['configuration'] + 'F-1',
      accessor: 'configuration_F1',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['configuration_F1'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['configuration'] + 'F-2',
      accessor: 'configuration_F2',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['configuration_F2'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['configuration'] + 'F-3',
      accessor: 'configuration_F3',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['configuration_F3'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['configuration'] + 'F-4',
      accessor: 'configuration_F4',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['configuration_F4'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },

    {
      Header: messages['configuration'] + 'F-5',
      accessor: 'configuration_F5',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['configuration_F5'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },

    {
      Header: messages['configuration'] + 'F- 6',
      accessor: 'configuration_F6',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['configuration_F6'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },

    {
      Header: messages['configuration'] + 'F-7',
      accessor: 'configuration_F7',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['configuration_F7'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },

    {
      Header: messages['BTN__EDIT'],
      Cell: row => (
        <div style={{ textAlign: 'center' }}>
          <Button
            icon
            onClick={() => {
              onOpenEdit(row.original);
            }}
          >
            <Icon name="edit" size="large" color="teal" />
          </Button>
        </div>
      ),
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
  ];

  let historyColumns = [
    {
      Header: 'ID',
      accessor: 'id',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['recommenderId'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      width: 200,
      maxWidth: 250,
      minWidth: 100,
    },

    {
      Header: messages['Form.Date'],
      accessor: 'date',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['Form.Date'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      width: 200,
      maxWidth: 250,
      minWidth: 100,
    },

    {
      Header: messages['operationType'],
      accessor: 'operationType',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['operationType'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      width: 200,
      maxWidth: 250,
      minWidth: 100,
    },

    {
      Header: messages['brnch'],
      accessor: 'brnch',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['bukrs'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 200,
      maxWidth: 250,
      minWidth: 100,
    },

    {
      Header: messages['Table.Previous'],
      accessor: 'previous',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['previous'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      width: 200,
      maxWidth: 250,
      minWidth: 100,
    },

    {
      Header: messages['current'],
      accessor: 'current',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['current'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      width: 200,
      maxWidth: 250,
      minWidth: 100,
    },
    {
      Header: messages['configuration'],
      accessor: 'configuration',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['configuration'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      width: 200,
      maxWidth: 250,
      minWidth: 100,
    },

    {
      Header: messages['Table.Note'],
      accessor: 'note',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['note'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      width: 200,
      maxWidth: 250,
      minWidth: 100,
    },

    {
      Header: messages['changed_by_employee'],
      accessor: 'changed_by_employee',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['bukrs'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
      width: 200,
      maxWidth: 250,
      minWidth: 100,
    },
  ];

  return (
    <div>
      <Container fluid style={{ marginTop: '2em' }}>
        {Object.keys(dynamicObject).length === 0 ? (
          <Segment textAlign="center">Нет данных</Segment>
        ) : (
          <ReactTable
            filterable
            columns={columns}
            data={dynamicObject}
            resolveData={data => data.map(row => row)}
            rowsText={messages['rowsText']}
            pageText={messages['pageText']}
            ofText={messages['ofText']}
            previousText={messages['previousText']}
            nextText={messages['nextText']}
            noDataText={messages['loadingText']}
            className="-striped -highlight"
          />
        )}

        <Segment clearing>
          <Header as="h2" floated="left">
            {' '}
            {messages['edit_history']}{' '}
          </Header>
        </Segment>
        <ReactTable
          filterable
          columns={historyColumns}
          data={historyDynamicObject}
          resolveData={data => data.map(row => row)}
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          noDataText={messages['loadingText']}
          className="-striped -highlight"
        />

        <Segment clearing>
          <Modal open={open}>
            <Modal.Header>
              <Segment size="huge" inverted color="teal" textAlign="center">
                {' '}
                Редактировать картридж{' '}
              </Segment>
            </Modal.Header>
            <Modal.Content>
              <Segment>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>{messages['country']}</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={getCountryOptions(countryList)}
                        defaultValue={sm_set_ct_Edit.country}
                        onChange={(e, o) => onEditTable(o, 'countryId')}
                      />
                    </Form.Field>

                    <Form.Field>
                      <label>{messages['bukrs']} </label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={getCompanyOptions(companyOptions)}
                        defaultValue={sm_set_ct_Edit.bukrs}
                        onChange={(e, o) => onEditTable(o, 'bukrs')}
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>{messages['brnch']}</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={
                          sm_set_ct_Edit.bukrs
                            ? branchOptions[sm_set_ct_Edit.bukrs]
                            : []
                        }
                        defaultValue={sm_set_ct_Edit.branchId}
                        onChange={(e, o) => onEditTable(o, 'brnch')}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>{messages['TBL_H__PRODUCT']}</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={
                          sm_set_ct_Edit.bukrs
                            ? branchOptions[sm_set_ct_Edit.bukrs]
                            : []
                        }
                        defaultValue={sm_set_ct_Edit.products}
                        onChange={(e, o) => onEditTable(o, 'products')}
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field
                      control={Input}
                      label={messages['configuration'] + ' F-1'}
                      defaultValue={sm_set_ct_Edit.configuration_F1}
                      onChange={(e, o) => onEditTable(o, 'F1')}
                    />
                    <Form.Field
                      control={Input}
                      label={messages['configuration'] + ' F-2'}
                      defaultValue={sm_set_ct_Edit.configuration_F2}
                      onChange={(e, o) => onEditTable(o, 'F2')}
                    />
                    <Form.Field
                      control={Input}
                      label={messages['configuration'] + ' F-3'}
                      defaultValue={sm_set_ct_Edit.configuration_F3}
                      onChange={(e, o) => onEditTable(o, 'F3')}
                    />
                    <Form.Field
                      control={Input}
                      label={messages['configuration'] + ' F-4'}
                      defaultValue={sm_set_ct_Edit.configuration_F4}
                      onChange={(e, o) => onEditTable(o, 'F4')}
                    />
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field
                      control={Input}
                      label={messages['configuration'] + ' F-5'}
                      defaultValue={sm_set_ct_Edit.configuration_F5}
                      onChange={(e, o) => onEditTable(o, 'F5')}
                    />
                    <Form.Field
                      control={Input}
                      label={messages['configuration'] + ' F-6'}
                      defaultValue={sm_set_ct_Edit.configuration_F6}
                      onChange={(e, o) => onEditTable(o, 'F6')}
                    />
                    <Form.Field
                      control={Input}
                      label={messages['configuration'] + ' F-7'}
                      defaultValue={sm_set_ct_Edit.configuration_F7}
                      onChange={(e, o) => onEditTable(o, 'F7')}
                    />
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field
                      control={Input}
                      label={messages['Table.Note']}
                      defaultValue={sm_set_ct_Edit.note}
                      onChange={(e, o) => onEditTable(o, 'note')}
                    />
                  </Form.Group>
                </Form>
              </Segment>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="teal"
                floated="right"
                onClick={() => {
                  editSmsetct();
                }}
              >
                <Icon name="checkmark" />
                {messages['Form.Save']}
              </Button>

              <Button negative floated="right" onClick={onCloseEdit}>
                <Icon name="remove" />
                {messages['BTN__CANCEL']}
              </Button>
            </Modal.Actions>
            <br />
            <br />
            <br />
          </Modal>
        </Segment>
      </Container>
    </div>
  );
}
