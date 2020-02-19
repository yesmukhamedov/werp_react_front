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
  fetchTovarCategorys,
  clearDynObjService,
  fetchContractStatus,
} from '../../serviceAction';
import { f4FetchWerksBranchList } from '../../../reference/f4/f4_action';
import {
  Segment,
  Container,
  Header,
  Button,
  Dropdown,
  Form,
  Icon,
  Divider,
} from 'semantic-ui-react';
import moment from 'moment';
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
    fetchTovarCategorys,
    tovarCategorys,
    clearDynObjService,
    fetchContractStatus,
    contractStatus,
  } = props;

  useEffect(() => {
    fetchTovarCategorys();
    fetchContractStatus();
    clearDynObjService();
  }, []);

  const [f4BranchIsOpen, setF4BranchIsOpen] = useState(false);
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const [dateStart, setStartDates] = useState(moment(new Date(y - 1, m, 1)));
  const [endDates, setEndDates] = useState(moment(new Date()));
  const [searchParams, setSearchParams] = useState({ ...emptySearch });
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [errors, setErrors] = useState([]);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
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
        case 'tovarCategorys':
          {
            console.log('o.value', o.value);
            searchArr.tovarCategorys = o.value;
          }
          break;
        case 'finStatus':
          {
            console.log('o.value', o.value);
            searchArr.contractStatusIds = o.value.join();
          }

          break;
        default: {
          searchArr[fieldName] = o.value.value.join();
        }
      }
      return searchArr;
    });
  };

  const clickedSearch = () => {
    let errs = validateSearch();
    setTurnOnReactFetch(true);
    const contractDateFrom = `${moment(dateStart).year()}-${moment(
      dateStart,
    ).month() + 1}-${moment(dateStart).date()}`;

    const contractDateTo = `${moment(endDates).year()}-${moment(
      endDates,
    ).month() + 1}-${moment(endDates).date()}`;
    if (errs === null || errs === undefined || errs.length === 0) {
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
      errors.push(errorTable[`5${language}`]);

    if (
      searchParams.branchId === null ||
      searchParams.branchId === undefined ||
      !searchParams.branchId
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
        <Segment clearing tertiary>
          <Header as="h2" floated="left">
            {messages['customer_search']}
          </Header>
        </Segment>
        <Divider />
        <Form>
          <Form.Group widths={8}>
            <Form.Field required>
              <label> {messages['bukrs']} </label>

              <Dropdown
                onChange={(e, o) => {
                  handleInputSearch(o, 'company');
                }}
                fluid
                search
                selection
                options={getCompanyOptions(companyList)}
                placeholder={messages['bukrs']}
              />
            </Form.Field>

            <Form.Field required>
              <label>{messages['brnch']}</label>
              <Button
                color="blue"
                fluid
                onClick={() => setF4BranchIsOpen(true)}
                icon
                labelPosition="left"
              >
                <Icon name="checkmark box" />
                {messages['select']}
              </Button>
            </Form.Field>

            <BranchF4Advanced
              branches={
                searchParams.bukrs ? branchList[searchParams.bukrs] : []
              }
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
            <Form.Field>
              <label> {messages['product_category']} </label>
              <Dropdown
                onChange={(e, o) => {
                  handleInputSearch(o, 'tovarCategorys');
                }}
                placeholder={messages['product_category']}
                fluid
                search
                selection
                multiple
                options={getTovarCategotys(tovarCategorys)}
              />
            </Form.Field>
            <Form.Field>
              <label> {messages['financial_status']} </label>
              <Dropdown
                placeholder={messages['financial_status']}
                fluid
                search
                selection
                multiple
                options={getContractStatus(contractStatus)}
                onChange={(e, o) => {
                  handleInputSearch(o, 'finStatus');
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>
                {messages['Form.DateFrom']}
                <Icon name="calendar alternate" />
              </label>
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                showMonthDropdown
                showYearDropdown
                selected={dateStart}
                onChange={date => setStartDates(date)}
                dateFormat="YYYY.MM.DD"
              />
            </Form.Field>
            <Form.Field>
              <label>
                {messages['Form.DateTo']}
                <Icon name="calendar alternate" />
              </label>
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                showMonthDropdown
                showYearDropdown
                selected={endDates}
                onChange={date => setEndDates(date)}
                dateFormat="YYYY.MM.DD"
              />
            </Form.Field>
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
      </Container>
    </div>
  );
};

const getCompanyOptions = companyList => {
  if (!companyList) {
    return [];
  }
  let out = companyList.map(c => {
    return {
      key: c.key,
      text: c.text,
      value: c.value,
    };
  });
  return out;
};

const getTovarCategotys = tovarCategorysList => {
  if (!tovarCategorysList) {
    return [];
  }
  let out = tovarCategorysList.map(c => {
    let text;
    switch (localStorage.language) {
      case 'ru':
        text = c.nameRu;
        break;

      case 'en':
        text = c.nameEn;
        break;

      case 'tr':
        text = c.nameTr;
        break;
    }
    return {
      key: c.id,
      text: text,
      value: c.id,
    };
  });
  return out;
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
    tovarCategorys: state.serviceReducer.tovarCategorys,
    contractStatus: state.serviceReducer.contractStatus,
  };
}
export default connect(mapStateToProps, {
  f4FetchWerksBranchList,
  fetchSmsrcus,
  fetchTovarCategorys,
  clearDynObjService,
  fetchContractStatus,
})(injectIntl(Smsrcus));
