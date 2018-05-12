import React,{Component} from 'react'
import { Form,Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import YearF4 from '../../../../../reference/f4/date/YearF4'
import MonthF4 from '../../../../../reference/f4/date/MonthF4'
require('moment/locale/ru');

/**
 * Поисковая панель
 *
 */

//Отчет Демо/Продажа
export function RepSearch894(props){

    return <Form>
                <Form.Group widths='equal'>
                    {renderBukrsSelect(props)}
                    {renderBranchSelect(props,false)}
                </Form.Group>
                <Form.Group>
                    <Form.Button onClick={props.fetchItems}>
                        Сформировать
                    </Form.Button>
                </Form.Group>
            </Form>
}

//Отчет Демо/Рекомендация
export function RepSearch934(props){

    return RepSearch894(props)
}

//
export function RepSearch914(props){
    return <Form>
        <Form.Group widths='equal'>
            {renderBukrsSelect(props)}
            {renderBranchSelect(props,false)}
        </Form.Group>
        <Form.Group>
            <Form.Button onClick={props.fetchItems}>
                Сформировать
            </Form.Button>
        </Form.Group>
    </Form>
}

function renderBranchSelect(props,multiple){
    return <Form.Select
        name='branchId'
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
