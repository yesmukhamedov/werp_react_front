import React, { useState } from 'react';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Form, Dropdown, Input, Button, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';

export default function CustomerSearch(props) {
  const [customer, setCustomer] = useState([]);

  const { messages, countryList, cancelForm, dmsclstCusts } = props;

  const searchForm = () => {
    props.searchCustomer(customer);
  };

  const inputChange = (fieldName, o) => {
    switch (fieldName) {
      case 'fizYur':
        customer['fizYur'] = o.value;
        break;
      case 'firstname':
        customer['firstname'] = o.value;
        break;
      case 'lastname':
        customer['lastname'] = o.value;
        break;
      case 'middlename':
        customer['middlename'] = o.value;
        break;
      case 'custName':
        customer['custName'] = o.value;
        break;
      case 'countryId':
        customer['countryId'] = o.value;
        break;
      case 'innBin':
        customer['innBin'] = o.value;
        break;
      case 'passportId':
        customer['passportId'] = o.value;
        break;
      case 'dateOfBirth':
        customer['dateOfBirth'] = o.format('YYYY-MM-DD');
        break;
      default:
        customer[fieldName] = o.value;
    }
    setCustomer({ ...customer });
  };
  const selectedCustomer = cust => {
    props.selectedCustomer(cust);
  };

  const columns = [
    {
      Header: messages['fizYur'],
      id: 'fiz_yur',
      accessor: d => d.fiz_yur,
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedCustomer.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
    },
    {
      Header: messages['iinBin'],
      accessor: 'iin_bin',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedCustomer.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['iinBin'] }),
      filterAll: true,
    },
    {
      Header: messages['name'],
      accessor: 'name',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedCustomer.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['name'] }),
      filterAll: true,
    },
    {
      Header: messages['firstname'],
      accessor: 'firstname',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedCustomer.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['firstname'] }),
      filterAll: true,
    },
    {
      Header: messages['lastname'],
      accessor: 'lastname',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedCustomer.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['lastname'] }),
      filterAll: true,
    },
    {
      Header: messages['middlename'],
      accessor: 'middlename',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedCustomer.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['middlename'] }),
      filterAll: true,
    },
    {
      Header: messages['dateOfBirth'],
      accessor: 'birthday',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedCustomer.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['birthday'] }),
      filterAll: true,
    },
    {
      Header: messages['passportNumber'],
      accessor: 'passport_id',
      Cell: props => {
        return (
          <Button
            style={{ backgroundColor: 'white', color: 'black' }}
            onClick={selectedCustomer.bind(this, props.original)}
          >
            {props.value}
          </Button>
        );
      },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['passport_id'] }),
      filterAll: true,
    },
  ];
  return (
    <div>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>{messages['fizYur']}</label>
            <Dropdown
              fluid
              search
              selection
              options={getFizYur(messages)}
              onChange={(e, o) => inputChange('fizYur', o)}
              value={customer.fizYur}
            />
          </Form.Field>
          <Form.Field
            control={Input}
            label={messages['firstname']}
            onChange={(e, o) => inputChange('firstname', o)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label={messages['L__CLIENT_IIN']}
            onChange={(e, o) => inputChange('innBin', o)}
          />
          <Form.Field
            control={Input}
            label={messages['lastname']}
            onChange={(e, o) => inputChange('lastname', o)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label={messages['name']}
            onChange={(e, o) => inputChange('custName', o)}
          />
          <Form.Field
            control={Input}
            label={messages['middlename']}
            onChange={(e, o) => inputChange('middlename', o)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Field width={8}>
            <label>{messages['country']}</label>
            <Dropdown
              fluid
              search
              selection
              options={getCountryLst(countryList)}
              onChange={(e, o) => inputChange('countryId', o)}
              value={customer.countryId}
            />
          </Form.Field>
          <Form.Field
            width={5}
            control={Input}
            label={messages['passportNumber']}
            onChange={(e, o) => inputChange('passportId', o)}
          />
          <Form.Field width={3}>
            <label>{messages['dateOfBirth']}</label>
            <DatePicker
              className="date-100-width"
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" //timezone="UTC"
              selected={
                customer.dateOfBirth ? moment(customer.dateOfBirth) : null
              }
              locale="ru"
              onChange={(e, o) => {
                inputChange('dateOfBirth', e);
              }}
              dateFormat="DD.MM.YYYY"
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <br />
      <Button color="teal" onClick={searchForm.bind(this)} floated="right">
        <Icon name="checkmark" /> {messages['search']}
      </Button>
      <Button negative onClick={cancelForm} floated="right">
        {messages['BTN__CANCEL']}
      </Button>
      <br />
      <br />
      <br />
      <ReactTable
        columns={columns}
        data={dmsclstCusts}
        resolveData={data => data.map(row => row)}
        filterable
        rowsText={messages['rowsText']}
        pageText={messages['pageText']}
        ofText={messages['ofText']}
        previousText={messages['previousText']}
        nextText={messages['nextText']}
        noDataText={messages['loadingText']}
      />
    </div>
  );
}

const getFizYur = messages => {
  let out = [
    { key: 2, text: messages['fiz'], value: 2 },
    { key: 1, text: messages['yur'], value: 1 },
  ];
  return out;
};

const getCountryLst = countryList => {
  if (!countryList) {
    return [];
  }

  let out = countryList.map(c => {
    return {
      key: parseInt(c.countryId, 10),
      text: c.country,
      value: parseInt(c.countryId, 10),
    };
  });

  return out;
};
