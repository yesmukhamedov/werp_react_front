import React, { Fragment, useState, useEffect } from 'react';
import {
  Segment,
  Header,
  Divider,
  Dropdown,
  Button,
  Form,
  Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import OutputErrors from '../../../general/error/outputErrors';
import {
  clearDynObjService,
  fetchTovarCategorys,
  fetchAppStatus,
  fetchAppType,
  fetchAppList,
  fetchAppMasterList,
  fetchClearAppList,
} from '../../serviceAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { formatDMY } from '../../../utils/helpers';
import Columns from './columns';
import './index.css';

const Smappl = props => {
  const {
    companyPosition = [],
    clearDynObjService,
    intl: { messages },
    branchOptions,
    fetchTovarCategorys,
    tovarCategorys,
    fetchAppStatus,
    appStatus,
    fetchAppType,
    appType,
    fetchAppList,
    fetchAppMasterList,
    fetchClearAppList,
  } = props;
  const [error, setError] = useState([]);
  const [tovarCategory, setTovarCategory] = useState([]);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  const [applicationStatus, setApplicationStatus] = useState([]);
  const [applicationType, setApplicationType] = useState([]);
  const [aDateFrom, setDateFrom] = useState();
  const [aDateTo, setDateTo] = useState();
  const [turnOnReactFetch, setTurnOnReactFetch] = useState(false);
  const [search, setSearch] = useState({
    bukrs: '',
    branchId: 0,
    aDateFrom: null,
    aDateTo: null,
    tovarCategorys: null,
    appStatusIds: null,
    appTypeIds: null,
  });

  useEffect(() => {
    fetchClearAppList();
    fetchTovarCategorys();
    fetchAppStatus();
    fetchAppType();
  }, []);

  useEffect(() => {
    const app = appStatus.map(item => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
      };
    });
    setApplicationStatus(app);
  }, [appStatus]);

  useEffect(() => {
    const app = appType.map(item => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
      };
    });
    setApplicationType(app);
  }, [appType]);

  useEffect(() => {
    const t = tovarCategorys.map(item => {
      let text;
      switch (localStorage.language) {
        case 'ru':
          text = item.nameRu;
          break;
        case 'en':
          text = item.nameEn;
          break;
        case 'tr':
          text = item.nameTr;
          break;
      }
      return {
        key: item.id,
        text: text,
        value: item.id,
      };
    });
    setTovarCategory(t);
  }, [tovarCategorys]);

  const onChange = (text, value) => {
    setSearch(prev => {
      const varTs = { ...prev };
      switch (text) {
        case 'bukrs':
          varTs.bukrs = value;
          break;
        case 'branch':
          varTs.branchId = value;
          break;
        case 'datefrom':
          setDateFrom(value);
          varTs.aDateFrom = formatDMY(value) || null;
          break;
        case 'dateTo':
          setDateTo(value);
          varTs.aDateTo = formatDMY(value) || null;
          break;
        case 'product':
          varTs.tovarCategorys = value.length > 0 ? value.join() : null;
          break;
        case 'status':
          varTs.appStatusIds = value.length > 0 ? value.join() : null;
          break;
        case 'ApplicationType':
          varTs.appTypeIds = value.length > 0 ? value.join() : null;
          break;
        default:
          return varTs;
      }
      return varTs;
    });
  };

  const onSearch = () => {
    save();
  };

  const validate = () => {
    const errors = [];
    if (search.bukrs === '') {
      errors.push(errorTable[`5${language}`]);
    }
    if (search.branchId === 0) {
      errors.push(errorTable[`7${language}`]);
    }
    if (errors.length === 0) {
      console.log(search);
      fetchAppList(search);
      fetchAppMasterList(search);
      setTurnOnReactFetch(true);
    }
    return errors;
  };

  const save = () => {
    let errors = [];
    errors = validate();
    setError(() => errors);
  };

  return (
    <Fragment>
      <Segment>
        <Divider hidden></Divider>
        <Header as="h2">
          {messages['service_requests']}
          <a href="/service/mainoperation/smcs" target="_blank">
            <Button floated="right" color="pink">
              {messages['new_service']}
            </Button>
          </a>
        </Header>
        <Divider />
        <Form>
          <Form.Group widths="equal">
            <Form.Select
              label={messages['bukrs']}
              clearable="true"
              selection
              options={companyPosition}
              placeholder={messages['bukrs']}
              onChange={(e, { value }) => onChange('bukrs', value)}
            />
            <Form.Select
              label={messages['Task.Branch']}
              clearable="true"
              selection
              options={search.bukrs ? branchOptions[search.bukrs] : []}
              placeholder={messages['Task.Branch']}
              onChange={(e, { value }) => onChange('branch', value)}
            />
            <Form.Select
              label={messages['product_category']}
              clearable="true"
              multiple
              selection
              options={tovarCategory}
              placeholder={messages['product_category']}
              onChange={(e, { value }) => onChange('product', value)}
            />
            <Form.Select
              label={messages['L__ORDER_STATUS']}
              clearable="true"
              selection
              multiple
              options={applicationStatus}
              placeholder={messages['L__ORDER_STATUS']}
              onChange={(e, { value }) => onChange('status', value)}
            />
            <Form.Select
              label={messages['type_of_application']}
              clearable="true"
              selection
              multiple
              options={applicationType}
              placeholder={messages['type_of_application']}
              onChange={(e, { value }) => onChange('ApplicationType', value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Field>
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                locale={language}
                selected={aDateFrom}
                onChange={event => onChange('datefrom', event)}
                dateFormat="DD.MM.YYYY"
                placeholderText={messages['Form.DateFrom']}
              />
            </Form.Field>
            <Form.Field>
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={aDateTo}
                locale={language}
                onChange={event => onChange('dateTo', event)}
                dateFormat="DD.MM.YYYY"
                placeholderText={messages['Form.DateTo']}
              />
            </Form.Field>

            <Form.Field
              control={Button}
              color="pink"
              style={{ marginTop: 24 }}
              onClick={onSearch}
            >
              <Icon name="search" />
              {messages['search']}
            </Form.Field>
          </Form.Group>
        </Form>
        <OutputErrors errors={error} />
        <Divider></Divider>
        <Segment basic textAlign="right">
          <Columns searchParams={search} turnOnReactFetch={turnOnReactFetch} />
        </Segment>
      </Segment>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    state,
    companyPosition: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsService,
    tovarCategorys: state.serviceReducer.tovarCategorys,
    appStatus: state.serviceReducer.appStatus,
    appType: state.serviceReducer.appType,
  };
};

export default connect(mapStateToProps, {
  clearDynObjService,
  fetchTovarCategorys,
  fetchAppStatus,
  fetchAppType,
  fetchAppList,
  fetchAppMasterList,
  fetchClearAppList,
})(injectIntl(Smappl));
