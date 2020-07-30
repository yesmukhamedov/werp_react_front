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
import TextAlignCenter from '../../../utils/TextAlignCenter';
export default function List(props) {
  const {
    messages = [],
    companyOptions = [],
    branchOptions = [],
    countryList = [],
    dynamicObject = [],
    historyDynamicObject = [],
    getCountryOptions = [],
    getProductOptions = [],
    productList = [],
    fetchSmsetct = [],
    editSmsetct = [],
    //searchParams = [],
    getBranchOptions = [],
    //setPostParams = [],
    //postParams = [],
    searchArray = [],
  } = props;

  const [errorsEdit, setErrorsEdit] = useState({});
  const [editParams, setEditParams] = useState({});
  const [oldSmsetctEdit, setOldSmsetctEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [messg, setMessg] = useState({ messgBrnch: false, messgMatnr: false });

  const openEdit = row_data => {
    setEditParams(prop => {
      let editRow = { ...prop };
      let bukr = companyOptions.find(({ text }) => row_data.bukrs === text)
        .value;
      {
        editRow.countryId = countryList.find(
          ({ country }) => row_data.countryId === country,
        ).countryId;
        editRow.bukrs = bukr;
        editRow.branchId = branchOptions[bukr].find(
          ({ text }) => row_data.branchId === text,
        ).value;
        editRow.f1 = row_data.f1;
        editRow.f2 = row_data.f2;
        editRow.f3 = row_data.f3;
        editRow.f4 = row_data.f4;
        editRow.f5 = row_data.f5;
        editRow.f6 = row_data.f6;
        editRow.f7 = row_data.f7;
        editRow.matnr = getProductId(productList, row_data.matnr); // productList.find(({ name }) => row_data.matnr === name).contract_type_id;
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
    setEditParams(() => {
      let vars = { ...editParams };
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
          if (o.value === 'all') {
            vars.matnr = null;
          }
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
    let errs = validateEdit(editParams),
      searchParams = {
        countryId: editParams.countryId,
        bukrs: editParams.bukrs,
        branchId: editParams.branchId,
      };

    if (
      errs === null ||
      errs === undefined ||
      (Object.keys(errs).length === 0 &&
        JSON.stringify(oldSmsetctEdit) !== JSON.stringify(editParams))
    ) {
      if (editParams.matnr === 'all') {
        editSmsetct({ ...editParams, matnr: null }, () => {
          setOpen(false);
          setMessg({});
          setErrorsEdit({});
          fetchSmsetct(searchParams, searchArray);
        });
      } else {
        editSmsetct({ ...editParams }, () => {
          setOpen(false);
          setMessg({});
          setErrorsEdit({});
          fetchSmsetct(searchParams, searchArray);
        });
      }
    }
    setErrorsEdit({ ...errs });
  };

  const validateEdit = obj => {
    const errors = {};
    if (
      obj.countryId === null ||
      obj.countryId === undefined ||
      !obj.countryId
    ) {
      errors.countryId = true;
    }
    if (obj.bukrs === null || obj.bukrs === undefined || !obj.bukrs) {
      errors.bukrs = true;
    }
    if (obj.branchId === null || obj.branchId === undefined || !obj.branchId) {
      errors.branchId = true;
    }
    if (obj.f1 === null || obj.f1 === undefined || !obj.f1) {
      errors.f1 = true;
    }
    if (obj.f2 === null || obj.f2 === undefined || !obj.f2) {
      errors.f2 = true;
    }
    if (obj.f3 === null || obj.f3 === undefined || !obj.f3) {
      errors.f3 = true;
    }
    if (obj.f4 === null || obj.f4 === undefined || !obj.f4) {
      errors.f4 = true;
    }
    if (obj.f5 === null || obj.f5 === undefined || !obj.f5) {
      errors.f5 = true;
    }
    if (
      obj.description === null ||
      obj.description === undefined ||
      !obj.description
    ) {
      errors.description = true;
    }

    return errors;
  };

  // Получить ID Продукта через text

  const getProductId = (products, productName) => {
    if (productName !== null && products) {
      console.log(productName);
      //ROBOCLEAN-114K SPlus это исключения в списке Roboclean 114K SPLUS  а в базе ROBOCLEAN-114K SPlus "-" тире
      // ROBOCLEAN-114F не равен на ROBOCLEAN 114F  отличается. "-" тире после ROBOCLEAN
      if (productName === 'ROBOCLEAN-114K SPlus') productName = 817; // 817 код продукта Roboclean 114K SPLUS
      if (productName === 'ROBOCLEAN-114F') productName = 1;
      if (productName === 'All' || productName === 'Все') productName = 'all';
      else {
        var matnrID = productList.find(
          ({ text45 }) => productName.toUpperCase() === text45.toUpperCase(),
        );
      }
      productName = matnrID ? matnrID.matnr : productName;
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
      filterable: true,
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
      Header: messages['changed_by_employee'],
      accessor: 'fullname',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['operationDate'],
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
      Header: messages['Table.Note'],
      accessor: 'description',
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

        <Modal
          open={open}
          closeIcon
          size={'small'}
          onClose={() => {
            setOpen(false);
            setMessg({});
            setErrorsEdit({});
          }}
        >
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
                    defaultValue={editParams.bukrs}
                    onChange={(e, o) => handleEdit(o, 'bukrs')}
                  />

                  <label>{messages['country']}</label>
                  <Dropdown
                    search
                    error={errorsEdit.countryId ? true : false}
                    selection
                    options={getCountryOptions(countryList)}
                    defaultValue={editParams.countryId}
                    onChange={(e, o) => handleEdit(o, 'countryId')}
                  />

                  <label>{messages['brnch']}</label>
                  <Dropdown
                    search
                    error={errorsEdit.branchId ? true : false}
                    selection
                    options={
                      editParams.bukrs
                        ? getBranchOptions(
                            branchOptions[editParams.bukrs],
                            editParams.countryId,
                          )
                        : []
                    }
                    defaultValue={editParams.branchId}
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
                    options={
                      getProductOptions(productList)
                        ? getProductOptions(productList)
                        : []
                    }
                    defaultValue={editParams.matnr}
                    onChange={(e, o) => handleEdit(o, 'matnr')}
                  />
                  {messg.messgBrnch ? (
                    <Label basic color="red" pointing>
                      {messages['enter_again']}
                    </Label>
                  ) : (
                    ''
                  )}
                  <Form.Field
                    required
                    control={Input}
                    error={errorsEdit.description ? true : false}
                    label={messages['Table.Note']}
                    defaultValue={editParams.description}
                    onChange={(e, o) => handleEdit(o, 'description')}
                  />
                </Form.Field>

                <Form.Field>
                  <Form.Field
                    error={errorsEdit.f1 ? true : false}
                    control={Input}
                    label={
                      messages['configuration'] + `F-1 (${messages['monat']})`
                    }
                    defaultValue={editParams.f1}
                    onChange={(e, o) => handleEdit(o, 'F1')}
                  />
                  <Form.Field
                    error={errorsEdit.f2 ? true : false}
                    control={Input}
                    label={
                      messages['configuration'] + `F-2 (${messages['monat']})`
                    }
                    defaultValue={editParams.f2}
                    onChange={(e, o) => handleEdit(o, 'F2')}
                  />
                  <Form.Field
                    error={errorsEdit.f3 ? true : false}
                    control={Input}
                    label={
                      messages['configuration'] + `F-3 (${messages['monat']})`
                    }
                    defaultValue={editParams.f3}
                    onChange={(e, o) => handleEdit(o, 'F3')}
                  />
                  <Form.Field
                    error={errorsEdit.f4 ? true : false}
                    control={Input}
                    label={
                      messages['configuration'] + `F-4 (${messages['monat']})`
                    }
                    defaultValue={editParams.f4}
                    onChange={(e, o) => handleEdit(o, 'F4')}
                  />
                  <Form.Field
                    error={errorsEdit.f5 ? true : false}
                    control={Input}
                    label={
                      messages['configuration'] + `F-5 (${messages['monat']})`
                    }
                    defaultValue={editParams.f5}
                    onChange={(e, o) => handleEdit(o, 'F5')}
                  />
                  <Form.Field
                    disabled
                    control={Input}
                    label={
                      messages['configuration'] + `F-6 (${messages['monat']})`
                    }
                    defaultValue={editParams.f6}
                    onChange={(e, o) => handleEdit(o, 'F6')}
                  />
                  <Form.Field
                    disabled
                    control={Input}
                    label={
                      messages['configuration'] + `F-7 (${messages['monat']})`
                    }
                    defaultValue={editParams.f7}
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
