import React, { useState } from 'react';
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
import ReactTableWrapper from '../../../utils/ReactTableWrapper';

export default function List(props) {
  const {
    messages,
    companyOptions,
    branchOptions,
    countryList,
    dynamicObject,
    // historyDynamicObject,
    products,
    getCountryOptions,
    getCompanyOptions,
    getProductOptions,
    editSmsetct,
  } = props;

  const historyDynamicObject = {};
  const emptysm_set_ct_Edit = {
    branchId: '',
    bukrs: '',
    countryId: '',
    f1: '',
    f2: '',
    f3: '',
    f4: '',
    f5: '',
    f6: '',
    f7: '',
    id: '',
    matnr: '',
  };
  const [sm_set_ct_Edit, set_sm_set_ct_Edit] = useState({
    ...emptysm_set_ct_Edit,
  });
  const [open, setOpen] = useState(false);

  const handleEdit = (o, fieldName) => {
    set_sm_set_ct_Edit(prev => {
      let varSm_Set_Ct = { ...prev };
      switch (fieldName) {
        case 'countryId':
          varSm_Set_Ct.countryId = o.value;
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
          varSm_Set_Ct.f1 = o.value;
          break;

        case 'F2':
          varSm_Set_Ct.f2 = o.value;
          break;

        case 'F3':
          varSm_Set_Ct.f3 = o.value;
          break;

        case 'F4':
          varSm_Set_Ct.f4 = o.value;
          break;

        case 'F5':
          varSm_Set_Ct.f5 = o.value;
          break;

        case 'F6':
          varSm_Set_Ct.f6 = o.value;
          break;

        case 'F7':
          varSm_Set_Ct.f7 = o.value;
          break;

        case 'note':
          varSm_Set_Ct.matnr = o.value;
          break;

        default:
          varSm_Set_Ct[fieldName] = o.value;
      }
      return varSm_Set_Ct;
    });
  };

  const openEdit = row_data => {
    set_sm_set_ct_Edit(prop => {
      const sm_set_ct_Row = { ...prop };
      {
        sm_set_ct_Row.countryId = row_data.countryId;
        sm_set_ct_Row.bukrs = row_data.bukrs;
        sm_set_ct_Row.branchId = row_data.branchId;
        sm_set_ct_Row.f1 = row_data.f1;
        sm_set_ct_Row.f2 = row_data.f2;
        sm_set_ct_Row.f3 = row_data.f3;
        sm_set_ct_Row.f4 = row_data.f4;
        sm_set_ct_Row.f5 = row_data.f5;
        sm_set_ct_Row.f6 = row_data.f6;
        sm_set_ct_Row.f7 = row_data.f7;
        sm_set_ct_Row.matnr = row_data.f3;
        // sm_set_ct_Row.note = row_data.note;
        sm_set_ct_Row.id = row_data.id;
      }
      console.log(sm_set_ct_Row);
      return sm_set_ct_Row;
    });
    setOpen(true);
  };

  const closeEdit = () => {
    setOpen(false);
  };

  const onClickSave = () => {
    console.log('sm_set_ct_Edit', sm_set_ct_Edit);
    editSmsetct({ ...sm_set_ct_Edit });
  };

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
      accessor: 'countryId', //Name
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['countryId'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['bukrs'],
      accessor: 'bukrs', //Name
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
      accessor: 'brnchId', //Name
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['brnchId'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['TBL_H__PRODUCT'],
      accessor: 'matnr', //Name
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['matnr'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['configuration'] + 'F-1',
      accessor: 'f1',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['f1'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['configuration'] + 'F-2',
      accessor: 'f2',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['f2'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['configuration'] + 'F-3',
      accessor: 'f3',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['f3'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },
    {
      Header: messages['configuration'] + 'F-4',
      accessor: 'f4',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['f4'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },

    {
      Header: messages['configuration'] + 'F-5',
      accessor: 'f5',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['f5'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },

    {
      Header: messages['configuration'] + 'F- 6',
      accessor: 'f6',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['f6'] }),
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
      width: 150,
      maxWidth: 150,
      minWidth: 100,
    },

    {
      Header: messages['configuration'] + 'F-7',
      accessor: 'f7',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['f7'] }),
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
              openEdit(row.original);
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
          <ReactTableWrapper
            filterable
            data={dynamicObject}
            columns={columns}
            defaultPageSize={20}
            showPagination={true}
            className="-striped -highlight"
          />
        )}

        <Modal open={open}>
          <Modal.Header>
            {' '}
            <h3> Редактировать картридж</h3>{' '}
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>{messages['country']}</label>
                  <Dropdown
                    search
                    selection
                    options={getCountryOptions(countryList)}
                    defaultValue={sm_set_ct_Edit.countryId}
                    onChange={(e, o) => handleEdit(o, 'countryId')}
                  />
                  <label>{messages['bukrs']} </label>
                  <Dropdown
                    search
                    selection
                    options={getCompanyOptions(companyOptions)}
                    defaultValue={sm_set_ct_Edit.bukrs}
                    onChange={(e, o) => handleEdit(o, 'bukrs')}
                  />

                  <label>{messages['brnch']}</label>
                  <Dropdown
                    search
                    selection
                    options={
                      sm_set_ct_Edit.bukrs
                        ? branchOptions[sm_set_ct_Edit.bukrs]
                        : []
                    }
                    defaultValue={sm_set_ct_Edit.branchId}
                    onChange={(e, o) => handleEdit(o, 'brnch')}
                  />

                  <label>{messages['TBL_H__PRODUCT']}</label>
                  <Dropdown
                    search
                    selection
                    options={
                      sm_set_ct_Edit.bukrs
                        ? branchOptions[sm_set_ct_Edit.bukrs]
                        : []
                    }
                    defaultValue={sm_set_ct_Edit.products}
                    onChange={(e, o) => handleEdit(o, 'products')}
                  />
                  <Form.Field
                    required
                    control={Input}
                    label={messages['Table.Note']}
                    defaultValue={sm_set_ct_Edit.note}
                    onChange={(e, o) => handleEdit(o, 'note')}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Field
                    required
                    control={Input}
                    label={messages['configuration'] + ' F-1'}
                    defaultValue={sm_set_ct_Edit.f1}
                    onChange={(e, o) => handleEdit(o, e, 'F1')}
                  />
                  <Form.Field
                    required
                    control={Input}
                    label={messages['configuration'] + ' F-2'}
                    defaultValue={sm_set_ct_Edit.f2}
                    onChange={(e, o) => handleEdit(o, 'F2')}
                  />
                  <Form.Field
                    required
                    control={Input}
                    label={messages['configuration'] + ' F-3'}
                    defaultValue={sm_set_ct_Edit.f3}
                    onChange={(e, o) => handleEdit(o, 'F3')}
                  />
                  <Form.Field
                    required
                    control={Input}
                    label={messages['configuration'] + ' F-4'}
                    defaultValue={sm_set_ct_Edit.f4}
                    onChange={(e, o) => handleEdit(o, 'F4')}
                  />
                  <Form.Field
                    required
                    control={Input}
                    label={messages['configuration'] + ' F-5'}
                    defaultValue={sm_set_ct_Edit.f5}
                    onChange={(e, o) => handleEdit(o, 'F5')}
                  />
                  <Form.Field
                    required
                    control={Input}
                    label={messages['configuration'] + ' F-6'}
                    defaultValue={sm_set_ct_Edit.f6}
                    onChange={(e, o) => handleEdit(o, 'F6')}
                  />
                  <Form.Field
                    required
                    control={Input}
                    label={messages['configuration'] + ' F-7'}
                    defaultValue={sm_set_ct_Edit.f7}
                    onChange={(e, o) => handleEdit(o, 'F7')}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="teal" floated="right" onClick={onClickSave}>
              <Icon name="checkmark" />
              {messages['Form.Save']}
            </Button>

            <Button negative floated="right" onClick={closeEdit}>
              <Icon name="remove" />
              {messages['BTN__CANCEL']}
            </Button>
          </Modal.Actions>
          <br />
          <br />
          <br />
        </Modal>

        <Segment clearing>
          <Header as="h2" floated="left">
            {messages['edit_history']}
          </Header>
        </Segment>
        {Object.keys({}).length === 0 ? (
          <Segment textAlign="center">Нет данных</Segment>
        ) : (
          <ReactTableWrapper
            filterable
            data={historyDynamicObject}
            columns={historyColumns}
            defaultPageSize={20}
            showPagination={true}
          />
        )}
      </Container>
    </div>
  );
}
