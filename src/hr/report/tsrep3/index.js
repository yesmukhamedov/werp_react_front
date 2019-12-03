import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTSRep3, clearDynObjHr } from '../../hr_action';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import { excelDownload } from '../../../utils/helpers';

import { injectIntl } from 'react-intl';
import {
  Button,
  Dropdown,
  Icon,
  Container,
  Header,
  Segment,
  Form,
  Grid,
  Divider,
  Image,
} from 'semantic-ui-react';
import List from './list';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

function TSRep3(props) {
  const {
    intl: { messages },
    language,
  } = props;

  const emptyTs = {
    country: '',
    bukrs: '',
    branchId: '',
  };

  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const [ts, setTs] = useState({ ...emptyTs });
  const [startDates, setStartDates] = useState(moment(new Date(y - 1, m, 1)));
  const [endDates, setEndDates] = useState(moment(new Date()));

  //componentDidMount
  useEffect(() => {
    if (!countryList || countryList.length === 0) props.f4FetchCountryList();
    //unmount
    return () => {
      props.clearDynObjHr();
    };
  }, []);

  const { companyOptions, branchOptions, countryList, dynamicObject } = props;

  const handleSubmit = e => {
    e.preventDefault();

    const startDate = `${moment(startDates).date()}.${moment(
      startDates,
    ).month() + 1}.${moment(startDates).year()}`;

    const endDate = `${moment(endDates).date()}.${moment(endDates).month() +
      1}.${moment(endDates).year()}`;
    props.getTSRep3({ ...ts, startDate, endDate });
    console.log('startDate = ', startDate, 'endDate = ', endDate);
  };

  const onInputChange = (o, fieldName) => {
    setTs(prev => {
      const varTs = { ...prev };
      switch (fieldName) {
        case 'countryId':
          varTs.country = o.value;
          break;
        case 'bukrs':
          varTs.bukrs = o.value;
          break;
        case 'branchId':
          varTs.branchId = o.value;
          break;
        default:
          varTs[fieldName] = o.value;
      }
      return varTs;
    });
  };

  const exportExcel = messages => {
    let excelHeaders = [];
    excelHeaders.push('ID');
    excelHeaders.push(messages['country']);
    excelHeaders.push(messages['bukrs']);
    excelHeaders.push(messages['brnch']);
    excelHeaders.push(messages['recommender']);
    excelHeaders.push(messages['recommenderPositionName']);
    excelHeaders.push(messages['countEmpAplTs']);
    excelHeaders.push(messages['saleCount']);
    excelHeaders.push(messages['recomenderBonus']);
    excelDownload(
      'hr/tsrep/dillers/alltime/excel',
      'tsrep.xls',
      'outputTable',
      props.dynamicObject,
      excelHeaders,
    );
  };

  return (
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
          {messages['ts_report_diller_alltime']}
        </Header>
      </Segment>

      <Form onSubmit={handleSubmit}>
        <Grid columns={5}>
          <Grid.Column>
            <label>{messages['country']}</label>
            <Dropdown
              fluid
              search
              selection
              options={getCountryOptions(countryList)}
              onChange={(e, o) => onInputChange(o, 'countryId')}
              placeholder={messages['country']}
            />
          </Grid.Column>

          <Grid.Column>
            <label>{messages['bukrs']} </label>
            <Dropdown
              fluid
              search
              selection
              options={getCompanyOptions(companyOptions)}
              value={ts.bukrs}
              onChange={(e, o) => onInputChange(o, 'bukrs')}
              placeholder={messages['bukrs']}
            />
          </Grid.Column>

          <Grid.Column>
            <label>{messages['brnch']}</label>
            <Dropdown
              fluid
              search
              selection
              options={ts.bukrs ? branchOptions[ts.bukrs] : []}
              value={ts.branchId}
              onChange={(e, o) => onInputChange(o, 'branchId')}
              placeholder={messages['brnch']}
            />
          </Grid.Column>
          <Grid columns={2}>
            <Grid.Column>
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={startDates}
                onChange={date => setStartDates(date)}
                dateFormat="DD/MM/YYYY"
                maxDate={new Date()}
              />
            </Grid.Column>

            <Grid.Column>
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={endDates}
                onChange={date => setEndDates(date)}
                dateFormat="DD/MM/YYYY"
                maxDate={new Date()}
              />
            </Grid.Column>
          </Grid>

          <Grid.Column verticalAlign="bottom">
            <Button color="teal" onSubmit={handleSubmit}>
              <Icon name="search" />
              {messages['search']}
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
      <Divider />
      {dynamicObject.length === undefined || dynamicObject.length === 0 ? (
        ''
      ) : (
        <Segment>
          <Image
            floated="right"
            className="clickableItem"
            src="/assets/img/xlsx_export_icon.png"
            onClick={() => exportExcel(messages)}
            title="Скачать отчет"
          />
          <br />
          <br />
        </Segment>
      )}

      <List dynamicObject={dynamicObject} messages={messages} />
    </Container>
  );
}

const getCountryOptions = countryList => {
  const countryLst = countryList;
  if (!countryLst) {
    return [];
  }
  let out = countryLst.map(c => {
    return {
      key: parseInt(c.countryId, 10),
      text: `${c.country}`,
      value: parseInt(c.countryId, 10),
    };
  });
  return out;
};

const getCompanyOptions = compOptions => {
  const companyOptions = compOptions;
  if (!companyOptions) {
    return [];
  }
  let out = companyOptions.map(c => {
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
    branchOptions: state.userInfo.branchOptionsAll,
    dynamicObject: state.hr.dynamicObject,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchWerksBranchList,
  getTSRep3,
  clearDynObjHr,
})(injectIntl(TSRep3));
