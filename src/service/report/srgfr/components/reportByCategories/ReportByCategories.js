import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Form, Icon } from 'semantic-ui-react';
import DropdownClearable from '../../../../../utils/DropdownClearable';
import {
    f4fetchCategory,
    f4FetchCountryList,
} from '../../../../../reference/f4/f4_action';
import OutputErrors from '../../../../../general/error/outputErrors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    stringYYYYMMDDToMoment,
    momentToStringYYYYMMDD,
    moneyFormat,
} from '../../../../../utils/helpers';
import { errorTableText } from '../../../../../utils/helpers';
import Table from './Table';
import { fetchReportByCategories } from '../../srgfrAction';

const ReportByCategories = props => {
    const {
        intl: { messages },
        language,
        countries = [],
        branches = [],
        companies = [],
        categories = [],
        reportByCategories = [],
    } = props;

    const [filterParams, setFilterParams] = useState({
        bukrs: null,
        branchId: [],
        countryId: null,
        categoryId: [],
        dateAt: null,
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        props.f4FetchCountryList();
        props.f4fetchCategory();
    }, []);

    const apply = () => {
        if (validation()) {
            const joinIds = {
                ...filterParams,
                branchId: filterParams.branchId.join(),
                categoryId: filterParams.categoryId.join(),
            };
            props.fetchReportByCategories(joinIds);
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
                    <Form.Select
                        multiple
                        selection
                        options={
                            filterParams.bukrs
                                ? branches[filterParams.bukrs]
                                : []
                        }
                        value={filterParams.branchId}
                        placeholder={messages['Task.Branch']}
                        label={messages['Task.Branch']}
                        onChange={(e, { value }) => {
                            setFilterParams({
                                ...filterParams,
                                branchId: value,
                            });
                        }}
                    />

                    <Form.Select
                        multiple
                        selection
                        options={categories.map(item => {
                            return {
                                key: item.id,
                                text: item.name,
                                value: item.id,
                            };
                        })}
                        value={filterParams.categoryId}
                        placeholder={messages['product_category']}
                        label={messages['product_category']}
                        onChange={(e, { value }) =>
                            setFilterParams({
                                ...filterParams,
                                categoryId: value,
                            })
                        }
                    />
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

            <Table data={reportByCategories} />
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
    f4fetchCategory,
    fetchReportByCategories,
})(injectIntl(ReportByCategories));
