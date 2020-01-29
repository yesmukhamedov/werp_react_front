import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import BranchF4Advanced from '../../../reference/f4/branch/BranchF4Advanced';
import List from './list';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import {
  Segment,
  Container,
  Header,
  Button,
  Grid,
  Dropdown,
  Form,
  Label,
  Input,
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
  } = props;
  const emptySearch = {
    bukrs: '',
    productCategory: '',
    finStatus: '',
  };
  const [f4BranchIsOpen, setF4BranchIsOpen] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const [dateStart, setStartDates] = useState(moment(new Date(y - 1, m, 1)));
  const [endDates, setEndDates] = useState(moment(new Date()));
  const [searchParams, setSearchParams] = useState({ ...emptySearch });

  const handleInputSearch = (o, fieldName) => {
    setSearchParams(prev => {
      let searchArr = { ...prev };

      console.log('object', o.value);
      console.log('Name', fieldName);
      switch (fieldName) {
        case 'company':
          {
            searchArr.bukrs = o.value;
          }
          break;
        case 'productCategory':
          {
            searchArr.productCategory = o.value;
          }
          break;
        case 'finStatus':
          {
            searchArr.finStatus = o.value;
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
    const startDate = `${moment(dateStart).date()}.${moment(dateStart).month() +
      1}.${moment(dateStart).year()}`;

    const endDate = `${moment(endDates).date()}.${moment(endDates).month() +
      1}.${moment(endDates).year()}`;
    let branchId = [];

    for (let wa of selectedBranches) {
      branchId.push(wa.value);
    }
    console.log('searchParams', searchParams);
    console.log('s', branchId);
    console.log('startDate = ', startDate, 'endDate = ', endDate);
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
          {' '}
          <Header as="h2" floated="left">
            {' '}
            {messages['customer_search']}{' '}
          </Header>{' '}
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

            <Form.Field>
              <label>
                {messages['selectedBranches']} #{selectedBranches.length}
              </label>

              <Button
                color="blue"
                onClick={() => setF4BranchIsOpen(true)}
                icon
                labelPosition="left"
              >
                <Icon name="checkmark box" />
                {messages['Task.BranchError']}
              </Button>
            </Form.Field>

            <BranchF4Advanced
              branches={
                searchParams.bukrs ? branchList[searchParams.bukrs] : []
              }
              isOpen={f4BranchIsOpen}
              onClose={selectedBranches => {
                setF4BranchIsOpen(false);
                setSelectedBranches(selectedBranches);
              }}
              selection={'multiple'}
            />
            <Form.Field>
              <label> {messages['product_category']} </label>

              <Dropdown
                placeholder={messages['product_category']}
                fluid
                search
                selection
                onChange={o => {
                  handleInputSearch(o, 'productCategory');
                }}
              />
            </Form.Field>
            <Form.Field>
              <label> {messages['financial_status']} </label>

              <Dropdown
                placeholder={messages['financial_status']}
                fluid
                search
                selection
                onChange={(e, o) => {
                  handleInputSearch(o, 'finStatus');
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>
                {' '}
                {messages['Form.DateFrom']}{' '}
                <Icon name="calendar alternate outline" />{' '}
              </label>
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                showMonthDropdown
                showYearDropdown
                selected={dateStart}
                onChange={date => setStartDates(date)}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Field>
              <label>
                {' '}
                {messages['Form.DateTo']}{' '}
                <Icon name="calendar alternate outline" />{' '}
              </label>
              <DatePicker
                autoComplete="off"
                locale={language}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" //timezone="UTC"
                selected={endDates}
                onChange={date => setEndDates(date)}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Field>
              <label>
                {' '}
                <br />
              </label>
              <Button
                color="blue"
                onClick={clickedSearch}
                icon
                labelPosition="left"
              >
                <Icon name="search" />
                {messages['search']}
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>

        <Divider />
        <List messages={messages} />
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
function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    branchList: state.userInfo.branchOptionsService,
    companyList: state.userInfo.companyOptions,
  };
}
export default connect(mapStateToProps, {
  f4FetchWerksBranchList,
})(injectIntl(Smsrcus));
