import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import DropdownClearable from '../../../../../utils/DropdownClearable';
import { f4FetchCountryList } from '../../../../../reference/f4/f4_action';
import OutputErrors from '../../../../../general/error/outputErrors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    stringYYYYMMDDToMoment,
    momentToStringYYYYMMDD,
} from '../../../../../utils/helpers';
import { errorTableText } from '../../../../../utils/helpers';
import { fetchCalculationOfManagersBonus } from '../../srgfrAction';
import Table from './Table';
import { Form, Icon } from 'semantic-ui-react';

const CalculationOfManagersBonus = props => {
    const {
        intl: { messages },
        language,
        countries = [],
        branches = [],
        companies = [],
        calculationOfManagersBonus = [],
    } = props;

    const [filterParams, setFilterParams] = useState({
        bukrs: null,
        branchId: null,
        countryId: null,
        dateAt: null,
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        props.f4FetchCountryList();
    }, []);

    const apply = () => {
        if (validation()) {
            props.fetchCalculationOfManagersBonus(filterParams);
        }
    };

    const validation = () => {
        const errors = [];

        if (!filterParams.bukrs) {
            errors.push(errorTableText(5));
        }
        if (!filterParams.dateAt) {
            errors.push(errorTableText(13));
        }

        setErrors(errors);
        return errors.length === 0;
    };

    return (
        <>
            <Form>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>{messages['country']}</label>
                        <DropdownClearable
                            selection
                            options={countries.map(item => {
                                return {
                                    key: item.countryId,
                                    text: item.country,
                                    value: item.countryId,
                                };
                            })}
                            value={filterParams.countryId}
                            placeholder={messages['country']}
                            onChange={(e, { value }) =>
                                setFilterParams({
                                    ...filterParams,
                                    countryId: value,
                                })
                            }
                            handleClear={() =>
                                setFilterParams({
                                    ...filterParams,
                                    countryId: null,
                                })
                            }
                        />
                    </Form.Field>

                    <Form.Field required>
                        <label>{messages['bukrs']}</label>
                        <DropdownClearable
                            selection
                            options={companies ? companies : []}
                            value={filterParams.bukrs}
                            placeholder={messages['bukrs']}
                            onChange={(e, { value }) =>
                                setFilterParams({
                                    ...filterParams,
                                    bukrs: value,
                                })
                            }
                            handleClear={() =>
                                setFilterParams({
                                    ...filterParams,
                                    bukrs: null,
                                    branchId: null,
                                })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>{messages['Task.Branch']}</label>
                        <DropdownClearable
                            selection
                            options={
                                filterParams.bukrs
                                    ? branches[filterParams.bukrs]
                                    : []
                            }
                            value={filterParams.branchId}
                            placeholder={messages['Task.Branch']}
                            onChange={(e, { value }) =>
                                setFilterParams({
                                    ...filterParams,
                                    branchId: value,
                                })
                            }
                            handleClear={() =>
                                setFilterParams({
                                    ...filterParams,
                                    branchId: null,
                                })
                            }
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group className="spaceBetween">
                    <div className="flexDirectionRow">
                        <Form.Field className="marginRight" required>
                            <label>{messages['Form.DateFrom']}</label>
                            <DatePicker
                                placeholderText={messages['Form.DateFrom']}
                                isClearable
                                className="date-auto-width"
                                autoComplete="off"
                                locale={language}
                                dropdownMode="select" //timezone="UTC"
                                selected={
                                    filterParams.dateAt === null
                                        ? ''
                                        : stringYYYYMMDDToMoment(
                                              filterParams.dateAt,
                                          )
                                }
                                onChange={date =>
                                    setFilterParams({
                                        ...filterParams,
                                        dateAt: momentToStringYYYYMMDD(date),
                                    })
                                }
                                dateFormat="DD.MM.YYYY"
                            />
                        </Form.Field>
                        <Form.Button
                            color="blue"
                            className="alignBottom"
                            onClick={() => apply()}
                        >
                            <Icon name="search" />
                            {messages['apply']}
                        </Form.Button>
                    </div>
                </Form.Group>
            </Form>

            <OutputErrors errors={errors} />

            <Table data={calculationOfManagersBonus} />
        </>
    );
};

const mapStateToProps = state => {
    return {
        language: state.locales.lang,
    };
};

export default connect(mapStateToProps, {
    f4FetchCountryList,
    fetchCalculationOfManagersBonus,
})(injectIntl(CalculationOfManagersBonus));
