import React from 'react';
import { Form } from 'semantic-ui-react';
import {
    momentToStringYYYYMMDD,
    stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Filter = ({
    messages,
    language,
    filterParams,
    onChange,
    loading,
    search,
    clear,
}) => {
    return (
        <Form>
            <Form.Group>
                <Form.Input
                    label={messages['search_by_release_description']}
                    name="description"
                    value={filterParams.description}
                    onChange={onChange}
                />
                <Form.Field>
                    <label>{messages['Form.StartDateFrom']}</label>
                    <DatePicker
                        locale={language}
                        selected={stringYYYYMMDDToMoment(filterParams.dateFrom)}
                        readOnly
                        onChange={date =>
                            onChange(null, {
                                name: 'dateFrom',
                                value: momentToStringYYYYMMDD(date),
                            })
                        }
                        selectsStart
                        startDate={stringYYYYMMDDToMoment(
                            filterParams.dateFrom,
                        )}
                        endDate={stringYYYYMMDDToMoment(filterParams.dateTo)}
                        dateFormat="YYYY-MM-DD"
                    />
                </Form.Field>
                <Form.Field>
                    <label>{messages['Form.StartDateTo']}</label>
                    <DatePicker
                        locale={language}
                        selected={stringYYYYMMDDToMoment(filterParams.dateTo)}
                        readOnly
                        onChange={date =>
                            onChange(null, {
                                name: 'dateTo',
                                value: momentToStringYYYYMMDD(date),
                            })
                        }
                        selectsEnd
                        startDate={stringYYYYMMDDToMoment(
                            filterParams.dateFrom,
                        )}
                        endDate={stringYYYYMMDDToMoment(filterParams.dateTo)}
                        minDate={stringYYYYMMDDToMoment(filterParams.dateFrom)}
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
                    onClick={clear}
                />
            </Form.Group>
        </Form>
    );
};

export default Filter;
