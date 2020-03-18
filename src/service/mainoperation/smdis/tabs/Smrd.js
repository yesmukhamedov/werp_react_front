import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Segment, Button, Popup, Divider } from 'semantic-ui-react';

import {
  f4FetchCompanyOptions,
  f4fetchCategory,
} from '../../../../reference/f4/f4_action';
import 'react-datepicker/dist/react-datepicker.css';
import TableReDistribution1 from './tables/TableReDistribution1';
import TableRedistribution2 from './tables/TableRedistribution2';
require('moment/locale/ru');
require('moment/locale/tr');

const Smrd = props => {
  const {
    intl: { messages },
    language,
    category,
    companyOptions = [],
  } = props;

  const emptyParam = {
    bukrs: '',
    categoryId: '',
    date: '',
  };

  //main State Parametrs
  const [param, setParam] = useState({ ...emptyParam });

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

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          prevParam.bukrs = o.value;
          break;
        case 'categoryId':
          prevParam.categoryId = o.value;
          break;
        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  return (
    <Container fluid>
      <Segment>
        <h3>Перераспределение</h3>
      </Segment>
      {/* <TableReDistribution1 />
      <Divider />

      <TableRedistribution2 /> */}
      <Segment className="justifySegment">
        <Popup
          content="Добавить оператора"
          trigger={<Button color="green" icon="add" />}
        />

        <Popup
          content="Перераспределить список"
          trigger={<Button color="blue">Перераспределение</Button>}
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
  };
}

export default connect(mapStateToProps, {
  f4FetchCompanyOptions,
  f4fetchCategory,
})(injectIntl(Smrd));
