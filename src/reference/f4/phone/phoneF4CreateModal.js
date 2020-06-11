import React, { useState, useEffect } from 'react';
import {
  Modal,
  Icon,
  Button,
  Dropdown,
  Input,
  Table,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import MaskedInput from 'react-text-mask';

import phoneMask from '../../../utils/phoneMask';
import { f4PostPhone, f4FetchPhone } from '../f4_action';

function PhoneF4CreateModal(props) {
  const emptyList = {
    typeId: 0,
    phone: '',
    description: 'CREATE NUMBER',
  };
  const [list, setList] = useState({ ...emptyList });
  const [errors, setErrors] = useState([]);
  const [errDropdown, setErrDropdown] = useState(false);
  const [errInput, setErrInput] = useState(false);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');

  const {
    intl: { messages },
    phoneListType = [],
    customerId,
    country,
    lang,
  } = props;

  const onInputChange = (o, fieldName) => {
    setList(prev => {
      const varList = { ...prev };
      switch (fieldName) {
        case 'typeList':
          varList.typeId = o.value;
          break;
        case 'phoneNumber':
          console.log(o);
          varList.phone = o.replace(/\D+/g, '');
          break;
        default:
          varList[fieldName] = o.value;
      }
      return varList;
    });
  };

  const handleSubmit = () => {
    let errors = [];
    errors = validate();
    const { typeId, phone, description } = list;
    if (errors === null || errors === undefined || errors.length === 0) {
      props.f4PostPhone(
        {
          customerId,
          description,
          phone: `+${phone}`,
          typeId,
        },
        country.countryId,
        () => props.f4FetchPhone(),
      );
      setErrors(errors);
      close();
    }
  };

  const validate = () => {
    const errors = [];
    const { typeId, phone } = list;
    if (typeId === 0 || typeId === undefined || typeId === null) {
      errors.push(errorTable[`20${language}`]);
      setErrDropdown(true);
      return errors;
    } else {
      setErrDropdown(false);
    }
    if (phone === '' || phone === undefined || phone === null) {
      errors.push(errorTable[`20${language}`]);
      setErrInput(true);
      return errors;
    } else {
      setErrInput(false);
    }
    return errors;
  };

  console.log(country);

  const close = () => {
    props.onCloseCreatePhoneF4(false);
    setList({
      typeId: 0,
      phone: '',
      description: 'CREATE NUMBER',
    });
  };
  return (
    <Modal open={props.open} closeOnEscape={false} onClose={close}>
      <Modal.Header>
        <Icon name="pencil" size="big" />
        {messages['add_number']}
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{messages['number_type']}</Table.Cell>
                <Table.Cell>
                  <Form.Dropdown
                    selection
                    search
                    options={getTypeList(phoneListType, lang)}
                    value={list.typeId}
                    onChange={(e, o) => onInputChange(o, 'typeList')}
                    error={errDropdown}
                    inline
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{messages['enter_number']}</Table.Cell>
                <Table.Cell>
                  <Form.Input type="number" error={errInput}>
                    <MaskedInput
                      mask={phoneMask(country.code)}
                      placeholder={`${country.phoneCode} ${country.telPattern}`}
                      onChange={event => {
                        onInputChange(event.target.value, 'phoneNumber');
                      }}
                    />
                  </Form.Input>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          icon
          labelPosition="left"
          color="teal"
          size="small"
          onClick={close}
        >
          <Icon name="left chevron" /> {messages['back']}
        </Button>
        <Button
          icon
          labelPosition="left"
          primary
          size="small"
          onClick={handleSubmit}
        >
          <Icon name="save" /> {messages['save']}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

const getTypeList = (lt, lang) => {
  const phoneListType = lt;
  if (!phoneListType) {
    return [];
  }
  let out = lt.map(e => {
    return {
      key: e.id,
      text: e[`name${lang}`],
      value: e.id,
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  f4PostPhone,
  f4FetchPhone,
})(injectIntl(PhoneF4CreateModal));
