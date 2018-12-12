import React from 'react';
import { Form, Input } from 'semantic-ui-react';

/**
 * Функция для рендеринга формы адреса
 */

export default function StaffAddressForm(props) {
  const {
    address,
    countryOptions,
    stateOptions,
    cityOptions,
    regionOptions,
  } = props;
  if (!address) {
    return '';
  }
  return (
    <div>
      <Form.Group widths="equal">
        <Form.Select
          name="countryId"
          value={address.countryId}
          required
          onChange={(e, data) => props.handleChange(address.type, data)}
          label="Страна"
          options={countryOptions}
          placeholder="Страна"
        />

        <Form.Select
          value={address.stateId}
          name="stateId"
          onChange={(e, data) => props.handleChange(address.type, data)}
          required
          label="Область"
          options={stateOptions}
          placeholder="Область"
        />

        <Form.Select
          value={address.cityId}
          required
          name="cityId"
          onChange={(e, data) => props.handleChange(address.type, data)}
          label="Город"
          options={cityOptions}
          placeholder="Город"
        />

        <Form.Select
          value={address.regId}
          required
          name="regId"
          onChange={(e, data) => props.handleChange(address.type, data)}
          label="Район"
          options={regionOptions}
          placeholder="Район"
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field
          name="microdistrict"
          onChange={(e, data) => props.handleChange(address.type, data)}
          value={address.microdistrict || ''}
          control={Input}
          label="Микрорайон"
          placeholder="Микрорайон"
        />

        <Form.Field
          name="village"
          onChange={(e, data) => props.handleChange(address.type, data)}
          value={address.village || ''}
          control={Input}
          label="Поселок"
          placeholder="Поселок"
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field
          name="avenue"
          onChange={(e, data) => props.handleChange(address.type, data)}
          value={address.avenue || ''}
          control={Input}
          label="Проспект"
          placeholder="Проспект"
        />

        <Form.Field
          name="street"
          onChange={(e, data) => props.handleChange(address.type, data)}
          value={address.street || ''}
          control={Input}
          label="Ул.(просп./мкр.)"
          placeholder="Ул.(просп./мкр.)"
        />

        <Form.Field
          name="apNumber"
          onChange={(e, data) => props.handleChange(address.type, data)}
          value={address.apNumber || ''}
          control={Input}
          label="Дом"
          placeholder="Дом"
        />

        <Form.Field
          name="flatNumber"
          onChange={(e, data) => props.handleChange(address.type, data)}
          value={address.flatNumber || ''}
          control={Input}
          label="квартира №"
          placeholder="квартира №"
        />
      </Form.Group>
    </div>
  );
}
