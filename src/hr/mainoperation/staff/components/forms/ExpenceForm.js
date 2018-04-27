import React, {Component} from 'react'
import {Form, Input, TextArea } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'



export default function ExpenceForm (props) {
    const {model} = props

    return <Form>
        <Form.Group widths='equal'>
            <Form.Select value={model.bukrs}
                         onChange={props.handleChange}
                         name="bukrs"
                         required fluid selection
                         label='Компания' options={props.companyOptions} />

            <Form.Field required>
                <label>Сумма</label>
                <Input value={model.amount || 0} onChange={props.handleChange} type='number' name="amount" />
            </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field required>
                <label>Дата с</label>
                <DatePicker
                    label=''
                    placeholderText={'Дата с'}
                    showMonthDropdown showYearDropdown dropdownMode='select'
                    dateFormat='DD.MM.YYYY' selected={model.expenseDate?moment(model.expenseDate):null}
                    onChange={(v) => props.handleDate('expenseDate', v)} />
            </Form.Field>

            <Form.Select value={model.type}
                         onChange={props.handleChange}
                         name="type"
                         search
                         required fluid selection
                         label='Тип расхода' options={props.expenceTypeOptions} />
        </Form.Group>

        <Form.Group widths='equal'>

            <Form.Select value={model.currency}
                         onChange={props.handleChange}
                         name="currency"
                         search
                         required fluid selection
                         label='Валюта' options={props.currencyOptions} />

            <Form.Field
                control={TextArea} value={model.description || ''}
                label='Примечание' onChange={props.handleChange} placeholder='Примечание' name="description" />

        </Form.Group>

    </Form>
}