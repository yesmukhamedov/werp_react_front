import React, { useEffect, useState } from 'react';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
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
} from 'semantic-ui-react';
require('moment/locale/ru');
require('moment/locale/tr');

const Smsetct = props => {
  const emptySearch = {
    branchId: '',
    bukrs: '',
    countryId: '',
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
  const [smCetStSearch, setsmCetStSearch] = useState({ ...emptySearch });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const {
    intl: { messages },
    companyOptions,
    branchOptions,
    searchSmsetct,
    countryList,
    dynamicObject,
    products,
    addSmsetct,
    editSmsetct,
  } = props;

  //componentDidMount
  useEffect(() => {
    if (!countryList || countryList.length === 0) props.f4FetchCountryList();
  }, []);

  const handleInputAdd = (o, fieldName) => {
    setsmSetCtAdd(prev => {
      const varSmCetCt = { ...prev };
      switch (fieldName) {
        case 'countryId':
          varSmCetCt.countryId = o.value;
          break;

        case 'bukrs':
          varSmCetCt.bukrs = o.value;
          break;

        case 'branchId':
          varSmCetCt.branchId = o.value;
          break;

        case 'products':
          varSmCetCt.products = o.value;
          break;

        case 'F1':
          varSmCetCt.f1 = o.value;
          break;

        case 'F2':
          varSmCetCt.f2 = o.value;
          break;

        case 'F3':
          varSmCetCt.f3 = o.value;
          break;

        case 'F4':
          varSmCetCt.f4 = o.value;
          break;

        case 'F5':
          varSmCetCt.f5 = o.value;
          break;

        case 'F6':
          varSmCetCt.f6 = o.value;
          break;

        case 'F7':
          varSmCetCt.f7 = o.value;
          break;
        case 'note':
          varSmCetCt.note = o.value;
          break;

        default:
          varSmCetCt[fieldName] = o.value;
      }
      return varSmCetCt;
    });
  };

  const handleInputSearch = (o, fieldName) => {
    setsmCetStSearch(prev => {
      const varSmCetCt = { ...prev };
      switch (fieldName) {
        case 'countryId':
          varSmCetCt.countryId = o.value;
          break;
        case 'bukrs':
          varSmCetCt.bukrs = o.value;
          break;
        case 'branchId':
          varSmCetCt.branchId = o.value;
          break;
        default:
          varSmCetCt[fieldName] = o.value;
      }
      return varSmCetCt;
    });
  };

  const handleAdd = () => {
    let errs = [];
    errs = validateAdd();
    if (errs === null || errs === undefined || errs.length === 0) {
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
    searchSmsetct({ ...smCetStSearch });
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
          <Button color="teal" onClick={handleOpen} floated="right">
            <Icon name="add circle" />
            {messages['BTN__ADD']}
          </Button>
          <Modal open={show}>
            <Modal.Header>
              <h3>Добавить картридж</h3>
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
                        options={getCompanyOptions(companyOptions)}
                        value={smSetCtAdd.bukrs}
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
                        value={smSetCtAdd.branchId}
                        onChange={(e, o) => handleInputAdd(o, 'branchId')}
                      />
                      <label>{messages['TBL_H__PRODUCT']}</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        options={getProductOptions(companyOptions)}
                        value={smSetCtAdd.products}
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
          <Grid columns={5}>
            <Grid.Column>
              <label>{messages['country']}</label>
              <Dropdown
                fluid
                search
                selection
                options={getCountryOptions(countryList)}
                value={smCetStSearch.countryId}
                onChange={(e, o) => handleInputSearch(o, 'countryId')}
                placeholder={messages['all']}
              />
            </Grid.Column>

            <Grid.Column>
              <label>{messages['bukrs']} </label>
              <Dropdown
                fluid
                search
                selection
                options={getCompanyOptions(companyOptions)}
                value={smCetStSearch.bukrs}
                onChange={(e, o) => handleInputSearch(o, 'bukrs')}
                placeholder={messages['all']}
              />
            </Grid.Column>

            <Grid.Column>
              <label>{messages['brnch']}</label>
              <Dropdown
                fluid
                search
                selection
                options={
                  smCetStSearch.bukrs ? branchOptions[smCetStSearch.bukrs] : []
                }
                value={smCetStSearch.branchId}
                onChange={(e, o) => handleInputSearch(o, 'branchId')}
                placeholder={messages['all']}
              />
            </Grid.Column>

            <Grid.Column>
              <br />
              <Button color="teal" onClick={clickSearch}>
                <Icon name="search" />
                {messages['search']}
              </Button>
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
          getCompanyOptions={getCompanyOptions}
          getProductOptions={getProductOptions}
          editSmsetct={editSmsetct}
          errorTable={errorTable}
          language={language}
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

const getProductOptions = productList => {
  const productLst = productList;
  if (!productLst) {
    return [];
  }
  let out = productLst.map(c => {
    return {
      key: parseInt(c.key, 10),
      text: `${c.text}`,
      value: parseInt(c.value, 10),
    };
  });
  return out;
};

const getCompanyOptions = compList => {
  const compLst = compList;
  if (!compLst) {
    return [];
  }
  let out = compLst.map(c => {
    return {
      key: parseInt(c.key, 10),
      text: `${c.text}`,
      value: parseInt(c.value, 10),
    };
  });
  return out;
};

function mapStateToProps(state) {
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
