import React from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Icon,
  Radio,
  Dropdown,
} from 'semantic-ui-react';

export default function Update(props) {
  return (
    <Modal size={'small'} open={props.updateModalOpened}>
      <Modal.Header>{props.messages['change']}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Field required>
                <label>{props.messages['L__COMPANY']} </label>
                <Dropdown
                  fluid
                  search
                  selection
                  defaultValue={props.row.bukrsname}
                  options={props.companyOpts}
                  onChange={(e, o) => {
                    props.handleChange('bukrs', o);
                  }}
                  text={props.row.bukrsname}
                />
              </Form.Field>
              <Form.Field required>
                <label>{props.messages['brnch']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  defaultValue={props.row.branchname}
                  options={props.branchOptions}
                  onChange={(e, o) => props.handleChange('branchId', o)}
                  text={props.row.branchname}
                />
              </Form.Field>
              <Form.Field
                required
                defaultValue={props.row.internal_number}
                onChange={(e, o) => props.handleChange('internal_number', o)}
                control={Input}
                label={props.messages['internal_number']}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                value={props.row.fullname}
                readOnly
                control={Input}
                label={props.messages['fio']}
              />
              <Form.Field required>
                <label>{props.messages['role']}</label>
                <Dropdown
                  fluid
                  search
                  selection
                  multiple
                  defaultValue={props.row.rids}
                  options={props.roles}
                  onChange={(e, o) => props.handleChange('role_id', o)}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                required
                defaultValue={props.row.username}
                onChange={(e, o) => props.handleChange('username', o)}
                control={Input}
                label={props.messages['L__USER']}
              />
              <Form.Field>
                <label>Enter Password</label>
                <Input
                  style={{ width: '75%' }}
                  value={props.row.password}
                  type={props.passtype}
                  icon={{
                    name: 'eye',
                    circular: true,
                    link: true,
                    onClick: props.iconClicked,
                  }}
                  onChange={(e, o) => props.handleChange('password', o)}
                />
                <Button color="teal" onClick={props.randomGenerate}>
                  <Icon name="refresh" />
                </Button>
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
              Selected value:<b>{String(props.row.active)}</b>
            </Form.Field>
            <Form.Field>
              <Radio
                toggle
                defaultValue={props.row.active}
                onChange={(e, o) => props.handleChange('active', o)}
                label={props.messages['L__STATUS']}
                checked={props.row.active}
              />
            </Form.Field>
            <Form.Field>
              Selected value:<b>{String(props.row.rootChecked)}</b>
            </Form.Field>
            <Form.Field>
              <Radio
                toggle
                defaultValue={props.row.is_root}
                onChange={(e, o) => props.handleChange('is_root', o)}
                label={'IS Root'}
                checked={props.row.rootChecked}
              />
            </Form.Field>

            <Button onClick={props.submitUpdate} floated="right" color="teal">
              <Icon name="checkmark" />
              {props.messages['save']}
            </Button>
            <Button floated="right" negative onClick={props.close}>
              {props.messages['cancel']}
            </Button>
          </Form>
          <br />
          <br />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
