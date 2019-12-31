import React, { useEffect, useState } from 'react';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';

import BranchF4Advanced from '../../../reference/f4/branch/BranchF4Advanced';
import { addSmsetct, searchSmsetct, editSmsetct } from '../../serviceAction';
import { connect } from 'react-redux';
import OutputErrors from '../../../general/error/outputErrors';
import { modifyLoader } from '../../../general/loader/loader_action';
import List from './list';
import {
  Header,
  Icon,
  Segment,
  Button,
  Container,
  Modal,
  Grid,
  Form,
  Dropdown,
  Input,
  Label,
} from 'semantic-ui-react';
require('moment/locale/ru');
require('moment/locale/tr');

const Smsetct = props => {
  const emptySearch = {
    bukrs: '',
  };
  const emptyAdd = {
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
    // "matnr": '',
    products: '',
    note: '',
  };

  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');

  const [smSetCtAdd, setsmSetCtAdd] = useState({ ...emptyAdd });
  const [smSetCtSearch, setsmSetCtSearch] = useState({ ...emptySearch });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [f4BranchIsOpen, setF4BranchIsOpen] = useState(false);
  const {
    intl: { messages },
    companyOptions = [],
    branchOptions,
    searchSmsetct,
    countryList = [],
    dynamicObject,
    products,
    addSmsetct,
    editSmsetct,
  } = props;

  //componentDidMount
  useEffect(() => {
    console.log('usEEffect', companyOptions);
    if (!countryList || countryList.length === 0) props.f4FetchCountryList();
  }, []);

  const handleInputAdd = (o, fieldName) => {
    setsmSetCtAdd(prev => {
      const varSmSetCt = { ...prev };
      switch (fieldName) {
        case 'countryId':
          varSmSetCt.countryId = o.value;
          break;

        case 'bukrs':
          varSmSetCt.bukrs = o.value;
          break;

        case 'branchId':
          varSmSetCt.branchId = o.value;
          break;

        case 'products':
          varSmSetCt.products = o.value;
          break;

        case 'F1':
          varSmSetCt.f1 = o.value;
          break;

        case 'F2':
          varSmSetCt.f2 = o.value;
          break;

        case 'F3':
          varSmSetCt.f3 = o.value;
          break;

        case 'F4':
          varSmSetCt.f4 = o.value;
          break;

        case 'F5':
          varSmSetCt.f5 = o.value;
          break;

        case 'F6':
          varSmSetCt.f6 = o.value;
          break;

        case 'F7':
          varSmSetCt.f7 = o.value;
          break;
        case 'note':
          varSmSetCt.note = o.value;
          break;

        default:
          varSmSetCt[fieldName] = o.value;
      }
      return varSmSetCt;
    });
  };

  const handleInputSearch = (o, fieldName) => {
    setsmSetCtSearch(prev => {
      const varSmSetCt = { ...prev };
      switch (fieldName) {
        case 'countryId':
          varSmSetCt.countryId = o.value;
          break;
        default:
          varSmSetCt[fieldName] = o.value;
      }
      return varSmSetCt;
    });
  };

  const handleAdd = () => {
    let errs = [];
    errs = validateAdd();
    if (errs === null || errs === undefined || errs.length === 0) {
      console.log('smSetCtAdd', smSetCtAdd);
      addSmsetct({ ...smSetCtAdd });
    }
    setErrors(() => errs);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setErrors(() => []);
  };

  const clickSearch = () => {
    console.log('SmSetCtSearch', smSetCtSearch);
    let branchId = [];
    for (let wa of selectedBranches) {
      branchId.push(wa.value);
    }
    searchSmsetct({
      smSetCtSearch,
      branchId: branchId.join(),
    });
  };

  const validateAdd = () => {
    const {
      f1,
      f2,
      f3,
      f4,
      f5,
      f6,
      f7,
      countryId,
      bukrs,
      branchId,
      products,
      matnr,
      note,
    } = smSetCtAdd;
    const errors = [];
    if (countryId === null || countryId === undefined || !countryId) {
      errors.push(errorTable[`147${language}`]);
    }
    if (bukrs === null || bukrs === undefined || !bukrs) {
      errors.push(errorTable[`5${language}`]);
    }
    if (branchId === null || branchId === undefined || !branchId) {
      errors.push(errorTable[`7${language}`]);
    }
    /* if ( products === null ||  products === undefined || !products) {
      errors.push(errorTable[`132${language}`]);
    }*/
    if (f1 === null || f1 === undefined || !f1) {
      errors.push(errorTable[`132${language}`]);
    }
    if (f2 === null || f2 === undefined || !f2) {
      errors.push(errorTable[`132${language}`]);
    }
    if (f3 === null || f3 === undefined || !f3) {
      errors.push(errorTable[`132${language}`]);
    }
    if (f4 === null || f4 === undefined || !f4) {
      errors.push(errorTable[`132${language}`]);
    }
    if (f5 === null || f5 === undefined || !f5) {
      errors.push(errorTable[`132${language}`]);
    }
    if (f6 === null || f6 === undefined || !f6) {
      errors.push(errorTable[`132${language}`]);
    }
    if (f7 === null || f7 === undefined || !f7) {
      errors.push(errorTable[`132${language}`]);
    }
    if (note === null || note === undefined || !note) {
      errors.push(errorTable[`132${language}`]);
    }
    return errors;
  };
  return (
    <div>
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment clearing>
          <Header as="h2" floated="left">
            {messages['cartrige_replace_period']}
          </Header>
          <Button
            color="teal"
            onClick={handleOpen}
            floated="right"
            icon
            labelPosition="left"
          >
            <Icon name="add circle" />
            {messages['BTN__ADD']}
          </Button>
          <Modal open={show}>
            <Modal.Header>
              <h3>{messages['add_cartridge']}</h3>
            </Modal.Header>
            <Modal.Content>
              <Segment>
                <Form>
                  <Form.Group widths="equal">
                    <OutputErrors errors={errors} />
                    <Form.Field required>
                      <label>{messages['country']}</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={getCountryOptions(countryList)}
                        onChange={(e, o) => handleInputAdd(o, 'countryId')}
                      />
                      <label>{messages['bukrs']} </label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={companyOptions || []}
                        onChange={(e, o) => handleInputAdd(o, 'bukrs')}
                      />

                      <label>{messages['brnch']}</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={
                          smSetCtAdd.bukrs
                            ? branchOptions[smSetCtAdd.bukrs]
                            : []
                        }
                        onChange={(e, o) => handleInputAdd(o, 'branchId')}
                      />
                      <label>{messages['TBL_H__PRODUCT']}</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={companyOptions || []}
                        onChange={(e, o) => handleInputAdd(o, 'products')}
                      />
                      <Form.Field
                        onChange={(e, o) => handleInputAdd(o, 'note')}
                        control={Input}
                        label={messages['Table.Note']}
                      />
                    </Form.Field>

                    <Form.Field>
                      <Form.Field
                        onChange={(e, o) => handleInputAdd(o, 'F1')}
                        control={Input}
                        label={messages['configuration'] + ' F-1'}
                      />
                      <Form.Field
                        onChange={(e, o) => handleInputAdd(o, 'F2')}
                        control={Input}
                        label={messages['configuration'] + ' F-2'}
                      />
                      <Form.Field
                        onChange={(e, o) => handleInputAdd(o, 'F3')}
                        control={Input}
                        label={messages['configuration'] + ' F-3'}
                      />
                      <Form.Field
                        onChange={(e, o) => handleInputAdd(o, 'F4')}
                        control={Input}
                        label={messages['configuration'] + ' F-4'}
                      />
                      <Form.Field
                        onChange={(e, o) => handleInputAdd(o, 'F5')}
                        control={Input}
                        label={messages['configuration'] + ' F-5'}
                      />
                      <Form.Field
                        onChange={(e, o) => handleInputAdd(o, 'F6')}
                        control={Input}
                        label={messages['configuration'] + ' F-6'}
                      />
                      <Form.Field
                        onChange={(e, o) => handleInputAdd(o, 'F7')}
                        control={Input}
                        label={messages['configuration'] + ' F-7'}
                      />
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Segment>
            </Modal.Content>
            <Modal.Actions>
              <Button color="teal" floated="right" onClick={handleAdd}>
                <Icon name="checkmark" />
                {messages['Table.Add']}
              </Button>

              <Button
                negative
                floated="right"
                onClick={() => {
                  setsmSetCtAdd(() => []);
                  handleClose();
                }}
              >
                <Icon name="remove" />
                {messages['BTN__CANCEL']}
              </Button>
            </Modal.Actions>
            <br />
            <br />
            <br />
          </Modal>
        </Segment>

        <Form>
          <Grid columns={7}>
            <Grid.Column>
              <Grid.Row>
                <Label>{messages['bukrs']} </Label>
              </Grid.Row>
              <Grid.Row>
                <Dropdown
                  fluid
                  search
                  selection
                  options={companyOptions || []}
                  value={smSetCtSearch.bukrs}
                  onChange={(e, o) => handleInputSearch(o, 'bukrs')}
                  placeholder={messages['all']}
                />
              </Grid.Row>
            </Grid.Column>

            <Grid.Column>
              <Grid.Row>
                <Label>
                  {messages['selectedBranches']} #{selectedBranches.length}
                </Label>
              </Grid.Row>
              <Grid.Row>
                <Button
                  color="teal"
                  onClick={() => setF4BranchIsOpen(true)}
                  icon
                  labelPosition="left"
                >
                  <Icon name="checkmark box" />
                  {messages['Task.BranchError']}
                </Button>
              </Grid.Row>

              <BranchF4Advanced
                branches={
                  smSetCtSearch.bukrs ? branchOptions[smSetCtSearch.bukrs] : []
                }
                isOpen={f4BranchIsOpen}
                onClose={selectedBranches => {
                  setF4BranchIsOpen(false);
                  setSelectedBranches(selectedBranches);
                }}
                selection={'multiple'}
              />
            </Grid.Column>

            <Grid.Column>
              <Grid.Row>
                <Label> {messages['search']} </Label>
              </Grid.Row>
              <Grid.Row>
                <Button
                  color="teal"
                  onClick={clickSearch}
                  icon
                  labelPosition="left"
                >
                  <Icon name="search" />
                  {messages['search']}
                </Button>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Form>
        <List
          dynamicObject={dynamicObject}
          messages={messages}
          companyOptions={companyOptions}
          branchOptions={branchOptions}
          countryList={countryList}
          products={products}
          getCountryOptions={getCountryOptions}
          editSmsetct={editSmsetct}
          errorTable={errorTable}
          language={language}
          smSetCtSearch={smSetCtSearch}
        />
      </Container>
    </div>
  );
};

const getCountryOptions = countryList => {
  const countryLst = countryList;
  if (!countryLst) {
    return [];
  }
  let out = countryLst.map(c => {
    return {
      key: c.countryId,
      text: c.country,
      value: c.countryId,
    };
  });
  return out;
};

function mapStateToProps(state) {
  console.log('companyOptions', state.userInfo.companyOptions);
  return {
    language: state.locales.lang,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsService,
    dynamicObject: state.serviceReducer.dynamicObject,
  };
}
export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchWerksBranchList,
  addSmsetct,
  searchSmsetct,
  editSmsetct,
  modifyLoader,
})(injectIntl(Smsetct));
