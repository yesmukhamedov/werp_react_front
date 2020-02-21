import React, { Fragment, useState, useEffect } from 'react';
import {
  Segment,
  Header,
  Divider,
  Dropdown,
  Button,
  Icon,
  Grid,
  Input,
  Form,
} from 'semantic-ui-react';
import format from 'string-format';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import OutputErrors from '../../../general/error/outputErrors';
import { clearDynObjService, fetchTovarCategorys } from '../../serviceAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import Columns from './columns';

const Smappl = props => {
  const {
    companyPosition,
    clearDynObjService,
    intl: { messages },
    branchOptions,
    fetchTovarCategorys,
    tovarCategorys,
  } = props;
  const [dropdownActive, setDropdownActive] = useState(false);
  const [error, setError] = useState([]);
  const [tovarCategory, setTovarCategory] = useState([]);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  let queryString = 'bukrs=={0.bukrs};';

  const [search, setSearch] = useState({
    bukrs: 0,
    branch: 0,
    datefrom: momentToStringYYYYMMDD(moment()),
    dateTo: momentToStringYYYYMMDD(moment()),
  });

  let query = {
    search: format(queryString, { ...search }),
  };

  useEffect(() => {
    clearDynObjService();
    fetchTovarCategorys();
  }, []);

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
          varTs.branch = value;
          break;
        case 'datefrom':
          varTs.datefrom = value;
          break;
        case 'dateTo':
          varTs.dateTo = value;
          break;
        default:
          return varTs;
      }
      return varTs;
    });

    setDropdownActive(true);
  };

  const onSearch = () => {
    save();
  };

  const validate = () => {
    const errors = [];
    if (!dropdownActive) {
      errors.push(errorTable[`5${language}`]);
    }
    if (errors.length === 0) {
      console.log(query);
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
          <Button floated="right" color="blue">
            {messages['new_service']}
          </Button>
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
              selection
              options={tovarCategory}
              placeholder={messages['product_category']}
              onChange={(e, { value }) => onChange('product', value)}
            />
            <Form.Select
              label={messages['L__ORDER_STATUS']}
              clearable="true"
              selection
              options={[]}
              placeholder={messages['L__ORDER_STATUS']}
              onChange={(e, { value }) => onChange('status', value)}
            />
            <Form.Select
              label={messages['type_of_application']}
              clearable="true"
              selection
              options={[]}
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
                dropdownMode="select" // timezone="UTC"
                selected={stringYYYYMMDDToMoment(search.datefrom)}
                locale={language}
                onChange={event =>
                  onChange('datefrom', momentToStringYYYYMMDD(event))
                }
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
                dropdownMode="select" // timezone="UTC"
                selected={stringYYYYMMDDToMoment(search.dateTo)}
                locale={language}
                onChange={event =>
                  onChange('dateTo', momentToStringYYYYMMDD(event))
                }
                dateFormat="DD.MM.YYYY"
                placeholderText={messages['Form.DateTo']}
              />
            </Form.Field>

            <Form.Field control={Button} color="blue" style={{ marginTop: 24 }}>
              {messages['apply']}
            </Form.Field>
          </Form.Group>
        </Form>
        <OutputErrors errors={error} />
        <Divider></Divider>
        <Segment basic textAlign="right">
          <Columns />
        </Segment>
      </Segment>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    companyPosition: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsService,
    tovarCategorys: state.serviceReducer.tovarCategorys,
  };
};

export default connect(mapStateToProps, {
  clearDynObjService,
  fetchTovarCategorys,
})(injectIntl(Smappl));
