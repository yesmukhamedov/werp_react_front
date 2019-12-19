import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchCountryList,
  f4FetchWerksBranchList,
} from '../../../reference/f4/f4_action';
import { fetchSrls, clearDynObjService } from './../../serviceAction';
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
  Table,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { stringYYYYMMDDToMoment } from '../../../utils/helpers';
import ReactTableWrapper from './../../../utils/ReactTableWrapper';
require('moment/locale/ru');
require('moment/locale/tr');

const Srls = props => {
  const {
    intl: { messages },
    language,
    companyOptions = [],
    branchOptions = [],
    dynamicObject,
    fetchSrls,
    clearDynObjService,
  } = props;

  const emptySrls = {
    bukrs: '',
    branchId: '',
    productCategory: '',
    typeOfService: '',
    statusService: '',
  };
  const date = moment().format(`YYYY-MM-DDThh:mm:ss.SSSZZ`);
  const [srls, setSrls] = useState({ ...emptySrls });
  const [startDate, setStartDate] = useState(moment(date));
  const [endDate, setEndDate] = useState(moment(date));

  useEffect(() => {
    fetchSrls();

    //unmount
    return () => {
      props.clearDynObjService();
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('HandleSubmit', srls, startDate._i, endDate);
    props.fetchSrls({ ...srls, startDate, endDate });
  };

  const productCategoryOptions = [
    { key: '1', text: 'Aura', value: '1' },
    { key: '2', text: 'Greenlight', value: '2' },
    { key: '3', text: 'S', value: '3' },
  ];

  const typeOfServiceOptions = [
    { key: '1', text: 'Сервис карта заполнена', value: '1' },
    { key: '2', text: 'Новый', value: '2' },
    { key: '3', text: 'S', value: '3' },
  ];

  const serviceStatusOptions = [
    { key: '1', text: 'Выполнено', value: '1' },
    { key: '2', text: 'Отмена', value: '2' },
  ];

  const onInputChange = (o, fieldName) => {
    console.log('e', o);
    setSrls(prev => {
      const varSrls = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          varSrls.bukrs = o.value;
          break;
        case 'branchId':
          varSrls.branchId = o.value;
          break;
        case 'productCategory':
          varSrls.productCategory = o.value;
          break;
        case 'typeOfService':
          varSrls.typeOfService = o.value;
          break;
        case 'statusService':
          varSrls.statusService = o.value;
          break;
        default:
          varSrls[fieldName] = o.value;
      }
      return varSrls;
    });
  };

  return (
    <Container fluid>
      <Segment>
        <h3>Список сервисов</h3>
      </Segment>
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Grid columns={8}>
            <Grid.Column>
              <label>{messages['bukrs']} </label>
              <Dropdown
                fluid
                search
                selection
                options={companyOptions}
                value={srls.bukrs}
                onChange={(e, o) => onInputChange(o, 'bukrs')}
              />
            </Grid.Column>

            <Grid.Column>
              <label>{messages['brnch']}</label>
              <Dropdown
                fluid
                search
                selection
                options={srls.bukrs ? branchOptions[srls.bukrs] : []}
                value={srls.branchId}
                onChange={(e, o) => onInputChange(o, 'branchId')}
              />
            </Grid.Column>

            <Grid.Column>
              <label>Категория товара</label>
              <Dropdown
                fluid
                search
                selection
                options={productCategoryOptions}
                value={srls.productCategory}
                onChange={(e, o) => onInputChange(o, 'productCategory')}
              />
            </Grid.Column>

            <Grid.Column>
              <label>Вид сервиса</label>
              <Dropdown
                fluid
                search
                selection
                value={srls.typeOfService}
                options={typeOfServiceOptions}
                onChange={(e, o) => onInputChange(o, 'typeOfService')}
              />
            </Grid.Column>

            <Grid.Column>
              <label>Статус сервиса</label>
              <Dropdown
                fluid
                search
                selection
                options={serviceStatusOptions}
                value={srls.statusService}
                onChange={(e, o) => onInputChange(o, 'statusService')}
              />
            </Grid.Column>

            <Grid.Column>
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={startDate}
                onChange={date => setStartDate(date)}
                maxDate={new Date()}
              />
            </Grid.Column>

            <Grid.Column>
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={endDate}
                onChange={date => setEndDate(date)}
                maxDate={new Date()}
              />
            </Grid.Column>

            <Grid.Column verticalAlign="bottom">
              <Button color="teal" onSubmit={handleSubmit}>
                Применить
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </Segment>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    dynamicObject: state.hr.dynamicObject,
  };
}

export default connect(mapStateToProps, {
  f4FetchWerksBranchList,
  fetchSrls,
  clearDynObjService,
})(injectIntl(Srls));
