import React from 'react'
import {Form, Input, TextArea } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'

import {SALARY_TYPES} from '../../../../hrUtil'

export default function SalaryFormModal(props) {
    const {model} = props

   return <Form>
        <Form.Group widths='equal'>
            <Form.Select value={model.bukrs}
                         onChange={props.handleChange}
                         name="bukrs"
                         required fluid selection
                         label='Компания' options={props.companyOptions}/>

            <Form.Select value={model.businessAreaId}
                         onChange={props.handleChange}
                         name="businessAreaId"
                         required fluid selection
                         label='Бизнес сфера' options={props.businessAreaOptions}/>
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Select value={model.branchId}
                         onChange={props.handleChange}
                         name="branchId"
                         search
                         required fluid selection
                         label='Филиал' options={props.branchOptions}/>

            <Form.Select value={model.parentPyramidId}
                         onChange={props.handleChange}
                         name="parentPyramidId"
                         search
                         required fluid selection
                         label='Иерархия (родитель)' options={props.pyramidOptions}/>
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Select value={model.positionId}
                         onChange={props.handleChange}
                         name="positionId"
                         search
                         required fluid selection
                         label='Должность' options={props.positionOptions}/>

            <Form.Select value={model.waers}
                         onChange={props.handleChange}
                         name="waers"
                         required fluid selection
                         label='Валюта' options={props.currencyOptions}/>
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field required>
                <label>Дата с</label>
                <DatePicker
                    autoComplete="off"
                    label=''
                    placeholderText={'Дата с'}
                    showMonthDropdown showYearDropdown dropdownMode='select'
                    dateFormat='DD.MM.YYYY' selected={model.begDate ? moment(model.begDate) : null}
                    onChange={(v) => props.handleDate('begDate', v)}/>
            </Form.Field>

            <Form.Select value={model.departmentId}
                         onChange={props.handleChange}
                         name="departmentId"
                         search
                         required fluid selection
                         label='Отдел' options={props.departmentOptions}/>
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field required>
                <label>Дата увольнения</label>
                <DatePicker
                    autoComplete="off"
                    label=''
                    placeholderText={'Дата увольнения'}
                    showMonthDropdown showYearDropdown dropdownMode='select'
                    dateFormat='DD.MM.YYYY' selected={model.endDate ? moment(model.endDate) : null}
                    onChange={(v) => props.handleDate('endDate', v)}/>
            </Form.Field>

            <Form.Select value={model.salaryType}
                         onChange={props.handleChange}
                         name="salaryType"
                         required fluid selection
                         label='Тип зарплаты' options={SALARY_TYPES}/>
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field required>
                <label>Оклад</label>
                <Input value={model.amount || 0} onChange={props.handleChange} type='number' name="amount"/>
            </Form.Field>

            <Form.Field
                control={TextArea} value={model.note || ''}
                label='Примечание' onChange={props.handleChange} placeholder='Примечание' name="note"/>
        </Form.Group>

    </Form>
}