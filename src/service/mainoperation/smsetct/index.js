import React, { useEffect, useState } from 'react';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
  f4FetchConTypeList,
} from '../../../reference/f4/f4_action';
import BranchF4Advanced from '../../../reference/f4/branch/BranchF4Advanced';
import {
  postSmsetct,
  fetchSmsetct,
  editSmsetct,
  clearDynObjService,
} from '../../serviceAction';
import { connect } from 'react-redux';
import OutputErrors from '../../../general/error/outputErrors';
import List from './list';
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
import format from 'string-format';
const Smsetct = props => {
  const emptySearch = {
    bukrs: '',
    searchText: '',
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
    matnr: '',
    description: '',
  };

  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');

  const [postParams, setPostParams] = useState({ ...emptyAdd });
  const [searchParams, setSearchParams] = useState({ ...emptySearch });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [f4BranchIsOpen, setF4BranchIsOpen] = useState(false);
  const {
    intl: { messages },
    companyOptions = [],
    productList = [],
    branchOptions,
    fetchSmsetct,
    countryList = [],
    dynamicObject,
    historyDynamicObject,
    postSmsetct,
    editSmsetct,
    clearDynObjService,
  } = props;

  //componentDidMount
  useEffect(() => {
    clearDynObjService();
    if (!productList || productList.length === 0) props.f4FetchConTypeList();
    if (!countryList || countryList.length === 0) props.f4FetchCountryList();
  }, []);

  const handleInputSearch = (o, fieldName) => {
    setSearchParams(prev => {
      const varSmSetCt = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          varSmSetCt.bukrs = o.value;
          break;
        default:
          varSmSetCt[fieldName] = o.value;
      }
      return varSmSetCt;
    });
  };
  const clickSearch = () => {
    let branchId = [];
    let errs = [];
    errs = validateSearch();
    for (let wa of selectedBranches) {
      branchId.push(wa.value);
    }
    let branchRequestSum = selectedBranches.length;
    let queryString = 'bukrs=={0.bukrs}';
    let query = { search: format(queryString, { ...searchParams }) };
    let branch = { branchId: 0 };

    if (selectedBranches.length > 0) {
      queryString = ';branchId=={0.branchId}';
      while (branchRequestSum > 0) {
        branch.branchId = branchId[branchRequestSum - 1];
        query.search = query.search + format(queryString, { ...branch });
        --branchRequestSum;
      }
    }
    setSearchParams(prev => {
      const varSmSetCt = { ...prev };
      varSmSetCt.searchText = query;
      return varSmSetCt;
    });

    if (errs === null || errs === undefined || errs.length === 0) {
      fetchSmsetct({ ...query });
    }
    setErrors(errs);
  };

  const handleInputAdd = (o, fieldName) => {
    setPostParams(prev => {
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

        case 'matnr':
          varSmSetCt.matnr = o.value;
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
        case 'description':
          varSmSetCt.description = o.value;
          break;

        default:
          varSmSetCt[fieldName] = o.value;
      }
      return varSmSetCt;
    });
  };

  const handlePost = () => {
    let errs = [];
    errs = validateAdd();
    if (errs === null || errs === undefined || errs.length === 0) {
      postSmsetct({ ...postParams }, fetchSmsetct, {
        ...searchParams.searchText,
      });
    }
    setErrors(errs);
  };

  const handleOpen = () => {
    setErrors([]);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setErrors([]);
  };

  const validateAdd = () => {
    const {
      f1,
      f2,
      f3,
      f4,
      f5,
      countryId,
      bukrs,
      branchId,
      matnr,
      description,
    } = postParams;
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
    if (matnr === null || matnr === undefined || !matnr) {
      errors.push(errorTable[`132${language}`]);
    }
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
    if (description === null || description === undefined || !description) {
      errors.push(errorTable[`132${language}`]);
    }
    return errors;
  };
  const validateSearch = () => {
    const errors = [];
    if (
      searchParams.bukrs === null ||
      searchParams.bukrs === undefined ||
      !searchParams.bukrs
    )
      errors.push(errorTable[`5${language}`]);

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
                      <label>{messages['bukrs']} </label>
                      <Dropdown
                        search
                        selection
                        options={companyOptions || []}
                        onChange={(e, o) => handleInputAdd(o, 'bukrs')}
                      />
                      <label>{messages['country']}</label>
                      <Dropdown
                        search
                        selection
                        options={getCountryOptions(countryList)}
                        onChange={(e, o) => handleInputAdd(o, 'countryId')}
                      />

                      <label>{messages['brnch']}</label>
                      <Dropdown
                        search
                        selection
                        options={
                          postParams.bukrs
                            ? getBranchOptions(
                                branchOptions[postParams.bukrs],
                                postParams.countryId,
                              )
                            : []
                        }
                        onChange={(e, o) => handleInputAdd(o, '`branchId`')}
                      />
                      <label>{messages['TBL_H__PRODUCT']}</label>
                      <Dropdown
                        search
                        selection
                        options={getProductOptions(
                          productList,
                          postParams.bukrs,
                        )}
                        onChange={(e, o) => handleInputAdd(o, 'matnr')}
                      />
                      <Form.Field
                        required
                        onChange={(e, o) => handleInputAdd(o, 'description')}
                        control={Input}
                        label={messages['Table.Note']}
                      />
                    </Form.Field>

                    <Form.Field>
                      <Form.Field
                        required
                        onChange={(e, o) => handleInputAdd(o, 'F1')}
                        control={Input}
                        label={messages['configuration'] + ' F-1'}
                      />
                      <Form.Field
                        required
                        onChange={(e, o) => handleInputAdd(o, 'F2')}
                        control={Input}
                        label={messages['configuration'] + ' F-2'}
                      />
                      <Form.Field
                        required
                        onChange={(e, o) => handleInputAdd(o, 'F3')}
                        control={Input}
                        label={messages['configuration'] + ' F-3'}
                      />
                      <Form.Field
                        required
                        onChange={(e, o) => handleInputAdd(o, 'F4')}
                        control={Input}
                        label={messages['configuration'] + ' F-4'}
                      />
                      <Form.Field
                        required
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
              <Button color="teal" floated="right" onClick={handlePost}>
                <Icon name="checkmark" />
                {messages['Table.Add']}
              </Button>

              <Button
                negative
                floated="right"
                onClick={() => {
                  setPostParams(() => []);
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
          <Form.Group widths={8}>
            <Form.Field required>
              <label>{messages['bukrs']}</label>
              <Dropdown
                fluid
                search
                selection
                options={companyOptions || []}
                value={searchParams.bukrs}
                onChange={(e, o) => handleInputSearch(o, 'bukrs')}
                placeholder={messages['bukrs']}
              />
            </Form.Field>

            <Form.Field>
              <label>
                {messages['brnch']} #{selectedBranches.length}
              </label>
              <Button
                color="teal"
                fluid
                onClick={() => setF4BranchIsOpen(true)}
                icon
                labelPosition="left"
              >
                <Icon name="checkmark box" />
                {messages['Task.BranchError']}
              </Button>
            </Form.Field>

            <Form.Field>
              <label>
                <br />
              </label>
              <Button color="teal" onClick={clickSearch} icon>
                <Icon name="search" />
              </Button>
            </Form.Field>

            <OutputErrors errors={errors} />
          </Form.Group>
        </Form>
        <List
          dynamicObject={dynamicObject}
          historyDynamicObject={historyDynamicObject}
          messages={messages}
          companyOptions={companyOptions}
          branchOptions={branchOptions}
          countryList={countryList}
          getCountryOptions={getCountryOptions}
          getProductOptions={getProductOptions}
          productList={productList}
          editSmsetct={editSmsetct}
          searchParams={searchParams}
          fetchSmsetct={fetchSmsetct}
          getBranchOptions={getBranchOptions}
        />
      </Container>

      <BranchF4Advanced
        branches={searchParams.bukrs ? branchOptions[searchParams.bukrs] : []}
        isOpen={f4BranchIsOpen}
        onClose={selectedBranches => {
          setF4BranchIsOpen(false);
          setSelectedBranches(selectedBranches);
        }}
        selection={'multiple'}
      />
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

const getBranchOptions = (BranchList, countryId) => {
  if (!BranchList || !countryId) {
    return [];
  }

  let out = [],
    j = 0;
  for (let i = 0; i < BranchList.length; i++) {
    if (BranchList[i].countryid === countryId) {
      out[j] = BranchList[i];
      j++;
    }
  }
  return out;
};
const getProductOptions = (productList, bukrs) => {
  if (!productList || !bukrs) {
    return [];
  }
  let productArray = [],
    j = 0;
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].bukrs === bukrs) {
      productArray[j] = productList[i];
      j++;
    }
  }
  let out = productArray.map(c => {
    return {
      key: c.contract_type_id,
      text: c.name,
      value: c.contract_type_id,
    };
  });
  return out;
};
function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    productList: state.f4.contractTypeList,
    branchOptions: state.userInfo.branchOptionsService,
    dynamicObject: state.serviceReducer.dynamicObject,
    historyDynamicObject: state.serviceReducer.historyDynamicObject,
  };
}
export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchWerksBranchList,
  f4FetchConTypeList,
  postSmsetct,
  fetchSmsetct,
  editSmsetct,
  clearDynObjService,
})(injectIntl(Smsetct));
