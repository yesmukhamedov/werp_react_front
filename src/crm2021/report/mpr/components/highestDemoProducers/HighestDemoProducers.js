import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import Table from './Table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    momentToStringYYYYMMDD,
    stringYYYYMMDDToMoment,
} from '../../../../../utils/helpers';
import { fetchHighestDemoProducers } from '../../action';

const HighestDemoProducers = props => {
    const {
        language,
        messages,
        countriesOptions = [],
        companies = [],
        branches = [],
        highestDemoProducers = [],
        businessAreasOptions = [],
    } = props;

    const [filterParams, setFilterParams] = useState({
        companyIds: [],
        branchIds: [],
        countryIds: [],
        businessAreaIds: [],
        dateFrom: null,
        dateTo: null,
        qtyFrom: 0,
        qtyTo: 0,
    });
    const [loading, setLoading] = useState(false);
    const [exportToExcelLoading, setExportToExcelLoading] = useState(false);
    const [errors, setErrors] = useState({
        dateFrom: false,
        dateTo: false,
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
                companyIds: filterParams.companyIds.join(),
                branchIds: filterParams.branchIds.join(),
                countryIds: filterParams.countryIds.join(),
                businessAreaIds: filterParams.businessAreaIds.join(),
            };
            props.fetchHighestDemoProducers(joinIds, () => {
                setLoading(false);
            });
        }
    };

    const exportToExcel = () => {
        if (validation()) {
            setExportToExcelLoading(true);
            const joinIds = {
                ...filterParams,
                companyIds: filterParams.companyIds.join(),
                branchIds: filterParams.branchIds.join(),
                countryIds: filterParams.countryIds.join(),
                businessAreaIds: filterParams.businessAreaIds.join(),
                toExcel: true,
            };
            props.fetchHighestDemoProducers(joinIds, () => {
                setExportToExcelLoading(false);
            });
        }
    };

    const clearFilterParams = () =>
        setFilterParams({
            companyIds: [],
            branchIds: [],
            countryIds: [],
            businessAreaIds: [],
            dateFrom: null,
            dateTo: null,
            qtyFrom: 0,
            qtyTo: 0,
        });

    const getBranches = () => {
        if (filterParams.businessAreaIds.length === 0) {
            return [];
        }

        const newBranches = filterParams.businessAreaIds
            .map(id =>
                Object.values(branches)
                    .flat()
                    .find(({ businessareaid }) => businessareaid === id),
            )
            .filter(item => item);
        return newBranches.flat();
    };

    const validation = () => {
        const { dateFrom, dateTo } = filterParams;
        const errors = {
            dateFrom: dateFrom === '' || dateFrom === null,
            dateTo: dateTo === '' || dateTo === null,
        };
        setErrors(errors);

        return !Object.values(errors).includes(true);
    };

    const getBusinessAreas = () => {
        if (filterParams.companyIds.length === 0) {
            return [];
        }

        const newBusinessArea = filterParams.companyIds
            .map(id => {
                return businessAreasOptions.find(area => area.bukrs === id);
            })
            .filter(item => item);
        return newBusinessArea.flat();
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
                        name="countryIds"
                        onChange={handleChange}
                        value={filterParams.countryIds}
                        multiple
                        selection
                    />
                    <Form.Select
                        fluid
                        options={companies}
                        label={messages['L__COMPANY']}
                        placeholder={messages['L__COMPANY']}
                        name="companyIds"
                        onChange={handleChange}
                        value={filterParams.companyIds}
                        multiple
                        selection
                    />
                    <Form.Select
                        fluid
                        options={getBusinessAreas()}
                        label="Бизнес Сфера"
                        placeholder="Бизнес Сфера"
                        name="businessAreaIds"
                        onChange={handleChange}
                        value={filterParams.businessAreaIds}
                        multiple
                        selection
                    />
                    <Form.Select
                        fluid
                        options={getBranches()}
                        label={messages['branches']}
                        placeholder={messages['branches']}
                        name="branchIds"
                        onChange={handleChange}
                        value={filterParams.branchIds}
                        multiple
                        selection
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input
                        label="Количество демо от"
                        placeholder="Количество демо от"
                        width={4}
                        name="qtyFrom"
                        onChange={handleChange}
                        value={filterParams.qtyFrom}
                        type="number"
                    />
                    <Form.Input
                        label="Количество демо до"
                        placeholder="Количество демо до"
                        width={4}
                        name="qtyTo"
                        onChange={handleChange}
                        value={filterParams.qtyTo}
                        type="number"
                    />
                    <Form.Field required error={errors.dateFrom}>
                        <label>Период демонстраций с</label>
                        <DatePicker
                            locale={language}
                            selected={stringYYYYMMDDToMoment(
                                filterParams.dateFrom,
                            )}
                            readOnly
                            onChange={date =>
                                setFilterParams(prev => ({
                                    ...prev,
                                    dateFrom: momentToStringYYYYMMDD(date),
                                }))
                            }
                            selectsStart
                            startDate={stringYYYYMMDDToMoment(
                                filterParams.dateFrom,
                            )}
                            endDate={stringYYYYMMDDToMoment(
                                filterParams.dateTo,
                            )}
                            dateFormat="YYYY-MM-DD"
                        />
                    </Form.Field>
                    <Form.Field required error={errors.dateTo}>
                        <label>Период демонстраций до</label>
                        <DatePicker
                            locale={language}
                            selected={stringYYYYMMDDToMoment(
                                filterParams.dateTo,
                            )}
                            readOnly
                            onChange={date =>
                                setFilterParams(prev => ({
                                    ...prev,
                                    dateTo: momentToStringYYYYMMDD(date),
                                }))
                            }
                            selectsEnd
                            startDate={stringYYYYMMDDToMoment(
                                filterParams.dateFrom,
                            )}
                            endDate={stringYYYYMMDDToMoment(
                                filterParams.dateTo,
                            )}
                            minDate={stringYYYYMMDDToMoment(
                                filterParams.dateFrom,
                            )}
                            dateFormat="YYYY-MM-DD"
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
                        onClick={exportToExcel}
                        loading={exportToExcelLoading}
                    />
                </Form.Group>
            </Form>
            <Table messages={messages} data={highestDemoProducers} />
        </>
    );
};

export default connect(null, {
    fetchHighestDemoProducers,
})(HighestDemoProducers);
