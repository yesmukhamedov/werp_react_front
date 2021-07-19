import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  fetchExchangeRate,
  fetchOperatorByHarvestingSystem,
  fetchLogisticsRate,
  fetchBonusOfManager,
  fetchBonusOfHeadOfDepartment,
} from '../../srgfrAction';
import { Divider } from 'semantic-ui-react';
import ExchangeRateTable from './ExchangeRateTable';
import BonusTable from './BonusTable';
import LogisticsRateTable from './LogisticsRateTable';

const Configuration = props => {
  const {
    intl: { messages },
    language,
    exchangeRate = [],
    operatorByHarvestingSystem = [],
    logisticsRate = [],
    bonusOfManager = [],
    bonusOfHeadOfDepartment = [],
  } = props;

  useEffect(() => {
    props.fetchExchangeRate();
    props.fetchOperatorByHarvestingSystem();
    props.fetchLogisticsRate();
    props.fetchBonusOfManager();
    props.fetchBonusOfHeadOfDepartment();
  }, []);

  return (
    <>
      <h3>Курс валют</h3>
      <Divider />
      <ExchangeRateTable data={exchangeRate} />

      <br />

      <h3>Оператор по уборочным системам</h3>
      <Divider />
      <BonusTable data={operatorByHarvestingSystem} />

      <br />

      <h3>Ставка логистики</h3>
      <Divider />
      <LogisticsRateTable data={logisticsRate} />

      <br />

      <h3>Бонус менеджера</h3>
      <Divider />
      <BonusTable data={bonusOfManager} />

      <br />

      <h3>Бонус начальника отдела</h3>
      <Divider />
      <BonusTable data={bonusOfHeadOfDepartment} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    language: state.locales.lang,
  };
};

export default connect(mapStateToProps, {
  fetchExchangeRate,
  fetchOperatorByHarvestingSystem,
  fetchLogisticsRate,
  fetchBonusOfManager,
  fetchBonusOfHeadOfDepartment,
})(injectIntl(Configuration));
