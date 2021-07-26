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
import { Divider, Accordion, Icon } from 'semantic-ui-react';
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

  const [activeIndex, setActiveIndex] = useState();

  useEffect(() => {
    props.fetchExchangeRate();
    props.fetchOperatorByHarvestingSystem();
    props.fetchLogisticsRate();
    props.fetchBonusOfManager();
    props.fetchBonusOfHeadOfDepartment();
  }, []);

  const handleClick = (e, titleProps) => {
    const newIndex = activeIndex === titleProps ? -1 : titleProps;
    setActiveIndex(newIndex);
  };

  return (
    <>
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          {messages['exchange_rate']}
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 0}>
          <ExchangeRateTable data={exchangeRate} />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          {messages['operator_by_harvesting_systems']}
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 1}>
          <BonusTable data={operatorByHarvestingSystem} />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          {messages['logistics_rate']}
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 2}>
          <LogisticsRateTable data={logisticsRate} />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          {messages['bonus_of_manager']}
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 3}>
          <BonusTable data={bonusOfManager} />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 4}
          index={4}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          {messages['bonus_of_head_of_department']}
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 4}>
          <BonusTable data={bonusOfHeadOfDepartment} />
        </Accordion.Content>
      </Accordion>
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
