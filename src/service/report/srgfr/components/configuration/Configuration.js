import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { fetchExchangeRate } from '../../srgfrAction';
import { Divider } from 'semantic-ui-react';
import ExchangeRateTable from './ExchangeRateTable';

const Configuration = props => {
  const {
    intl: { messages },
    language,
    exchangeRate = [],
  } = props;

  useEffect(() => {
    props.fetchExchangeRate();
  }, []);
  console.log(language);
  return (
    <>
      <h3>{messages['amount']}</h3>
      <h3>Курс валют</h3>
      <Divider />
      <ExchangeRateTable data={exchangeRate} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    language: state.srgfrReducer.exchangeRate,
    exchangeRate: state.srgfrReducer.exchangeRate,
  };
};

export default connect(mapStateToProps, {
  fetchExchangeRate,
})(injectIntl(Configuration));
