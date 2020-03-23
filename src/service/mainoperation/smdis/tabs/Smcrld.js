import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Segment,
  Dropdown,
  Grid,
  Button,
  Popup,
  Icon,
} from 'semantic-ui-react';

import {
  f4FetchCompanyOptions,
  f4fetchCategory,
  f4FetchStaffList,
} from '../../../../reference/f4/f4_action';

import { fetchSmcrldList, postSmcrldFormplan } from '../smdisAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import TableSmcrld from './tables/TableSmcrld';
require('moment/locale/ru');
require('moment/locale/tr');

const Smcrld = props => {
  const {
    intl: { messages },
    language,
    category,
    companyOptions = [],
    listData = {},
    clickViewService,
    param,
  } = props;

  const [paramSmvod, setParamSmvod] = useState({});

  const [paramFormPlan, setParamFormPLan] = useState({
    categoryId: 0,
    dateAt: '',
  });

  //Get category options
  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  useEffect(() => {
    props.f4FetchCompanyOptions();
    props.f4fetchCategory();
  }, []);

  //Применить
  const handleClickApply = () => {
    props.fetchSmcrldList({ ...props.param });
  };

  const formPlanClick = () => {
    props.postSmcrldFormplan({ ...paramFormPlan });
  };

  return (
    <Container fluid>
      <Segment>
        <Grid>
          <Grid.Row columns={5}>
            <Grid.Column>
              <label>Компания</label>
              <Dropdown
                options={companyOptions}
                fluid
                selection
                value={param.bukrs}
                placeholder="Компания"
                onChange={(e, o) => props.onInputChange(o, 'bukrs')}
              />
            </Grid.Column>
            <Grid.Column>
              <label>Категория товара</label>
              <Dropdown
                fluid
                selection
                value={param.categoryId}
                placeholder="Категория товара"
                options={categoryOptions}
                onChange={(e, o) => props.onInputChange(o, 'categoryId')}
              />
            </Grid.Column>
            <Grid.Column>
              <label>Дата</label>
              <DatePicker
                locale={language}
                className="datePicker"
                autoComplete="off"
                dropdownMode="select" //timezone="UTC"
                selected={stringYYYYMMDDToMoment(param.dateAt)}
                onChange={date => props.onInputChange(date, 'date')}
                dateFormat="DD/MM/YYYY"
                maxDate={new Date()}
              />
            </Grid.Column>
            <Grid.Column verticalAlign="bottom">
              <Button onClick={handleClickApply} color="blue">
                Применить
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <TableSmcrld
        data={listData.listData}
        dataTotal={param}
        footerData={listData.listSum}
        clickViewService={clickViewService}
      />
      <Segment textAlign="right">
        <Popup
          size="mini"
          content="Сформировать план"
          trigger={
            <Button onClick={formPlanClick} color="teal">
              Формировать
            </Button>
          }
        />
        <Popup
          size="mini"
          content="Применить оканчательные условия"
          trigger={<Button color="blue">Применить</Button>}
        />
      </Segment>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    category: state.f4.category,
    staff: state.f4.staffList,
    listData: state.smdisReducer.smcrldObject,
    formPlanList: state.smdisReducer.formPlanList,
  };
}

export default connect(mapStateToProps, {
  f4FetchCompanyOptions,
  f4fetchCategory,
  fetchSmcrldList,
  postSmcrldFormplan,
})(injectIntl(Smcrld));
