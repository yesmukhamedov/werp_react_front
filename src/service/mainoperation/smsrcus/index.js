import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import BranchF4Advanced from '../../../reference/f4/branch/BranchF4Advanced';
import List from './list';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import OutputErrors from '../../../general/error/outputErrors';
import {
  fetchSmsrcus,
  clearDynObjService,
  fetchContractStatus,
} from '../../serviceAction';
import { f4FetchWerksBranchList } from '../../../reference/f4/f4_action';
import {
  Segment,
  Container,
  Header,
  Button,
  Form,
  Icon,
  Divider,
} from 'semantic-ui-react';
import moment from 'moment';
import { errorTableText } from '../../../utils/helpers';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
require('moment/locale/ru');
require('moment/locale/tr');

const Smsrcus = props => {
  const {
    intl: { messages },
    companyList = [],
    language,
    branchList,
    fetchSmsrcus,
    dynamicObject,
    clearDynObjService,
    fetchContractStatus,
    contractStatus,
  } = props;

  useEffect(() => {
    fetchContractStatus();
    clearDynObjService();
  }, []);

  const [f4BranchIsOpen, setF4BranchIsOpen] = useState(false);
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const [startDate, setStartDate] = useState(
    momentToStringYYYYMMDD(moment(new Date(y - 1, m, 1))),
  );
  const [endDate, setEndDate] = useState(
    momentToStringYYYYMMDD(moment(new Date())),
  );
  const [searchParams, setSearchParams] = useState({ ...emptySearch });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [errors, setErrors] = useState([]);
  let emptySearch = {
    branchId: '',
    bukrs: '',
  };
  const handleInputSearch = (o, fieldName) => {
    setSearchParams(prev => {
      let searchArr = { ...prev };
      switch (fieldName) {
        case 'company':
          {
            searchArr.bukrs = o.value;
          }
          break;
        case 'finStatus':
          {
            searchArr.contractStatusIds =
              o.value.length > 0 ? o.value.join() : null;
          }

          break;
        default: {
          searchArr[fieldName] = o.value;
        }
      }
      return searchArr;
    });
  };

  const clickedSearch = () => {
    let errs = validateSearch();
    setTurnOnReactFetch(true);
    if (errs === null || errs === undefined || errs.length === 0) {
      let contractDateFrom = startDate,
        contractDateTo = endDate;

      fetchSmsrcus({ ...searchParams, contractDateFrom, contractDateTo });
    }
    setErrors(() => errs);
  };

  const validateSearch = () => {
    let errors = [];
    if (
      searchParams.bukrs === null ||
      searchParams.bukrs === undefined ||
      !searchParams.bukrs
    )
      errors.push(errorTableText(5));

    if (
      searchParams.branchId === null ||
      searchParams.branchId === undefined ||
      !searchParams.branchId
    )
      errors.push(errorTableText(7));

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
        <Segment clearing tertiary>
          <Header as="h2" floated="left">
            {messages['customer_search']}
          </Header>
        </Segment>
        <Divider />
        <Form>
          <Form.Group>
            <Form.Select
              required
              label={messages['bukrs']}
              onChange={(e, o) => {
                handleInputSearch(o, 'company');
              }}
              search
              selection
              options={companyList || []}
              placeholder={messages['bukrs']}
            />
            <Form.Button
              required
              label={messages['brnch']}
              color="blue"
              onClick={() => setF4BranchIsOpen(true)}
              icon
              labelPosition="right"
            >
              <Icon name="checkmark box" />
              {messages['select']}
            </Form.Button>
            <Form.Select
              label={messages['financial_status']}
              placeholder={messages['financial_status']}
              search
              selection
              multiple
              options={getContractStatus(contractStatus)}
              onChange={(e, o) => {
                handleInputSearch(o, 'finStatus');
              }}
            />
            <Form.Input
              label={
                <label>
                  {' '}
                  {messages['Form.DateFrom']} <Icon name="calendar" />{' '}
                </label>
              }
            >
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                showMonthDropdown
                showYearDropdown
                selected={stringYYYYMMDDToMoment(startDate)}
                onChange={event => setStartDate(momentToStringYYYYMMDD(event))}
                dateFormat="YYYY.MM.DD"
              />
            </Form.Input>

            <Form.Input
              label={
                <label>
                  {' '}
                  {messages['Form.DateTo']} <Icon name="calendar" />{' '}
                </label>
              }
            >
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                showMonthDropdown
                showYearDropdown
                selected={stringYYYYMMDDToMoment(endDate)}
                onChange={event => setEndDate(momentToStringYYYYMMDD(event))}
                dateFormat="YYYY.MM.DD"
              />
            </Form.Input>
            <Form.Field>
              <label>
                <br />
              </label>
              <Button color="blue" onClick={clickedSearch} icon>
                <Icon name="search" />
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>
        <OutputErrors errors={errors} />
        <Divider />
        <List
          messages={messages}
          dynamicObject={dynamicObject}
          fetchSmsrcus={fetchSmsrcus}
          turnOnReactFetch={turnOnReactFetch}
          searchParams={searchParams}
        />
        <BranchF4Advanced
          branches={searchParams.bukrs ? branchList[searchParams.bukrs] : []}
          isOpen={f4BranchIsOpen}
          onClose={selectedBranches => {
            setF4BranchIsOpen(false);
            if (selectedBranches.length !== 0) {
              setSearchParams(prev => {
                const srchParams = { ...prev };
                srchParams.branchId = selectedBranches[0].value;
                return srchParams;
              });
            }
          }}
          selection="single"
        />
      </Container>
    </div>
  );
};

const getContractStatus = contractStatusList => {
  if (!contractStatusList) {
    return [];
  }
  let out = contractStatusList.map(c => {
    return {
      key: c.id,
      text: c.name,
      value: c.id,
    };
  });
  return out;
};
function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    branchList: state.userInfo.branchOptionsAll,
    companyList: state.userInfo.companyOptions,
    dynamicObject: state.serviceReducer.dynamicObject,
    contractStatus: state.serviceReducer.contractStatus,
  };
}
export default connect(mapStateToProps, {
  f4FetchWerksBranchList,
  fetchSmsrcus,
  clearDynObjService,
  fetchContractStatus,
})(injectIntl(Smsrcus));
