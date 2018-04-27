import React, {Component} from 'react'
import {Form, Input, TextArea } from 'semantic-ui-react'
import "react-datepicker/dist/react-datepicker.css"



export default function OffDataForm (props) {
    const {model} = props

    return <Form>
        <Form.Group widths='equal'>
            <Form.Select value={model.bukrs || ''}
                         onChange={props.handleChange}
                         name="bukrs"
                         required fluid selection
                         label='Компания' options={props.companyOptions} />

            <Form.Field required>
                <label>Оклад</label>
                <Input value={model.salary || 0} onChange={props.handleChange} type='number' name="salary" />
            </Form.Field>

            <Form.Select value={model.currency}
                         onChange={props.handleChange}
                         name="currency"
                         search
                         required fluid selection
                         label='Валюта' options={props.currencyOptions} />
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field required>
                <label>ОПВ</label>
                <Input value={model.pension || 0} onChange={props.handleChange} type='number' name="pension" />
            </Form.Field>

            <Form.Field required>
                <label>ИПН</label>
                <Input value={model.ipn || 0} onChange={props.handleChange} type='number' name="ipn" />
            </Form.Field>

            <Form.Field required>
                <label>Соц отчисления</label>
                <Input value={model.socialContribution || 0} onChange={props.handleChange} type='number' name="socialContribution" />
            </Form.Field>

        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Select value={model.subCompanyId}
                         onChange={props.handleChange}
                         name="subCompanyId"
                         search
                         required fluid selection
                         label='Фирма' options={props.subCompanyOptions} />

            <Form.Field required>
                <label>Должность</label>
                <Input value={model.position || ''} onChange={props.handleChange} name="position" />
            </Form.Field>

            <Form.Field
                control={TextArea} value={model.note || ''}
                label='Примечание' onChange={props.handleChange} placeholder='Примечание' name="note" />

        </Form.Group>

    </Form>
}