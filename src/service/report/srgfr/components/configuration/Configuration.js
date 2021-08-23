import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
    fetchExchangeRate,
    fetchOperatorByHarvestingSystem,
    fetchLogisticsRate,
    fetchBonusOfManager,
    fetchBonusOfHeadOfDepartment,
    COEFFICIENT_TYPE_CHIEF_DEPARTMENT_BONUS,
    modifyBonusCoefficient,
    COEFFICIENT_TYPE_MANAGER_BONUS,
    COEFFICIENT_TYPE_VC_OPERATOR_BONUS,
    COEFFICIENT_TYPE_MONEY_RATE,
    modifyExchangeRateCoefficient,
    COEFFICIENT_TYPE_LOGISTICS_RATE,
    modifyLogisticsRateCoefficient,
} from '../../srgfrAction';
import { Divider, Accordion, Icon, Rail } from 'semantic-ui-react';
import ExchangeRateTable from './tables/ExchangeRateTable';
import BonusTable from './tables/BonusTable';
import LogisticsRateTable from './tables/LogisticsRateTable';
import BonusCoefficientModal from './modalWindows/BonusCoefficientModal';
import ExchangeRateCoefficientModal from './modalWindows/ExchangeRateCoefficientModal';
import LogisticsRateCoefficientModal from './modalWindows/LogisticsRateCoefficientModal';

const Configuration = props => {
    const {
        intl: { messages },
        language,
        exchangeRate = [],
        operatorByHarvestingSystem = [],
        logisticsRate = [],
        bonusOfManager = [],
        bonusOfHeadOfDepartment = [],
        currencies = [],
        modifyBonusCoefficient,
        modifyExchangeRateCoefficient,
        modifyLogisticsRateCoefficient,
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
                    <ExchangeRateCoefficientModal
                        type={COEFFICIENT_TYPE_MONEY_RATE}
                        locale={language}
                        currencies={currencies}
                        create
                        save={params => {
                            modifyExchangeRateCoefficient(params, () => {
                                props.fetchExchangeRate();
                            });
                        }}
                    />
                    <br />
                    <br />
                    <ExchangeRateTable
                        data={exchangeRate}
                        language={language}
                        edit={row => (
                            <ExchangeRateCoefficientModal
                                type={COEFFICIENT_TYPE_MONEY_RATE}
                                locale={language}
                                currencies={currencies}
                                modify={{
                                    id: row._original.id,
                                    amount: row._original.amount,
                                    dateOpen: row._original.dateOpen,
                                    fromCurrency: row._original.fromCurrency,
                                    toCurrency: row._original.toCurrency,
                                }}
                                save={params => {
                                    modifyExchangeRateCoefficient(
                                        params,
                                        () => {
                                            props.fetchExchangeRate();
                                        },
                                    );
                                }}
                            />
                        )}
                    />
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
                    <BonusCoefficientModal
                        type={COEFFICIENT_TYPE_VC_OPERATOR_BONUS}
                        locale={language}
                        save={params => {
                            modifyBonusCoefficient(params, () => {
                                props.fetchOperatorByHarvestingSystem();
                            });
                        }}
                        create
                    />
                    <br />
                    <br />
                    <BonusTable
                        data={operatorByHarvestingSystem}
                        edit={row => (
                            <BonusCoefficientModal
                                type={COEFFICIENT_TYPE_VC_OPERATOR_BONUS}
                                locale={language}
                                save={params => {
                                    modifyBonusCoefficient(params, () => {
                                        props.fetchOperatorByHarvestingSystem();
                                    });
                                }}
                                modify={{
                                    id: row._original.id,
                                    bonusAmount: row._original.bonusAmount,
                                    dateOpen: row._original.dateOpen,
                                    fromPercent: row._original.fromPercent,
                                    toPercent: row._original.toPercent,
                                }}
                            />
                        )}
                    />
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
                    <LogisticsRateCoefficientModal
                        type={COEFFICIENT_TYPE_LOGISTICS_RATE}
                        locale={language}
                        save={params => {
                            modifyLogisticsRateCoefficient(params, () => {
                                props.fetchLogisticsRate();
                            });
                        }}
                        create
                    />
                    <br />
                    <br />
                    <LogisticsRateTable
                        data={logisticsRate}
                        edit={row => (
                            <LogisticsRateCoefficientModal
                                type={COEFFICIENT_TYPE_LOGISTICS_RATE}
                                locale={language}
                                save={params => {
                                    modifyLogisticsRateCoefficient(
                                        params,
                                        () => {
                                            props.fetchLogisticsRate();
                                        },
                                    );
                                }}
                                modify={{
                                    id: row._original.id,
                                    dateOpen: row._original.dateOpen,
                                    percentAmount: row._original.percentAmount,
                                }}
                            />
                        )}
                    />
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
                    <BonusCoefficientModal
                        type={COEFFICIENT_TYPE_MANAGER_BONUS}
                        locale={language}
                        save={params => {
                            modifyBonusCoefficient(params, () => {
                                props.fetchBonusOfManager();
                            });
                        }}
                        create
                    />
                    <br />
                    <br />
                    <BonusTable
                        data={bonusOfManager}
                        edit={row => (
                            <BonusCoefficientModal
                                type={COEFFICIENT_TYPE_MANAGER_BONUS}
                                locale={language}
                                save={params => {
                                    modifyBonusCoefficient(params, () => {
                                        props.fetchBonusOfManager();
                                    });
                                }}
                                modify={{
                                    id: row._original.id,
                                    bonusAmount: row._original.bonusAmount,
                                    dateOpen: row._original.dateOpen,
                                    fromPercent: row._original.fromPercent,
                                    toPercent: row._original.toPercent,
                                }}
                            />
                        )}
                    />
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
                    <BonusCoefficientModal
                        type={COEFFICIENT_TYPE_CHIEF_DEPARTMENT_BONUS}
                        locale={language}
                        save={params => {
                            modifyBonusCoefficient(params, () => {
                                props.fetchBonusOfHeadOfDepartment();
                            });
                        }}
                        create
                    />
                    <br />
                    <br />
                    <BonusTable
                        data={bonusOfHeadOfDepartment}
                        edit={row => (
                            <BonusCoefficientModal
                                type={COEFFICIENT_TYPE_CHIEF_DEPARTMENT_BONUS}
                                locale={language}
                                save={params => {
                                    console.log(params);
                                    modifyBonusCoefficient(params, () => {
                                        props.fetchBonusOfHeadOfDepartment();
                                    });
                                }}
                                modify={{
                                    id: row._original.id,
                                    bonusAmount: row._original.bonusAmount,
                                    dateOpen: row._original.dateOpen,
                                    fromPercent: row._original.fromPercent,
                                    toPercent: row._original.toPercent,
                                }}
                            />
                        )}
                    />
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
    modifyBonusCoefficient,
    modifyExchangeRateCoefficient,
    modifyLogisticsRateCoefficient,
})(injectIntl(Configuration));
