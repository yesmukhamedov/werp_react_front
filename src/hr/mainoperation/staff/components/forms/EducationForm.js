import React, {Component} from 'react'
import {Form, Input } from 'semantic-ui-react'
import "react-datepicker/dist/react-datepicker.css"



export default function EducationForm (props) {
    const {model} = props
    let levels = []
    if(model.levels){
        for(let k in model.levels){
            levels.push({
                key: k,
                value: k,
                text: model.levels[k]
            })
        }
    }
    return <Form>
        <Form.Group widths='equal'>
            <Form.Field required>
                <label>Название УЗ</label>
                <Input value={model.institutionName || ''} onChange={props.handleChange} name="institutionName" />
            </Form.Field>

            <Form.Field required>
                <label>Факультет</label>
                <Input value={model.faculty || ''} onChange={props.handleChange} name="faculty" />
            </Form.Field>

            <Form.Field required>
                <label>Спец.</label>
                <Input value={model.specialization || ''} onChange={props.handleChange} name="specialization" />
            </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field required>
                <label>Год начало</label>
                <Input value={model.beginYear || ''} onChange={props.handleChange} type='number' name="beginYear" />
            </Form.Field>

            <Form.Field required>
                <label>Год окончания</label>
                <Input value={model.endYear || ''} onChange={props.handleChange} type='number' name="endYear" />
            </Form.Field>

            <Form.Select value={model.level}
                         onChange={props.handleChange}
                         name="level"
                         search
                         required fluid selection
                         label='Уровень' options={levels} />
        </Form.Group>

    </Form>
}