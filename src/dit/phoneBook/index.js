import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  f4FetchDepartmentList,
  f4ClearAnyObject,
} from '../../reference/f4/f4_action';
import { getPhoneBook } from '../ditAction';
import {
  Header,
  Grid,
  Segment,
  Button,
  Container,
  Dropdown,
  Form,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ListStaff from './listStaff';

function PhoneBook(props) {
  const {
    departmentOptions,
    staffList,
    intl: { messages },
  } = props;

  //componentDidMount
  useEffect(() => {
    if (!departmentOptions || departmentOptions.length === 0)
      props.f4FetchDepartmentList();
    //unmount
    return () => {
      props.f4ClearAnyObject('F4_CLEAR_STAFF_LIST');
    };
  }, []);

  const emptyStaff = {
    iinBin: '',
    firstname: '',
    lastname: '',
    middlename: '',
  };

  const [staff, setStaff] = useState({ ...emptyStaff });

  const getCompanyOptions = () => {
    const { companyOptions } = props;
    if (!companyOptions) {
      return [];
    }
    let out = companyOptions.map(c => {
      return {
        key: parseInt(c.key, 10),
        text: `${c.text}`,
        value: parseInt(c.value, 10),
      };
    });
    return out;
  };

  const getDepartments = () => {
    const depOptions = props.departmentOptions;
    if (!depOptions) {
      return [];
    }
    let out = depOptions.map(c => {
      return {
        key: parseInt(c.key, 10),
        text: `${c.text}`,
        value: parseInt(c.value, 10),
      };
    });
    return out;
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.getPhoneBook(staff);
  };

  const onChange = (o, fieldName) => {
    setStaff(prev => {
      const varStaff = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          varStaff.bukrs = o.value;
          break;
        case 'depId':
          varStaff.depId = o.value;
          break;
        case 'iinBin':
          varStaff.iinBin = o.value;
          break;
        case 'firstname':
          varStaff.firstname = o.value;
          break;
        case 'lastname':
          varStaff.lastname = o.value;
          break;
        case 'middlename':
          varStaff.middlename = o.value;
          break;
        default:
          varStaff[fieldName] = o.value;
      }
      return varStaff;
    });
  };

  return (
    <div>
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '4em',
          paddingRight: '4em',
        }}
      >
        <Segment clearing>
          <Header as="h2" floated="left">
            {messages['dir_inter_phones']}
          </Header>
        </Segment>
        <Grid>
          <Grid.Column floated="left" width={3}>
            <Segment>
              <Form onSubmit={handleSubmit}>
                <Form.Field required>
                  <label>{messages['bukrs']}</label>
                  <Dropdown
                    fluid
                    selection
                    search
                    options={getCompanyOptions()}
                    onChange={(e, o) => onChange(o, 'bukrs')}
                    value={staff.bukrs}
                  />
                </Form.Field>
                <Form.Field>
                  <label>{messages['dep']}</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    options={getDepartments()}
                    onChange={(e, o) => onChange(o, 'depId')}
                    value={staff.dep_id}
                  />
                </Form.Field>
                <Form.Input
                  label={messages['iinBin']}
                  placeholder={messages['iinBin']}
                  onChange={(e, o) => onChange(o, 'iinBin')}
                  value={staff.iinBin}
                />
                <Form.Input
                  label={messages['firstname']}
                  placeholder={messages['firstname']}
                  onChange={(e, o) => onChange(o, 'firstname')}
                  value={staff.firstname}
                />
                <Form.Input
                  label={messages['lastname']}
                  placeholder={messages['lastname']}
                  onChange={(e, o) => onChange(o, 'lastname')}
                  value={staff.lastname}
                />
                <Form.Input
                  label={messages['middlename']}
                  placeholder={messages['middlename']}
                  onChange={(e, o) => onChange(o, 'middlename')}
                  value={staff.middlename}
                />
                <Button color="teal" floated="right">
                  {messages['Button.Search']}
                </Button>
                <br />
              </Form>
              <br />
            </Segment>
          </Grid.Column>
          <Grid.Column floated="right" width={13}>
            <ListStaff messages={messages} staffList={staffList} />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    departmentOptions: state.f4.departmentOptions,
    staffList: state.f4.staffList,
  };
}

export default connect(
  mapStateToProps,
  { f4FetchDepartmentList, f4ClearAnyObject, getPhoneBook },
)(injectIntl(PhoneBook));
