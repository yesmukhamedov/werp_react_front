import React, { forwardRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Divider, Button, Form, Dropdown, Input } from 'semantic-ui-react';
import { f4FetchCountryList } from '../../../../../reference/f4/f4_action';
import Table from './Table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SalesDetails = props => {
    const {
        language,
        messages,
        countriesOptions = [],
        companies = [],
        branches = [],
    } = props;

    const [filterParams, setFilterParams] = useState({
        bukrs: null,
        branchId: null,
        countryId: null,
        periodOfSales: null,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        props.f4FetchCountryList();
    }, []);

    const handleChange = (e, data) => {
        const { name, value } = data;
        setFilterParams({
            ...filterParams,
            [name]: value,
        });
    };

    const search = () => {
        setLoading(true);
    };

    const clearFilterParams = () =>
        setFilterParams({
            bukrs: null,
            branchId: null,
            countryId: null,
            periodOfSales: null,
        });

    return (
        <>
            <Form>
                <Form.Group widths="equal">
                    <Form.Select
                        fluid
                        options={countriesOptions}
                        label={messages['country']}
                        placeholder={messages['country']}
                        name="countryId"
                        onChange={handleChange.bind()}
                        value={filterParams.countryId}
                    />
                    <Form.Select
                        fluid
                        options={companies}
                        label={messages['L__COMPANY']}
                        placeholder={messages['L__COMPANY']}
                        name="bukrs"
                        onChange={handleChange.bind()}
                        value={filterParams.bukrs}
                    />
                    <Form.Select
                        fluid
                        options={companies}
                        label="Бизнес Сфера"
                        placeholder="Бизнес Сфера"
                    />
                    <Form.Select
                        fluid
                        options={
                            filterParams.bukrs
                                ? branches[filterParams.bukrs]
                                : []
                        }
                        label={messages['branches']}
                        placeholder={messages['branches']}
                        name="branchId"
                        onChange={handleChange.bind()}
                        value={filterParams.branchId}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Период продаж</label>
                        <DatePicker
                            locale={language}
                            selected={filterParams.periodOfSales}
                            readOnly
                            name="periodOfSales"
                            onChange={handleChange.bind()}
                        />
                    </Form.Field>
                    <Form.Button
                        content={messages['search']}
                        color="black"
                        label="&nbsp;"
                        icon="search"
                        loading={loading}
                        onClick={search.bind()}
                    />
                    <Form.Button
                        content={messages['clear']}
                        color="black"
                        label="&nbsp;"
                        icon="eraser"
                        onClick={clearFilterParams.bind()}
                    />
                    <Form.Button
                        content={messages['export_to_excel']}
                        color="black"
                        label="&nbsp;"
                        icon="file excel outline"
                    />
                </Form.Group>
            </Form>
            <Table messages={messages} />
        </>
    );
};

export default connect(null, {
    f4FetchCountryList,
})(SalesDetails);
