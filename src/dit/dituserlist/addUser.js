import React, { Component } from 'react';
import {
  Form,
  Button,
  Input,
  Icon,
  Modal,
  Dropdown,
  Radio,
  Select,
} from 'semantic-ui-react';
import OutputErrors from '../../general/error/outputErrors';
import MaskedInput from 'react-text-mask';
import phoneMask from '../../utils/phoneMask';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sysUser: {
        password: '',
        username: '',
        internal_number: '',
        rname: [],
        mobileNumber: '',
      },
      radioCheck: {
        checked: false,
        is_root: false,
      },
      hidden: true,
      randomPass: '',
      countryCode: 'KZ',
    };
    this.inputChange = this.inputChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let sysUser = Object.assign({}, this.state.sysUser);

    if (this.props.staff !== nextProps.username) {
      sysUser.username = nextProps.username;

      this.setState({
        ...this.state,
        sysUser: sysUser,
      });
    }
  }

  inputChange(fieldName, o) {
    let sysUser = Object.assign({}, this.state.sysUser);

    let radioCheck = Object.assign({}, this.state.radioCheck);
    switch (fieldName) {
      case 'username':
        sysUser.username = o.value;
        break;
      case 'internal_number':
        sysUser.internal_number = o.value;
        break;
      case 'password':
        sysUser['password'] = o.value;
        break;
      case 'rids':
        sysUser.rname = [];
        sysUser['rids'] = o.value;
        for (let i = 0; i < o.value.length; i++) {
          o.options.some(c => {
            if (c.key === o.value[i]) {
              sysUser.rname[i] = c.text;
              return true;
            } else {
              return false;
            }
          });
        }
        break;
      case 'bukrs':
        sysUser['bukrs'] = o.value;
        this.props.getBrByBukrSysUser(o.value);
        o.options.some(c => {
          if (Number(c.key) === o.value) {
            sysUser['bukrsname'] = c.text;
            return true;
          } else {
            return false;
          }
        });
        break;
      case 'branch_id':
        sysUser['branchId'] = o.value;
        o.options.some(c => {
          if (Number(c.key) === o.value) {
            sysUser['branchname'] = c.text;
            return true;
          } else {
            return false;
          }
        });
        break;
      case 'active':
        radioCheck.checked = o.checked;
        break;
      case 'is_root':
        radioCheck.is_root = o.checked;
        break;
      case 'phone':
        sysUser.mobileNumber = o;
        break;

      default:
        sysUser[fieldName] = o.value;
    }

    this.setState({
      ...this.state,
      sysUser: sysUser,
      radioCheck: radioCheck,
    });
  }

  submitForm() {
    const successClear = () => {
      this.setState({
        ...this.state,
        password: '',
      });
    };
    const sysUser = Object.assign({}, this.state.sysUser);
    const radioCheck = Object.assign({}, this.state.radioCheck);
    sysUser['staff_id'] = this.props.selStaff.staff_id;
    sysUser['active'] = radioCheck.checked;
    radioCheck.is_root ? (sysUser['is_root'] = 1) : (sysUser['is_root'] = 0);
    let errors = [];
    errors = this.validate();

    if (errors === null || errors === undefined || errors.length === 0) {
      this.props.newUser(sysUser, successClear());

      console.log('newUser action');
    }
    this.setState({ errors });
  }

  validate() {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    let errors = [];
    const {
      username,
      password,
      //internal_number,
      bukrs,
      branchId,
      rids,
    } = this.state.sysUser;

    if (!username || !password) {
      errors.push(errorTable['134' + language]);
    }
    if (!bukrs || !branchId || !rids) {
      errors.push(errorTable['138' + language]);
    }
    return errors;
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  randomGenerate() {
    let { sysUser } = this.state;
    const chars = [...'abcdefghijklmnopqrstuvwxyz'];
    const numChars = [...'1234567890'];
    let letters = [...Array(5)].map(
      i => chars[(Math.random() * chars.length) | 0],
    ).join``;
    let num = [...Array(3)].map(
      i => numChars[(Math.random() * numChars.length) | 0],
    ).join``;
    sysUser.password = letters.charAt(0).toUpperCase() + letters.slice(1) + num;
    this.setState({
      ...this.state,
      sysUser: sysUser,
    });
  }

  render() {
    const { messages } = this.props;
    return (
      <Modal size={'small'} open={this.props.showAdd}>
        <Modal.Header>{messages['BTN__ADD']}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {this.renderForm()}
            <OutputErrors errors={this.state.errors} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
  renderForm() {
    const { messages, countryCodeOptions = [], countryList = [] } = this.props;
    const { sysUser } = this.state;
    const filterCountry = countryList.filter(
      item => item.code == this.state.countryCode,
    );

    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>{messages['L__COMPANY']} </label>
            <Dropdown
              fluid
              search
              selection
              options={this.props.companyOpts}
              onChange={(e, o) => this.inputChange('bukrs', o)}
            />
          </Form.Field>
          <Form.Field required>
            <label>{messages['brnch']}</label>
            <Dropdown
              fluid
              search
              selection
              options={this.props.branchOptions}
              onChange={(e, o) => this.inputChange('branch_id', o)}
            />
          </Form.Field>
          <Form.Field
            defaultValue={this.state.sysUser.internal_number}
            onChange={(e, o) => this.inputChange('internal_number', o)}
            control={Input}
            label={messages['internal_number']}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            readOnly
            control={Input}
            value={this.props.selStaff.fullFIO}
            label={messages['fio']}
          />
          <Form.Field required>
            <label>{messages['role']}</label>
            <Dropdown
              fluid
              search
              selection
              multiple
              options={this.props.roles}
              defaultValue={this.props.rids}
              onChange={(e, o) => this.inputChange('rids', o)}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group>
          <Form.Field>
            <label>Телефон</label>
            <Form.Group>
              <Select
                compact
                selection
                value={this.state.countryCode}
                options={countryCodeOptions}
                onChange={(e, { value }) => {
                  this.setState({ countryCode: value });
                }}
              />
              <MaskedInput
                value={
                  this.state.sysUser.mobileNumber
                    ? this.state.sysUser.mobileNumber
                    : ''
                }
                mask={phoneMask(this.state.countryCode)}
                placeholder={
                  filterCountry.length > 0
                    ? `${filterCountry[0].phoneCode} ${filterCountry[0].telPattern}`
                    : 'Номер телефона'
                }
                onChange={event =>
                  this.inputChange('phone', event.target.value)
                }
              />
            </Form.Group>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            required
            value={sysUser.username}
            onChange={(e, o) => this.inputChange('username', o)}
            control={Input}
            label={messages['L__USER']}
          />
          <Form.Field required>
            <label>Enter Password</label>
            <Input
              style={{ width: '75%' }}
              value={sysUser.password}
              type={this.state.hidden ? 'password' : 'text'}
              icon={{
                name: 'eye',
                circular: true,
                link: true,
                onClick: this.toggleShow,
              }}
              onChange={(e, o) => this.inputChange('password', o)}
            />
            <Button color="teal" onClick={this.randomGenerate.bind(this)}>
              <Icon name="refresh" />
            </Button>
          </Form.Field>
        </Form.Group>
        <Form.Field>
          Selected value:<b>{String(this.state.radioCheck.checked)}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            toggle
            label={messages['L__STATUS']}
            onChange={(e, o) => this.inputChange('active', o)}
            checked={this.state.radioCheck.checked}
          />
        </Form.Field>
        <Form.Field>
          Selected value:
          <b>
            {this.state.radioCheck.is_root
              ? messages['BTN__YES']
              : messages['BTN__NO']}
          </b>
        </Form.Field>
        <Form.Field>
          <Radio
            toggle
            label={'Is Root'}
            onChange={(e, o) => this.inputChange('is_root', o)}
            checked={this.state.radioCheck.is_root}
          />
        </Form.Field>
        <Button
          color="teal"
          onClick={this.submitForm.bind(this)}
          floated="right"
        >
          <Icon name="checkmark" /> {messages['Form.Save']}
        </Button>
        <Button
          negative
          floated="right"
          onClick={() => {
            this.props.close();
          }}
        >
          <Icon name="remove" />
          {messages['BTN__CANCEL']}
        </Button>
        <br />
        <br />
      </Form>
    );
  }
}
export default AddUser;
