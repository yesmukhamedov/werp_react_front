import React,{Component} from 'react'
import { Form,Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {PositionF4} from '../../../../../reference/f4/position/PositionF4'
import moment from 'moment'
require('moment/locale/ru');

/**
 * Поисковая панель
 *
 */

//Отчет о принятии на работу
export function RepSearch954(props){

    return <Form>
                <Form.Group widths='equal'>
                    {renderBukrsSelect(props)}
                    {renderBranchSelect(props,false)}
                    <Form.Select
                        name='departmentId'
                        search={true}
                        label='Департамент'
                        selectOnBlur={false}
                        options={props.departmentOptions}
                        placeholder='Департамент'
                        onChange={props.handleChange} />

                    <Form.Select
                        name='positionId'
                        search={true}
                        label='Должность'
                        selectOnBlur={false}
                        options={props.positionOptions}
                        placeholder='Должность'
                        onChange={props.handleChange} />


                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <label>Дата С</label>
                        <DatePicker
                            label=""
                            placeholderText={'Дата'}
                            showMonthDropdown showYearDropdown dropdownMode="select"
                            dateFormat="DD.MM.YYYY"
                            selected={props.dateFrom?moment(props.dateFrom):null}
                            onChange={(v) => props.handleDate(v,'dateFrom')}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Дата По</label>
                        <DatePicker
                            label=""
                            placeholderText={'Дата'}
                            showMonthDropdown showYearDropdown dropdownMode="select"
                            dateFormat="DD.MM.YYYY"
                            selected={props.dateTo?moment(props.dateTo):null}
                            onChange={(v) => props.handleDate(v,'dateTo')}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>&nbsp;</label>
                        <Form.Button onClick={props.fetchItems}>
                            Сформировать
                        </Form.Button>
                    </Form.Field>
                </Form.Group>
            </Form>
}

function renderBranchSelect(props,multiple){
    return <Form.Select
        name='branchId'
        search
        multiple={multiple}
        label='Филиал'
        options={props.branchOptions}
        placeholder='Филиал'
        onChange={props.handleChange} />
}

function renderBusinessAreaSelect(props){
    return <Form.Select name='businessAreaId'
                        label='Бизнес сфера'
                        options={props.businessAreaOptions}
                        placeholder='Бизнес сфера'
                        onChange={props.handleChange} />
}

function renderBukrsSelect(props){
    return <Form.Select name='bukrs'
                        label='Компания'
                        options={props.companyOptions}
                        placeholder='Компания'
                        onChange={props.handleChange} />
}
