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
  Label,
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
    getBranchOptions,
    validateEdit,
  } = props;

  const [errorsEdit, setErrorsEdit] = useState({});
  const [smsetctEdit, setSmsetctEdit] = useState({});
  const [oldSmsetctEdit, setOldSmsetctEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [messg, setMessg] = useState({ messgBrnch: false, messgMatnr: false });

  const openEdit = row_data => {
    setSmsetctEdit(prop => {
      let editRow = { ...prop };
      {
        editRow.countryId = getCountryId(countryList, row_data.countryId);
        editRow.bukrs = getBukrsId(companyOptions, row_data.bukrs);
        editRow.branchId = getBranchId(
          branchOptions,
          row_data.branchId,
          searchParams.bukrs,
        );
        editRow.f1 = row_data.f1;
        editRow.f2 = row_data.f2;
        editRow.f3 = row_data.f3;
        editRow.f4 = row_data.f4;
        editRow.f5 = row_data.f5;
        editRow.f6 = row_data.f6;
        editRow.f7 = row_data.f7;
        editRow.matnr = getProductId(productList, row_data.matnr);
        editRow.description = row_data.description;
        editRow.id = row_data.id;
      }
      setOldSmsetctEdit({ ...editRow });
      return editRow;
    });
    setOpen(true);
    setErrorsEdit({});
    setMessg({});
  };

  const handleEdit = (o, fieldName) => {
    setSmsetctEdit(() => {
      let vars = { ...smsetctEdit };
      let errors = { ...errorsEdit };
      let messages = {};
      switch (fieldName) {
        case 'bukrs':
          if (vars.bukrs !== o.value && vars.bukrs && vars.branchId) {
            vars.branchId = '';
            vars.matnr = '';
            errors.matnr = true;
            errors.branchId = true;
            messages.messgBrnch = messages.messgMatnr = true;
            setMessg({ ...messages });
          }
          vars.bukrs = o.value;
          errors.bukrs = o.value ? false : true;
          break;
        case 'countryId':
          if (vars.bukrs !== o.countryId && vars.countryId && vars.branchId) {
            vars.branchId = '';
            vars.matnr = '';
            errors.matnr = true;
            errors.branchId = true;
            messages.messgBrnch = messages.messgMatnr = true;
            setMessg({ ...messages });
          }
          vars.countryId = o.value;
          errors.countryId = o.value ? false : true;
          break;

        case 'brnch':
          vars.branchId = o.value;
          errors.branchId = o.value ? false : true;
          messages.messgBrnch = false;
          messages.messgMatnr = messg.messgMatnr;
          setMessg({ ...messages });
          break;

        case 'matnr':
          vars.matnr = o.value;
          errors.matnr = o.value ? false : true;
          messages.messgBrnch = messg.messgBrnch;
          messages.messgMatnr = false;
          setMessg({ ...messages });
          break;

        case 'F1':
          vars.f1 = o.value;
          errors.f1 = o.value ? false : true;
          break;

        case 'F2':
          vars.f2 = o.value;
          errors.f2 = o.value ? false : true;
          break;

        case 'F3':
          vars.f3 = o.value;
          errors.f3 = o.value ? false : true;
          break;

        case 'F4':
          vars.f4 = o.value;
          errors.f4 = o.value ? false : true;
          break;

        case 'F5':
          vars.f5 = o.value;
          errors.f5 = o.value ? false : true;
          break;

        case 'F6':
          vars.f6 = o.value;
          break;

        case 'F7':
          vars.f7 = o.value;
          break;

        case 'description':
          vars.description = o.value;
          break;

        default:
          vars[fieldName] = o.value;
      }
      setErrorsEdit({ ...errors });
      return vars;
    });
  };

  const closeEdit = () => {
    setOpen(false);
    setMessg({});
    setErrorsEdit({});
  };

  const onClickSave = () => {
    let errs = validateEdit(smsetctEdit);

    if (
      errs === null ||
      errs === undefined ||
      (Object.keys(errs).length === 0 &&
        JSON.stringify(oldSmsetctEdit) !== JSON.stringify(smsetctEdit))
    ) {
      editSmsetct(
        { ...smsetctEdit },
        { ...searchParams.searchText },
        fetchSmsetct,
      );
    }
    setErrorsEdit({ ...errs });
  };

  //Получить ID Стран через text
  const getCountryId = (countries, countryName) => {
    if (countries) {
      countries.map(e => {
        if (countryName === e.country) countryName = e.countryId;
      });
    }
    return countryName;
  };

  // Получить ID Компанию через text
  const getBukrsId = (bukrs, companyName) => {
    if (bukrs.length > 0) {
      bukrs.map(e => {
        if (companyName === e.text) companyName = e.key;
      });
    }
    return companyName;
  };

  // Получить ID Филиала через text
  const getBranchId = (branches, branchName, bukrs) => {
    if (branches[bukrs]) {
      branches[bukrs].map(e => {
        if (branchName === e.text) {
          branchName = e.key;
        }
      });
    }
    return branchName;
  };
  // Получить ID Продукта через text

  const getProductId = (products, productName) => {
    if (productName !== null && products) {
      products.map(e => {
        //ROBOCLEAN-114F это исключения в списке ROBOCLEAN 114F  а на базе ROBOCLEAN-114F
        if (
          productName === e.name.toUpperCase() ||
          productName === 'ROBOCLEAN-114F'
        ) {
          // ROBOCLEAN-114F не равен на ROBOCLEAN 114F
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
      Header: 'ID',
      accessor: 'id',
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
      Header: messages['operationType'],
      accessor: 'revType',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },
    {
      Header: messages['Table.Note'],
      accessor: 'description',
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterAll: true,
    },

    {
      Header: messages['changed_by_employee'],
      accessor: 'fullname',
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
                  <label>{messages['bukrs']} </label>
                  <Dropdown
                    search
                    error={errorsEdit.bukrs ? true : false}
                    selection
                    options={companyOptions || []}
                    defaultValue={smsetctEdit.bukrs}
                    onChange={(e, o) => handleEdit(o, 'bukrs')}
                  />

                  <label>{messages['country']}</label>
                  <Dropdown
                    search
                    error={errorsEdit.countryId ? true : false}
                    selection
                    options={getCountryOptions(countryList)}
                    defaultValue={smsetctEdit.countryId}
                    onChange={(e, o) => handleEdit(o, 'countryId')}
                  />

                  <label>{messages['brnch']}</label>
                  <Dropdown
                    search
                    error={errorsEdit.branchId ? true : false}
                    selection
                    options={
                      smsetctEdit.bukrs
                        ? getBranchOptions(
                            branchOptions[smsetctEdit.bukrs],
                            smsetctEdit.countryId,
                          )
                        : []
                    }
                    defaultValue={smsetctEdit.branchId}
                    onChange={(e, o) => handleEdit(o, 'brnch')}
                  />
                  {messg.messgBrnch ? (
                    <Label basic color="red" pointing>
                      {messages['enter_again']}
                    </Label>
                  ) : (
                    ''
                  )}
                  <label>{messages['TBL_H__PRODUCT']}</label>
                  <Dropdown
                    search
                    error={errorsEdit.matnr ? true : false}
                    selection
                    options={getProductOptions(
                      productList,
                      smsetctEdit.bukrs,
                      smsetctEdit.countryId,
                      smsetctEdit.branchId,
                    )}
                    defaultValue={smsetctEdit.matnr}
                    onChange={(e, o) => handleEdit(o, 'matnr')}
                  />
                  {messg.messgMatnr ? (
                    <Label basic color="red" pointing>
                      {messages['enter_again']}
                    </Label>
                  ) : (
                    ''
                  )}
                  <Form.Field
                    control={Input}
                    label={messages['Table.Note']}
                    defaultValue={smsetctEdit.description}
                    onChange={(e, o) => handleEdit(o, 'description')}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Field
                    required
                    error={errorsEdit.f1 ? true : false}
                    control={Input}
                    label={messages['configuration'] + ' F-1'}
                    defaultValue={smsetctEdit.f1}
                    onChange={(e, o) => handleEdit(o, 'F1')}
                  />
                  <Form.Field
                    required
                    error={errorsEdit.f2 ? true : false}
                    control={Input}
                    label={messages['configuration'] + ' F-2'}
                    defaultValue={smsetctEdit.f2}
                    onChange={(e, o) => handleEdit(o, 'F2')}
                  />
                  <Form.Field
                    required
                    error={errorsEdit.f3 ? true : false}
                    control={Input}
                    label={messages['configuration'] + ' F-3'}
                    defaultValue={smsetctEdit.f3}
                    onChange={(e, o) => handleEdit(o, 'F3')}
                  />
                  <Form.Field
                    required
                    error={errorsEdit.f4 ? true : false}
                    control={Input}
                    label={messages['configuration'] + ' F-4'}
                    defaultValue={smsetctEdit.f4}
                    onChange={(e, o) => handleEdit(o, 'F4')}
                  />
                  <Form.Field
                    required
                    error={errorsEdit.f5 ? true : false}
                    control={Input}
                    label={messages['configuration'] + ' F-5'}
                    defaultValue={smsetctEdit.f5}
                    onChange={(e, o) => handleEdit(o, 'F5')}
                  />
                  <Form.Field
                    control={Input}
                    label={messages['configuration'] + ' F-6'}
                    defaultValue={smsetctEdit.f6}
                    onChange={(e, o) => handleEdit(o, 'F6')}
                  />
                  <Form.Field
                    control={Input}
                    label={messages['configuration'] + ' F-7'}
                    defaultValue={smsetctEdit.f7}
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
