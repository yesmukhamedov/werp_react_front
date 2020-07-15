import React, { useState, useEffect } from 'react';
import { Modal, Icon, Button, Dropdown, Table, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import MaskedInput from 'react-text-mask';

import phoneUpdateMask from '../../../utils/phoneUpdateMask';
import { f4UpdatePhone, f4FetchPhone, f4FetchPhoneHistory } from '../f4_action';

function PhoneF4UpdateModal(props) {
  const emptyList = {
    id: 0,
    typeId: 0,
    phone: '',
    description: '',
  };

  const [list, setList] = useState({ ...emptyList });
  const [errors, setErrors] = useState([]);
  const [errTextarea, setErrTextarea] = useState(false);
  const [errInput, setErrInput] = useState(false);

  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');

  const {
    intl: { messages },
    phoneListType = [],
    customerId,
    selectedPhone,
    country,
    lang,
  } = props;

  useEffect(() => {
    if (selectedPhone) {
      setList({ ...list, typeId: selectedPhone.typeId });
    }
  }, [selectedPhone]);

  const onInputChange = (o, fieldName) => {
    setList(prev => {
      const varList = { ...prev };
      varList.id = selectedPhone.id;
      switch (fieldName) {
        case 'typeList':
          varList.typeId = o.value;
          break;
        case 'phoneNumber':
          varList.phone = o.replace(/\D+/g, '');
          break;
        case 'description':
          varList.description = o.value;
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
    const { id, typeId, phone, description } = list;
    if (errors === null || errors === undefined || errors.length === 0) {
      props.f4UpdatePhone(
        {
          id,
          typeId,
          phone: `+${phone}`,
          description,
          customerId,
        },
        country.countryId,
        () => {
          props.f4FetchPhone();
          props.f4FetchPhoneHistory();
        },
      );
      setErrors(errors);
      clearList();

      props.onCloseUpdatePhoneF4(false);
    }
  };

  const validate = () => {
    const errors = [];
    const { typeId, phone, description } = list;
    if (typeId === 0 || typeId === undefined || typeId === null) {
      errors.push(errorTable[`20${language}`]);
      return errors;
    }
    if (phone === '' || phone === undefined || phone === null) {
      errors.push(errorTable[`20${language}`]);
      setErrInput(true);
      return errors;
    } else {
      setErrInput(false);
    }
    if (
      description === '' ||
      description === undefined ||
      description === null
    ) {
      errors.push(errorTable[`20${language}`]);
      setErrTextarea(true);
      return errors;
    } else {
      setErrTextarea(false);
    }
    return errors;
  };

  const clearList = () => {
    setList({
      id: 0,
      typeId: '',
      phone: '',
      description: '',
    });
  };

  const close = () => {
    props.onCloseUpdatePhoneF4(false);
    clearList();
  };

  return (
    <Modal open={props.open} closeOnEscape={false} onClose={close}>
      <Modal.Header>
        <Icon name="pencil" size="big" />
        {messages['update_number']}
      </Modal.Header>
      <Modal.Content>
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{messages['number_type']}</Table.Cell>
              <Table.Cell>
                <Dropdown
                  selection
                  search
                  options={getTypeList(phoneListType, lang)}
                  value={list.typeId}
                  onChange={(e, o) => onInputChange(o, 'typeList')}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{messages['update_number']}</Table.Cell>
              <Table.Cell>
                <Form>
                  <Form.Input type="number" error={errInput}>
                    <MaskedInput
                      mask={phoneUpdateMask(country.code)}
                      placeholder={`${country.phoneCode} ${country.telPattern}`}
                      defaultValue={selectedPhone.phone}
                      onChange={event => {
                        onInputChange(event.target.value, 'phoneNumber');
                      }}
                    />
                  </Form.Input>
                </Form>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{messages['L__EDIT_DESCRIPTION']}</Table.Cell>
              <Table.Cell>
                <Form>
                  <Form.TextArea
                    placeholder={messages['description']}
                    onChange={(e, o) => onInputChange(o, 'description')}
                    error={errTextarea}
                  />
                </Form>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
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
  f4UpdatePhone,
  f4FetchPhone,
  f4FetchPhoneHistory,
})(injectIntl(PhoneF4UpdateModal));
