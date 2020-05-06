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
import List from './list';
import { errorTableText } from '../../../utils/helpers';
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
import format from 'string-format';
const Smsetct = props => {
  const emptySearch = {
    bukrs: '',
  };

  const [searchError, setSearchError] = useState('');
  const [postParams, setPostParams] = useState({});
  const [searchParams, setSearchParams] = useState({ ...emptySearch });
  const [show, setShow] = useState(false);
  const [postErrors, setPostErrors] = useState({});
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [branchF4IsOpen, setBranchF4IsOpen] = useState();
  const [messg, setMessg] = useState({ messgBrnch: false, messgMatnr: false });
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

  const searchInput = o => {
    setSearchParams({ bukrs: o.value });
    if (o.value.length > 0) setSearchError(false);
  };

  //onClickSearch
  const clickSearch = () => {
    let srchErrs = validateSearch();
    if (!srchErrs & (srchErrs !== '')) {
      fetchSmsetct({ ...searchParams });
    }
  };

  // func validateSearch
  const validateSearch = () => {
    let srchErrs = '';
    if (
      searchParams.bukrs === null ||
      searchParams.bukrs === undefined ||
      !searchParams.bukrs
    )
      srchErrs = true;
    else srchErrs = false;
    setSearchError(srchErrs);
    return srchErrs;
  };

  const changePostInput = (o, fieldName) => {
    let errors = { ...postErrors };
    let messages = {};

    setPostParams(prev => {
      const vars = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          if (vars.bukrs !== o.value && vars.bukrs && vars.branchId) {
            vars.branchId = '';
            vars.matnr = '';
            errors.branchId = true;
            errors.matnr = true;
            messages.messgBrnch = messages.messgMatnr = true;
            setMessg({ ...messages });
          }
          vars.bukrs = o.value;
          errors.bukrs = o.value ? false : true;

          break;

        case 'countryId':
          if (vars.countryId !== o.value && vars.countryId && vars.branchId) {
            vars.branchId = '';
            vars.matnr = '';
            errors.branchId = true;
            errors.matnr = true;
            messages.messgBrnch = messages.messgMatnr = true;
            setMessg({ ...messages });
          }
          vars.countryId = o.value;
          errors.countryId = o.value ? false : true;
          break;

        case 'branchId':
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
          errors.description = o.value.length > 0 ? false : true;
          break;
      }

      return vars;
    });

    setPostErrors({ ...errors });
  };

  const handlePost = () => {
    let errors = validateAdd(postParams);
    if (
      errors === null ||
      errors === undefined ||
      Object.keys(errors).length === 0
    ) {
      postSmsetct({ ...postParams }, () => {
        setShow(false);
        setMessg({});
        setPostErrors({});
        fetchSmsetct(postParams.bukrs, postParams.branchId);
      });
    }
    setPostErrors({ ...errors });
  };

  const handleOpen = () => {
    setPostErrors({});
    setMessg({});
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setMessg({});
    setPostErrors({});
  };

  const validateAdd = obj => {
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
    if (obj.matnr === null || obj.matnr === undefined || !obj.matnr) {
      errors.matnr = true;
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
          <Modal
            open={show}
            closeIcon
            onClose={() => {
              setShow(false);
              setMessg({});
              setPostErrors({});
            }}
          >
            <Modal.Header>
              <h3>{messages['add_cartridge']}</h3>
            </Modal.Header>
            <Modal.Content>
              <Segment>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field required>
                      <label>{messages['bukrs']} </label>
                      <Dropdown
                        search
                        selection
                        error={postErrors.bukrs ? true : false}
                        options={companyOptions || []}
                        onChange={(e, o) => changePostInput(o, 'bukrs')}
                      />
                      <label>{messages['country']}</label>
                      <Dropdown
                        search
                        selection
                        error={postErrors.countryId ? true : false}
                        options={getCountryOptions(countryList)}
                        onChange={(e, o) => changePostInput(o, 'countryId')}
                      />

                      <label>{messages['brnch']}</label>
                      <Dropdown
                        search
                        selection
                        error={postErrors.branchId ? true : false}
                        options={
                          postParams.bukrs
                            ? getBranchOptions(
                                branchOptions[postParams.bukrs],
                                postParams.countryId,
                              )
                            : []
                        }
                        onChange={(e, o) => changePostInput(o, 'branchId')}
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
                        selection
                        error={postErrors.matnr ? true : false}
                        options={getProductOptions(
                          productList,
                          postParams.bukrs,
                          postParams.countryId,
                          postParams.branchId,
                        )}
                        onChange={(e, o) => changePostInput(o, 'matnr')}
                      />
                      {messg.messgMatnr ? (
                        <Label basic color="red" pointing>
                          {messages['enter_again']}
                        </Label>
                      ) : (
                        ''
                      )}
                      <Form.Field
                        onChange={(e, o) => changePostInput(o, 'description')}
                        control={Input}
                        label={messages['Table.Note']}
                      />
                    </Form.Field>

                    <Form.Field>
                      <Form.Field
                        required
                        error={postErrors.f1 ? true : false}
                        onChange={(e, o) => changePostInput(o, 'F1')}
                        control={Input}
                        label={messages['configuration'] + ' F-1'}
                      />
                      <Form.Field
                        required
                        error={postErrors.f2 ? true : false}
                        onChange={(e, o) => changePostInput(o, 'F2')}
                        control={Input}
                        label={messages['configuration'] + ' F-2'}
                      />
                      <Form.Field
                        required
                        error={postErrors.f3 ? true : false}
                        onChange={(e, o) => changePostInput(o, 'F3')}
                        control={Input}
                        label={messages['configuration'] + ' F-3'}
                      />
                      <Form.Field
                        required
                        error={postErrors.f4 ? true : false}
                        onChange={(e, o) => changePostInput(o, 'F4')}
                        control={Input}
                        label={messages['configuration'] + ' F-4'}
                      />
                      <Form.Field
                        required
                        error={postErrors.f5 ? true : false}
                        onChange={(e, o) => changePostInput(o, 'F5')}
                        control={Input}
                        label={messages['configuration'] + ' F-5'}
                      />
                      <Form.Field
                        onChange={(e, o) => changePostInput(o, 'F6')}
                        control={Input}
                        label={messages['configuration'] + ' F-6'}
                      />
                      <Form.Field
                        onChange={(e, o) => changePostInput(o, 'F7')}
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
          <Form.Group>
            <Form.Select
              required
              error={searchError ? true : false}
              label={messages['bukrs']}
              search
              selection
              options={companyOptions || []}
              value={searchParams.bukrs}
              onChange={(e, o) => searchInput(o)}
              placeholder={messages['bukrs']}
            />

            <Form.Button
              label={messages['brnch'] + ' # ' + selectedBranches.length}
              color="teal"
              onClick={() => setBranchF4IsOpen(true)}
              icon
              labelPosition="left"
            >
              <Icon name="checkmark box" />
              {messages['Task.BranchError']}
            </Form.Button>

            <Form.Field>
              <label>
                <br />
              </label>
              <Button color="teal" onClick={clickSearch} icon>
                <Icon name="search" />
              </Button>
            </Form.Field>
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
          validateEdit={validateAdd}
        />
      </Container>

      <BranchF4Advanced
        branches={searchParams.bukrs ? branchOptions[searchParams.bukrs] : []}
        isOpen={branchF4IsOpen}
        onClose={selectedBranches => {
          setBranchF4IsOpen(false);
          setSelectedBranches(selectedBranches);
          selectedBranches.length !== 0
            ? setSearchParams({
                ...searchParams,
                branchId: selectedBranches[0].value,
              })
            : setSearchParams({ bukrs: searchParams.bukrs });
        }}
        selection={'single'}
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

const getProductOptions = (productList, bukrs, countryId, branchId) => {
  if (!productList || !bukrs || !countryId || !branchId) {
    return [];
  }
  let productArray = [],
    j = 0,
    i = 0;

  if (countryId !== 9) {
    for (i = 0; i < productList.length; i++) {
      if (productList[i].bukrs === bukrs && productList[i].countryId !== 9) {
        productArray[j] = productList[i];
        j++;
      }
    }
  } else {
    for (i = 0; i < productList.length; i++) {
      if (productList[i].bukrs === bukrs) {
        productArray[j] = productList[i];
        j++;
      }
    }
  }

  let out = productArray.map(c => {
    return {
      key: c.contract_type_id,
      text: c.name,
      value: c.matnr,
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
    errorTable: state.serviceReducer.errorTable,
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
