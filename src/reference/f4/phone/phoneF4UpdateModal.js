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
import { postPhone, f4UpdatePhone } from '../f4_action';
import OutputErrors from '../../../general/error/outputErrors';

function PhoneF4UpdateModal(props) {
  const emptyList = {
    id: 0,
    type: 0,
    phone: '',
    status: 'CREATED',
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
  } = props;

  const onInputChange = (o, fieldName) => {
    setList(prev => {
      const varList = { ...prev };
      varList.id = selectedPhone.id;
      switch (fieldName) {
        case 'typeList':
          varList.type = o.value;
          break;
        case 'phoneNumber':
          varList.phone = o.value;
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
    const { id, type, phone, status, description } = list;
    if (errors === null || errors === undefined || errors.length === 0) {
      props.f4UpdatePhone({
        id,
        type,
        phone,
        status,
        description,
        customerId,
      });
      // setList({
      //     status: 'CREATED',
      // })
      // props.postPhone({
      //     type,
      //     phone,
      //     status,
      //     description,
      //     customerId
      // })
      setErrors(errors);
      props.onCloseUpdatePhoneF4(false);
    }
  };

  const validate = () => {
    const errors = [];
    const { type, phone } = list;
    if (type === 0 || type === undefined || type === null) {
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
      type: '',
      phone: '',
      status: 'CREATED',
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
                  defaultValue={selectedPhone.type}
                  onChange={(e, o) => onInputChange(o, 'typeList')}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{messages['update_number']}}</Table.Cell>
              <Table.Cell>
                <Input
                  placeholder={messages['enter_number']}
                  type="number"
                  defaultValue={selectedPhone.phone}
                  onChange={(e, o) => onInputChange(o, 'phoneNumber')}
                />
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
  postPhone,
  f4UpdatePhone,
})(injectIntl(PhoneF4UpdateModal));
