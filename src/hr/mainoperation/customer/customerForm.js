import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Dropdown, Button, Icon, Input } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { injectIntl } from 'react-intl';

import {
  f4FetchCountryList,
  f4ClearAnyObject,
} from '../../../reference/f4/f4_action';

require('moment/locale/ru');
require('moment/locale/tr');
const CustomerForm = props => {
  const {
    countries,
    language,
    trans,
    intl: { messages },
    isLoading = true,
    customer,
  } = props;
  const [countryList, setCountryList] = useState([]);

  const options = [
    { key: 1, text: messages['yur'], value: 1 },
    { key: 2, text: messages['fiz'], value: 2 },
  ];

  //componentDidMount
  useEffect(() => {
    props.f4FetchCountryList();
    //unmount
    return () => {
      props.f4ClearAnyObject('F4_CLEAR_COUNTRY_LIST');
    };
  }, []);

  //componentWillRecieveProps
  useEffect(() => {
    //getting all countries and assigning to state
    let waCountryList = countries
      .sort((a, b) => (a.country > b.country ? 1 : -1))
      .map(item => {
        return {
          key: item.countryId,
          value: item.countryId,
          text: item.country,
        };
      });
    setCountryList(waCountryList);
  }, [countries]);

  function onInputChange(value, stateFieldName) {
    props.onInputChange(value, stateFieldName);
  }

  const saveButton = () => {
    if (!trans) return null;
    else if (trans === 'HRC03') return null;

    return (
      <Table.Row>
        <Table.Cell />
        <Table.Cell>
          <Button
            icon
            labelPosition="left"
            primary
            size="small"
            onClick={() => props.onSave(customer)}
            loading={isLoading}
            disabled={isLoading}
          >
            <Icon name="save" size="large" />
            {messages['save']}
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const legEntity = () => {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>{messages['fizYur']}</Table.Cell>
          <Table.Cell>
            <Dropdown
              fluid
              selection
              options={options}
              value={customer.fizYur}
              onChange={(e, { value }) => onInputChange(value, 'fizYur')}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['iinBin']}</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              value={customer.iinBin}
              onChange={event => onInputChange(event.target.value, 'iinBin')}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['name']}</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              value={customer.name}
              onChange={event => onInputChange(event.target.value, 'name')}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['director']}</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              value={customer.director}
              onChange={event => onInputChange(event.target.value, 'director')}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['accountant']}</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              value={customer.accountant}
              onChange={event =>
                onInputChange(event.target.value, 'accountant')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['country']}</Table.Cell>
          <Table.Cell>
            <Dropdown
              fluid
              selection
              options={countryList}
              value={customer.countryId}
              onChange={(e, { value }) => onInputChange(value, 'countryId')}
            />
          </Table.Cell>
        </Table.Row>
        {saveButton()}
      </Table.Body>
    );
  };

  const indEntity = () => {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>{messages['fizYur']}</Table.Cell>
          <Table.Cell>
            <Dropdown
              fluid
              selection
              options={options}
              value={customer.fizYur}
              onChange={(e, { value }) => onInputChange(value, 'fizYur')}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['iinBin']}</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              value={customer.iinBin}
              onChange={event => onInputChange(event.target.value, 'iinBin')}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['firstname']}</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              value={customer.firstname}
              onChange={event => onInputChange(event.target.value, 'firstname')}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['lastname']}</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              value={customer.lastname}
              onChange={event => onInputChange(event.target.value, 'lastname')}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['middlename']}</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              value={customer.middlename}
              onChange={event =>
                onInputChange(event.target.value, 'middlename')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['dateOfBirth']}</Table.Cell>
          <Table.Cell>
            <DatePicker
              className="date-auto-width"
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" // timezone="UTC"
              selected={customer.birthday ? moment(customer.birthday) : ''}
              onChange={event => onInputChange(event, 'birthday')}
              isClearable
              dateFormat="DD.MM.YYYY"
              locale={language}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['country']}</Table.Cell>
          <Table.Cell>
            <Dropdown
              fluid
              selection
              options={countryList}
              value={customer.countryId}
              onChange={(e, { value }) => onInputChange(value, 'countryId')}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['passportNumber']}</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              value={customer.passportId}
              onChange={event =>
                onInputChange(event.target.value, 'passportId')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['issuedBy']}</Table.Cell>
          <Table.Cell>
            <Input
              type="text"
              value={customer.passportIssuedBy}
              onChange={event =>
                onInputChange(event.target.value, 'passportIssuedBy')
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{messages['dateOfIssue']}</Table.Cell>
          <Table.Cell>
            <DatePicker
              className="date-auto-width"
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" // timezone="UTC"
              selected={
                customer.passportDateOfIssue
                  ? moment(customer.passportDateOfIssue)
                  : ''
              }
              onChange={event => onInputChange(event, 'passportDateOfIssue')}
              isClearable
              dateFormat="DD.MM.YYYY"
              locale={language}
            />
          </Table.Cell>
        </Table.Row>

        {saveButton()}
      </Table.Body>
    );
  };

  return (
    <div>
      {customer && customer.fizYur && (
        <Table collapsing>
          {customer.fizYur == '2' && indEntity()}
          {customer.fizYur == '1' && legEntity()}
        </Table>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    countries: state.f4.countryList,
    language: state.locales.lang,
  };
}

export default connect(
  mapStateToProps,
  { f4FetchCountryList, f4ClearAnyObject },
)(injectIntl(CustomerForm));
