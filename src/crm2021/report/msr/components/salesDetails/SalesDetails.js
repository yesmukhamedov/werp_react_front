import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import Table from './Table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    momentToStringDDMMYYYY,
    stringToMoment,
} from '../../../../../utils/helpers';
import { fetchSalesDetails } from '../../action';

const SalesDetails = props => {
    const {
        language,
        messages,
        countriesOptions = [],
        companies = [],
        branches = [],
        businessAreasOptions = [],
        salesDetails = [],
    } = props;

    const [filterParams, setFilterParams] = useState({
        bukrs: '',
        branchIdList: [],
        countryIdList: [],
        businessAreaIdList: [],
        contractDateFrom: '',
        contractDateTo: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        branchIdList: false,
        bukrs: false,
        contractDateFrom: false,
        contractDateTo: false,
    });

    const handleChange = (e, data) => {
        const { name, value } = data;
        setFilterParams({
            ...filterParams,
            [name]: value,
        });
    };

    const search = () => {
        if (validation()) {
            setLoading(true);
            const joinIds = {
                ...filterParams,
                branchIdList: filterParams.branchIdList.join(),
                countryIdList: filterParams.countryIdList.join(),
                businessAreaIdList: filterParams.businessAreaIdList.join(),
            };
            props.fetchSalesDetails(joinIds, () => {
                setLoading(false);
            });
        }
    };

    const isEmpty = field =>
        field === '' ||
        field === undefined ||
        field === null ||
        field.length === 0;

    const validation = () => {
        const {
            contractDateFrom,
            contractDateTo,
            bukrs,
            branchIdList,
        } = filterParams;
        const errors = {
            bukrs: isEmpty(bukrs),
            branchIdList: isEmpty(branchIdList),
            contractDateFrom: isEmpty(contractDateFrom),
            contractDateTo: isEmpty(contractDateTo),
        };
        setErrors(errors);

        return !Object.values(errors).includes(true);
    };

    const clearFilterParams = () => {
        setFilterParams({
            bukrs: [],
            branchIdList: [],
            countryIdList: [],
            businessAreaIdList: [],
            contractDateFrom: '',
            contractDateTo: '',
        });
    };

    const getBusinessAreas = () => {
        if (filterParams.bukrs.length === 0) {
            return [];
        }

        const newBusinessArea = businessAreasOptions
            .filter(area => area.bukrs === filterParams.bukrs)
            .filter(item => item);
        return newBusinessArea.flat();
    };

    const getBranches = () => {
        if (filterParams.businessAreaIdList.length === 0) {
            return [];
        }

        const newBranches = filterParams.businessAreaIdList
            .map(id =>
                Object.values(branches)
                    .flat()
                    .filter(({ businessareaid }) => businessareaid === id),
            )
            .filter(item => item);
        return newBranches.flat();
    };

    return (
        <>
            <Form>
                <Form.Group widths="equal">
                    <Form.Select
                        fluid
                        options={countriesOptions}
                        label={messages['country']}
                        placeholder={messages['country']}
                        name="countryIdList"
                        onChange={handleChange}
                        value={filterParams.countryIdList}
                        multiple
                        selection
                    />
                    <Form.Select
                        fluid
                        options={companies}
                        label={messages['L__COMPANY']}
                        placeholder={messages['L__COMPANY']}
                        name="bukrs"
                        onChange={handleChange}
                        value={filterParams.bukrs}
                        selection
                        required
                        error={errors.bukrs}
                    />
                    <Form.Select
                        fluid
                        options={getBusinessAreas()}
                        label="Бизнес Сфера"
                        placeholder="Бизнес Сфера"
                        name="businessAreaIdList"
                        onChange={handleChange}
                        value={filterParams.businessAreaIdList}
                        multiple
                        selection
                    />
                    <Form.Select
                        fluid
                        options={getBranches()}
                        label={messages['branches']}
                        placeholder={messages['branches']}
                        name="branchIdList"
                        onChange={handleChange}
                        value={filterParams.branchIdList}
                        multiple
                        selection
                        required
                        error={errors.branchIdList}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Field required error={errors.contractDateFrom}>
                        <label>Период продаж с</label>
                        <DatePicker
                            locale={language}
                            selected={stringToMoment(
                                filterParams.contractDateFrom,
                                'DD.MM.YYYY',
                            )}
                            readOnly
                            onChange={date =>
                                setFilterParams(prev => ({
                                    ...prev,
                                    contractDateFrom: momentToStringDDMMYYYY(
                                        date,
                                    ),
                                }))
                            }
                            selectsStart
                            startDate={stringToMoment(
                                filterParams.contractDateFrom,
                                'DD.MM.YYYY',
                            )}
                            endDate={stringToMoment(
                                filterParams.contractDateTo,
                                'DD.MM.YYYY',
                            )}
                            dateFormat="DD.MM.YYYY"
                        />
                    </Form.Field>
                    <Form.Field required error={errors.contractDateTo}>
                        <label>Период продаж до</label>
                        <DatePicker
                            locale={language}
                            selected={stringToMoment(
                                filterParams.contractDateTo,
                                'DD.MM.YYYY',
                            )}
                            readOnly
                            onChange={date =>
                                setFilterParams(prev => ({
                                    ...prev,
                                    contractDateTo: momentToStringDDMMYYYY(
                                        date,
                                    ),
                                }))
                            }
                            selectsEnd
                            startDate={stringToMoment(
                                filterParams.contractDateFrom,
                                'DD.MM.YYYY',
                            )}
                            endDate={stringToMoment(
                                filterParams.contractDateTo,
                                'DD.MM.YYYY',
                            )}
                            minDate={stringToMoment(
                                filterParams.contractDateFrom,
                                'DD.MM.YYYY',
                            )}
                            dateFormat="DD.MM.YYYY"
                        />
                    </Form.Field>
                    <Form.Button
                        content={messages['search']}
                        color="black"
                        label="&nbsp;"
                        icon="search"
                        loading={loading}
                        onClick={search}
                    />
                    <Form.Button
                        content={messages['clear']}
                        color="black"
                        label="&nbsp;"
                        icon="eraser"
                        onClick={clearFilterParams}
                    />
                    <Form.Button
                        content={messages['export_to_excel']}
                        color="black"
                        label="&nbsp;"
                        icon="file excel outline"
                    />
                </Form.Group>
            </Form>
            <Table messages={messages} data={salesDetails} />
        </>
    );
};

export default connect(null, {
    fetchSalesDetails,
})(SalesDetails);
