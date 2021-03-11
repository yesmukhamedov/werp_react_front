import React, { useState } from 'react';
import {
  Modal,
  Button,
  Header,
  Form,
  Dropdown,
  Input,
  Icon,
  Radio,
} from 'semantic-ui-react';

const UpdateRowModal = props => {
  const {
    messages,
    open,
    onClose,
    data = {},
    companyOptions = [],
    branchOptions = [],
    changeModalUpdate,
    submitUpdate,
    roleOptions = [],
  } = props;

  const [passtype, setPasstype] = useState('password');

  const iconPasswordClick = () => {
    if (passtype === 'password') setPasstype('text');
    else setPasstype('password');
  };
  return (
    <Modal closeIcon open={open} onClose={() => onClose()}>
      <Header content="Редактировать" />
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>{props.messages['L__COMPANY']} </label>
              <Dropdown
                fluid
                search
                selection
                value={data.bukrs ? data.bukrs : ''}
                options={companyOptions}
                onChange={(e, { value }) => {
                  changeModalUpdate('bukrs', value);
                }}
              />
            </Form.Field>
            <Form.Field required>
              <label>{props.messages['brnch']}</label>
              <Dropdown
                fluid
                search
                selection
                value={data.branchId ? data.branchId : ''}
                options={branchOptions}
                onChange={(e, { value }) =>
                  changeModalUpdate('branchId', value)
                }
                // text={props.row.branchname}
              />
            </Form.Field>
            <Form.Field
              required
              value={data.internal_number ? data.internal_number : ''}
              onChange={(e, o) => changeModalUpdate('internal_number', o)}
              control={Input}
              label={messages['internal_number']}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              value={data.fullname ? data.fullname : ''}
              readOnly
              control={Input}
              label={props.messages['fio']}
            />
            <Form.Field required>
              <label>{messages['role']}</label>
              <Dropdown
                fluid
                search
                selection
                multiple
                value={data.rids}
                options={roleOptions}
                onChange={(e, o) => changeModalUpdate('role_id', o)}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              required
              value={data.username ? data.username : ''}
              onChange={(e, o) => changeModalUpdate('username', o)}
              control={Input}
              label={messages['L__USER']}
            />
            <Form.Field>
              <label>Enter Password</label>
              <Input
                style={{ width: '75%' }}
                value={data.password}
                type={passtype}
                icon={{
                  name: 'eye',
                  circular: true,
                  link: true,
                  onClick: () => iconPasswordClick(),
                }}
                onChange={(e, { value }) =>
                  changeModalUpdate('password', value)
                }
              />
              {/* <Button color="teal" onClick={() => randomGenerate()}>
                <Icon name="refresh" />
              </Button> */}
            </Form.Field>
            {/*  
              <Form.Field>
                <label>Enter Password</label>
                <div className="ui icon input">
                  <Input style={{ width: '80%'}} value={props.row.password} type={props.passtype}   ></Input>
                  <i className="circular eye link icon"   onClick={props.iconClicked} ></i>
                </div>
                <Button color="teal" onClick={props.randomGenerate}></Button>   
              </Form.Field>
            */}
          </Form.Group>

          <Form.Field>
            Selected value:<b>{String(data.active)}</b>
          </Form.Field>
          <Form.Field>
            <Radio
              toggle
              // defaultValue={props.row.active}
              // onChange={(e, o) => props.handleChange('active', o)}
              label={props.messages['L__STATUS']}
              // checked={props.row.active}
            />
          </Form.Field>
          <Form.Field>
            Selected value:<b>{String(data.rootChecked)}</b>
          </Form.Field>
          <Form.Field>
            <Radio
              toggle
              // defaultValue={props.row.is_root}
              // onChange={(e, o) => props.handleChange('is_root', o)}
              label={'IS Root'}
              // checked={props.row.rootChecked}
            />
          </Form.Field>

          <Button onClick={() => submitUpdate()} floated="right" color="teal">
            <Icon name="checkmark" />
            {messages['save']}
          </Button>
          <Button floated="right" negative onClick={() => onClose()}>
            {messages['cancel']}
          </Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button color='red' onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' onClick={() => setOpen(false)}>
            <Icon name='checkmark' /> Yes
          </Button> */}
      </Modal.Actions>
    </Modal>
  );
};

export default UpdateRowModal;
