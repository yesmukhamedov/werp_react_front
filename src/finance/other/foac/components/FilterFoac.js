import React from 'react';
import { Form, Input, Segment } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DropdownClearable from '../../../../utils/DropdownClearable';
import {
    momentToStringYYYYMMDD,
    stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import OutputErrors from '../../../../general/error/outputErrors';

const FilterFoac = props => {
    const {
        onChangeFilter = () => {},
        messages,
        filterData = {},
        language,
        handleSearchFilter,
        countryOptions = [],
        companyOptions = [],
        branchOptions = {},
        finAgentOptions = [],
        statusOptions = [],
        error,
    } = props;
    return (
        <Segment>
            <Form>
                <Form.Group widths="equal">
                    <Form.Field>
                        <label>{messages['country']}</label>
                        <DropdownClearable
                            className="alignBottom"
                            fluid
                            placeholder={messages['country']}
                            value={filterData.countryId}
                            options={countryOptions}
                            onChange={(e, { value }) =>
                                onChangeFilter('countryId', value)
                            }
                            handleClear={() => onChangeFilter('clearCountryId')}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>{messages['bukrs']}</label>
                        <DropdownClearable
                            fluid
                            placeholder={messages['bukrs']}
                            value={filterData.bukrs}
                            options={companyOptions}
                            onChange={(e, { value }) =>
                                onChangeFilter('bukrs', value)
                            }
                            className="alignBottom"
                            handleClear={() => onChangeFilter('clearBukrs')}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Филиал</label>
                        <DropdownClearable
                            fluid
                            placeholder="Филиал"
                            value={filterData.branchId}
                            options={
                                filterData.bukrs
                                    ? branchOptions[filterData.bukrs]
                                    : []
                            }
                            onChange={(e, { value }) =>
                                onChangeFilter('branchId', value)
                            }
                            className="alignBottom"
                            handleClear={() => onChangeFilter('clearBranchId')}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Фин. агент</label>
                        <DropdownClearable
                            fluid
                            placeholder="Фин. агент"
                            value={filterData.collectorId}
                            options={finAgentOptions}
                            onChange={(e, { value }) =>
                                onChangeFilter('collectorId', value)
                            }
                            className="alignBottom"
                            handleClear={() =>
                                onChangeFilter('clearCollectorId')
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Статус</label>
                        <DropdownClearable
                            fluid
                            placeholder="Статус"
                            value={filterData.statusId}
                            options={statusOptions}
                            onChange={(e, { value }) =>
                                onChangeFilter('statusId', value)
                            }
                            className="alignBottom"
                            handleClear={() => onChangeFilter('clearStatusId')}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field className="marginRight">
                        <label>{messages['Form.DateFrom']}</label>
                        <DatePicker
                            placeholderText={messages['Form.DateFrom']}
                            isClearable
                            className="date-auto-width"
                            autoComplete="off"
                            locale={language}
                            dropdownMode="select" //timezone="UTC"
                            selected={
                                filterData.dateAt === null
                                    ? ''
                                    : stringYYYYMMDDToMoment(filterData.dateAt)
                            }
                            onChange={date =>
                                onChangeFilter(
                                    'dateAt',
                                    momentToStringYYYYMMDD(date),
                                )
                            }
                            dateFormat="DD.MM.YYYY"
                        />
                    </Form.Field>
                    <Form.Field className="marginRight">
                        <label>{messages['Form.DateTo']}</label>
                        <DatePicker
                            placeholderText={messages['Form.DateTo']}
                            isClearable
                            className="date-auto-width"
                            autoComplete="off"
                            locale={language}
                            dropdownMode="select" //timezone="UTC"
                            selected={
                                filterData.dateTo === null
                                    ? ''
                                    : stringYYYYMMDDToMoment(filterData.dateTo)
                            }
                            onChange={date =>
                                onChangeFilter(
                                    'dateTo',
                                    momentToStringYYYYMMDD(date),
                                )
                            }
                            dateFormat="DD.MM.YYYY"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Поиск по CN</label>
                        <Input
                            type="number"
                            onChange={(e, o) =>
                                onChangeFilter('CN', e.target.value)
                            }
                        />
                    </Form.Field>
                    <Form.Button
                        onClick={handleSearchFilter}
                        color="blue"
                        className="alignBottom"
                    >
                        {messages['apply']}
                    </Form.Button>
                </Form.Group>
            </Form>
            <OutputErrors errors={error} />
        </Segment>
    );
};
export default FilterFoac;
