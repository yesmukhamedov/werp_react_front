import React, { useState } from 'react';
import 'react-table/react-table.css';
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
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
export default function List(props) {
  const {
    messages,
    companyOptions,
    branchOptions,
    countryList,
    dynamicObject,
    historyDynamicObject,
    getCountryOptions,
    getProductOptions,
    productList,
    fetchSmsetct,
    editSmsetct,
    searchParams,
  } = props;
  const emptySmSetCtEdit = {
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
    description: '',
  };

  const [sm_set_ct_Edit, set_sm_set_ct_Edit] = useState({
    ...emptySmSetCtEdit,
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

        case 'matnr':
          varSm_Set_Ct.matnr = o.value;
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

        case 'description':
          varSm_Set_Ct.description = o.value;
          break;

        default:
          varSm_Set_Ct[fieldName] = o.value;
      }
      return varSm_Set_Ct;
    });
  };

  const openEdit = row_data => {
    set_sm_set_ct_Edit(prop => {
      const sm_set_ct_EditRow = { ...prop };
      {
        sm_set_ct_EditRow.countryId = getCountryId(
          countryList,
          row_data.countryId,
        );
        sm_set_ct_EditRow.bukrs = getBukrsId(companyOptions, row_data.bukrs);
        sm_set_ct_EditRow.branchId = getBranchId(
          branchOptions,
          row_data.branchId,
          searchParams.bukrs,
        );
        sm_set_ct_EditRow.f1 = row_data.f1;
        sm_set_ct_EditRow.f2 = row_data.f2;
        sm_set_ct_EditRow.f3 = row_data.f3;
        sm_set_ct_EditRow.f4 = row_data.f4;
        sm_set_ct_EditRow.f5 = row_data.f5;
        sm_set_ct_EditRow.f6 = row_data.f6;
        sm_set_ct_EditRow.f7 = row_data.f7;
        sm_set_ct_EditRow.matnr = getProductId(productList, row_data.matnr);
        sm_set_ct_EditRow.description = row_data.description;
        sm_set_ct_EditRow.id = row_data.id;
      }
      return sm_set_ct_EditRow;
    });
    setOpen(true);
  };

  const closeEdit = () => {
    setOpen(false);
  };

  const onClickSave = () => {
    editSmsetct(
      { ...sm_set_ct_Edit },
      { ...searchParams.searchText },
      fetchSmsetct,
    );
  };
  //Получить ID Стран через text
  const getCountryId = (countries, countryName) => {
    countries.map(e => {
      if (countryName === e.country) countryName = e.countryId;
    });
    return countryName;
  };
  // Получить ID Компанию через text
  const getBukrsId = (bukrs, companyName) => {
    bukrs.map(e => {
      if (companyName === e.text) companyName = e.key;
    });
    return companyName;
  };
  // Получить ID Филиала через text
  const getBranchId = (branches, branchName, bukrs) => {
    branches[bukrs].map(e => {
      if (branchName === e.text) {
        branchName = e.key;
      }
    });
    return branchName;
  };
  // Получить ID Продукта через text
  const getProductId = (products, productName) => {
    if (productName !== null) {
      products.map(e => {
        if (productName === e.name.toUpperCase()) {
          productName = e.contract_type_id;
        }
      });
    }
    return productName;
  };

  let searchColumns = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['bukrs'],
      accessor: 'bukrs', //Name Ф
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['country'],
      accessor: 'countryId', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['TBL_H__PRODUCT'],
      accessor: 'matnr',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['configuration'] + ' F-1',
      accessor: 'f1',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['configuration'] + ' F-2',
      accessor: 'f2',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['configuration'] + 'F-3',
      accessor: 'f3',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['configuration'] + ' F-4',
      accessor: 'f4',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },

    {
      Header: messages['configuration'] + ' F-5',
      accessor: 'f5',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },

    {
      Header: messages['configuration'] + ' F-6',
      accessor: 'f6',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },

    {
      Header: messages['configuration'] + ' F-7',
      accessor: 'f7',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
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
    },
  ];

  let historyColumns = [
    {
      Header: '№',
      accessor: 'rev',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: 'ID',
      accessor: 'id',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['Task.Company'],
      accessor: 'bukrs',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['country'],
      accessor: 'countryId',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
    },
    {
      Header: messages['TBL_H__PRODUCT'],
      accessor: 'matnr', //Name
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      width: 150,
      filterAll: true,
    },
    {
      Header: messages['Table.Note'],
      accessor: 'description',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['Form.Date'],
      accessor: 'revsttmp',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['changed_by_employee'],
      accessor: 'fullname',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['operationType'],
      accessor: 'revType',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
  ];

  return (
    <div>
      <Container fluid style={{ marginTop: '2em' }}>
        {Object.keys(dynamicObject).length === 0 ? (
          <Segment textAlign="center">{messages['no_data']}</Segment>
        ) : (
          <ReactTableWrapper
            data={dynamicObject}
            columns={searchColumns}
            defaultPageSize={20}
            showPagination={true}
            className="-striped -highlight"
          />
        )}

        <Modal open={open}>
          <Modal.Header>
            <h3>{messages['edit_cartridge']}</h3>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Field required>
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
                    options={companyOptions || []}
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
                    options={getProductOptions(productList)}
                    defaultValue={sm_set_ct_Edit.matnr}
                    onChange={(e, o) => handleEdit(o, 'matnr')}
                  />
                  <Form.Field
                    required
                    control={Input}
                    label={messages['Table.Note']}
                    defaultValue={sm_set_ct_Edit.description}
                    onChange={(e, o) => handleEdit(o, 'description')}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Field
                    required
                    control={Input}
                    label={messages['configuration'] + ' F-1'}
                    defaultValue={sm_set_ct_Edit.f1}
                    onChange={(e, o) => handleEdit(o, 'F1')}
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
            {messages['editing_history']}
          </Header>
        </Segment>
        {Object.keys(historyDynamicObject).length === 0 ? (
          <Segment textAlign="center">{messages['no_data']}</Segment>
        ) : (
          <ReactTableWrapper
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
