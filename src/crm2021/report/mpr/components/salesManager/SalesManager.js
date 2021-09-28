import React, { forwardRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Divider, Button, Form, Dropdown, Input } from 'semantic-ui-react';
import { f4FetchCountryList } from '../../../../../reference/f4/f4_action';
import Table from './Table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { fetchSalesManager } from '../../action';

const SalesManager = props => {
    const {
        language,
        messages,
        countriesOptions = [],
        companies = [],
        branches = [],
        salesManager = [],
        businessAreasOptions = [],
    } = props;

    const [filterParams, setFilterParams] = useState({
        companyIds: [],
        branchIds: [],
        countryIds: [],
        businessAreaIds: [],
        qtyFrom: 0,
        qtyTo: 0,
    });
    const [period, setPeriod] = useState(null);
    const [loading, setLoading] = useState(false);
    const [exportToExcelLoading, setExportToExcelLoading] = useState(false);
    const [errors, setErrors] = useState({
        period: false,
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
                year: moment(period).format('YYYY'),
                month: moment(period).format('MM'),
            };
            props.fetchSalesManager(joinIds, () => {
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
                year: moment(period).format('YYYY'),
                month: moment(period).format('MM'),
            };
            props.fetchSalesManager(joinIds, () => {
                setExportToExcelLoading(false);
            });
        }
    };

    const clearFilterParams = () => {
        setFilterParams({
            companyIds: [],
            branchIds: [],
            countryIds: [],
            businessAreaIds: [],
            qtyFrom: 0,
            qtyTo: 0,
        });
        setPeriod(null);
    };

    const getBranches = () => {
        if (
            filterParams.companyIds.length === 0 ||
            filterParams.businessAreaIds.length === 0
        ) {
            return [];
        }

        const newBranches = filterParams.companyIds
            .map(id => branches[id])
            .filter(item => item);
        return newBranches.flat();
    };

    const validation = () => {
        const errors = {
            period: period === '' || period === null,
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
                        label="Количество продаж от"
                        placeholder="Количество демо от"
                        width={4}
                        name="qtyFrom"
                        onChange={handleChange}
                        value={filterParams.qtyFrom}
                        type="number"
                    />
                    <Form.Input
                        label="Количество продаж до"
                        placeholder="Количество демо до"
                        width={4}
                        name="qtyTo"
                        onChange={handleChange}
                        value={filterParams.qtyTo}
                        type="number"
                    />
                    <Form.Field required error={errors.period}>
                        <label>Период продаж</label>
                        <DatePicker
                            locale={language}
                            selected={period}
                            readOnly
                            onChange={date => setPeriod(date)}
                            dateFormat="YYYY-MM"
                            showMonthYearPicker
                            showFullMonthYearPicker
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
            <Table messages={messages} data={salesManager} />
        </>
    );
};

export default connect(null, {
    fetchSalesManager,
})(SalesManager);
