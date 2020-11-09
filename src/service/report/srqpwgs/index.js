import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Icon, Container, Segment, Form, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
require('moment/locale/ru');

//Сервис отчеты: Количество и зав цены списанных товаров по сервису
const Srqpwgs = props => {
  const {} = props;

  return <Segment>SRQPWGS</Segment>;
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
  };
}

export default connect(mapStateToProps, {})(injectIntl(Srqpwgs));
