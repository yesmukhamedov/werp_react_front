import React from 'react';
import {Form, Input} from 'semantic-ui-react'

/**
 * Компонент для рендеринга формы адреса
 */

export default function StaffAddressForm(props){
    const {address,countryOptions,stateOptions,cityOptions,regionOptions,errors} = props
    if(!address){
        return ''
    }
    return <div>
        <Form.Group widths='equal'>
            <Form.Select
                error={errors['countryId']}
                name="countryId"
                required
                onChange={props.handleChange}
                label='Страна'
                options={countryOptions}
                placeholder='Страна' />
            <Form.Select
                error={errors['stateId']}
                name="stateId"
                onChange={props.handleChange}
                required
                label='Область'
                options={stateOptions}
                placeholder='Область' />
            <Form.Select
                error={errors['cityId']}
                required
                name="cityId"
                onChange={props.handleChange}
                label='Город'
                options={cityOptions}
                placeholder='Город' />
            <Form.Select
                error={errors['regId']}
                required
                name="regId"
                onChange={props.handleChange}
                label='Район'
                options={regionOptions}
                placeholder='Район' />
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field
                name="microdistrict"
                onChange={props.handleChange}
                value={address.microdistrict}
                control={Input}
                label='Микрорайон'
                placeholder='Микрорайон' />

            <Form.Field
                name="village"
                onChange={props.handleChange}
                value={address.village}
                control={Input}
                label='Поселок'
                placeholder='Поселок' />
        </Form.Group>

        <Form.Group widths='equal'>
            <Form.Field
                name="avenue"
                onChange={props.handleChange}
                value={address.avenue}
                control={Input}
                label='Проспект'
                placeholder='Проспект' />

            <Form.Field
                name="street"
                onChange={props.handleChange}
                value={address.street}
                control={Input}
                label='Ул.(просп./мкр.)'
                placeholder='Ул.(просп./мкр.)' />

            <Form.Field
                name="apNumber"
                onChange={props.handleChange}
                value={address.apNumber}
                control={Input}
                label='Дом'
                placeholder='Дом' />

            <Form.Field
                name="flatNumber"
                onChange={props.handleChange}
                value={address.flatNumber}
                control={Input}
                label='квартира №'
                placeholder='квартира №' />
        </Form.Group>
    </div>
}