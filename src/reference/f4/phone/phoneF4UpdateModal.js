import React, { useState } from 'react';
import {
  Modal,
  Icon,
  Button,
  Dropdown,
  Input,
  Table,
  TextArea,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import MaskedInput from 'react-text-mask';

import phoneMask from '../../../utils/phoneMask';
import { f4UpdatePhone, fetchPhone, fetchPhoneHistory } from '../f4_action';

function PhoneF4UpdateModal(props) {
  const emptyList = {
    id: 0,
    typeId: 0,
    phone: '',
    description: '',
  };

  const [list, setList] = useState({ ...emptyList });
  const [errors, setErrors] = useState([]);

  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');

  const {
    intl: { messages },
    phoneListType = [],
    customerId,
    selectedPhone,
    country,
  } = props;

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
          phone,
          description,
          customerId,
        },
        () => {
          props.fetchPhone();
          props.fetchPhoneHistory();
        },
      );
      setErrors(errors);
      props.onCloseUpdatePhoneF4(false);
    }
  };

  const validate = () => {
    const errors = [];
    const { typeId, phone } = list;
    if (typeId === 0 || typeId === undefined || typeId === null) {
      errors.push(errorTable[`20${language}`]);
      return errors;
    }
    if (phone === '' || phone === undefined || phone === null) {
      errors.push(errorTable[`20${language}`]);
      return errors;
    }
    return errors;
  };

  const close = () => {
    props.onCloseUpdatePhoneF4(false);
    setList({
      id: 0,
      typeId: '',
      phone: '',
      description: '',
    });
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
                  options={getTypeList(phoneListType)}
                  defaultValue={selectedPhone.typeId}
                  onChange={(e, o) => onInputChange(o, 'typeList')}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{messages['update_number']}</Table.Cell>
              <Table.Cell>
                <Input type="number">
                  <MaskedInput
                    mask={phoneMask(country.code)}
                    placeholder={`${country.phoneCode} ${country.telPattern}`}
                    defaultValue={selectedPhone.phone}
                    onChange={event => {
                      onInputChange(event.target.value, 'phoneNumber');
                    }}
                  />
                </Input>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{messages['L__EDIT_DESCRIPTION']}</Table.Cell>
              <Table.Cell>
                <Form>
                  <TextArea
                    placeholder={messages['description']}
                    onChange={(e, o) => onInputChange(o, 'description')}
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

const getTypeList = lt => {
  const phoneListType = lt;
  if (!phoneListType) {
    return [];
  }
  let out = lt.map(e => {
    return {
      key: e.id,
      text: e.nameRu,
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
  fetchPhone,
  fetchPhoneHistory,
})(injectIntl(PhoneF4UpdateModal));
