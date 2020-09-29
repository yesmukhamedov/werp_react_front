import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Dropdown, Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';

import {
  f4FetchCountryList,
  f4ClearAnyObject,
  f4FetchCustomers,
} from '../f4_action';

const CustomerSearchPage = props => {
  const emptyCustomerSearchTerm = {
    fiz_yur: 2,
    iin_bin: '',
    name: '',
    firstname: '',
    lastname: '',
    middlename: '',
    birthday: '',
    passport_id: '',
    country_id: '',
    birthdayMoment: '',
  };
  const [countryList, setCountryList] = useState([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState({
    ...emptyCustomerSearchTerm,
  });
  const [disableFiz, setDisableFiz] = useState(false);
  const [disableYur, setDisableYur] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    countries,
    language,
    customers,
    intl: { messages },
  } = props;

  //componentDidMount
  useEffect(() => {
    if (!countries || countries.length === 0) props.f4FetchCountryList();
    //unmount
    return () => {
      props.f4ClearAnyObject('F4_CLEAR_CUSTOMERS');
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

  const onInputChange = (value, stateFieldName) => {
    setCustomerSearchTerm(prev => {
      const waCustomerSearchTerm = Object.assign({}, prev);
      // console.log(waCustomerSearchTerm);
      // console.log(value);
      if (stateFieldName === 'fiz_yur') {
        waCustomerSearchTerm.fiz_yur = value;
        if (value === 1) {
          setDisableFiz(true);
          setDisableYur(false);
          waCustomerSearchTerm.firstname = '';
          waCustomerSearchTerm.lastname = '';
          waCustomerSearchTerm.middlename = '';
          waCustomerSearchTerm.passport_id = '';
          waCustomerSearchTerm.birthday = '';
        } else {
          setDisableFiz(false);
          setDisableYur(true);
          waCustomerSearchTerm.name = '';
        }
      } else if (stateFieldName === 'birthday') {
        waCustomerSearchTerm.birthdayMoment = value;
        waCustomerSearchTerm.birthday = value;
        // ? moment(value).format('YYYY-MM-DD')
        // : null;
        // console.log(value);
        // console.log(moment(value).format('YYYY-MM-DD'),'moment');
      } else if (stateFieldName === 'iin_bin')
        waCustomerSearchTerm.iin_bin = value;
      else if (stateFieldName === 'name') waCustomerSearchTerm.name = value;
      else if (stateFieldName === 'firstname')
        waCustomerSearchTerm.firstname = value;
      else if (stateFieldName === 'lastname')
        waCustomerSearchTerm.lastname = value;
      else if (stateFieldName === 'middlename')
        waCustomerSearchTerm.middlename = value;
      else if (stateFieldName === 'passport_id')
        waCustomerSearchTerm.passport_id = value;
      else if (stateFieldName === 'country_id')
        waCustomerSearchTerm.country_id = value;
      else if (stateFieldName === 'country_idRemove')
        waCustomerSearchTerm.country_id = '';

      props.f4ClearAnyObject('F4_CLEAR_CUSTOMERS');
      return waCustomerSearchTerm;
    });
  };

  const fizYurText = { [1]: messages['yur'], [2]: messages['fiz'] };

  const options = [
    { key: 1, text: messages['yur'], value: 1 },
    { key: 2, text: messages['fiz'], value: 2 },
  ];

  const getColumns = () => {
    let t1columns = [];
    let t1r1c1 = {},
      t1r1c2 = {},
      t1r1c3 = {},
      t1r1c4 = {},
      t1r1c5 = {},
      t1r1c6 = {};
    t1r1c1 = {
      Header: ({ value }) => <b>{messages['fizYur']}</b>,
      accessor: 'staffId',
      width: 80,
      className: 'clickableItem',
      Cell: obj => <span>{fizYurText[obj.original.fiz_yur]}</span>,
    };
    t1r1c2 = {
      Header: ({ value }) => <b>{messages['iinBin']}</b>,
      width: 120,
      id: 'iin_bin',
      accessor: d => d.iin_bin,
      className: 'clickableItem',
    };

    t1r1c3 = {
      Header: ({ value }) => <b>{messages['name']}</b>,
      accessor: 'name',
      width: 300,
      className: 'clickableItem',
    };
    t1r1c4 = {
      Header: ({ value }) => <b>{messages['fio']}</b>,
      accessor: 'fullFIO',
      width: 300,
      className: 'clickableItem',
    };
    t1r1c5 = {
      Header: ({ value }) => <b>{messages['dateOfBirth']}</b>,
      accessor: 'birthday',
      width: 120,
      className: 'clickableItem',
      Cell: obj => (
        <span>
          {obj.original.birthday
            ? moment(new Date(obj.original.birthday)).format('DD.MM.YYYY')
            : ''}
        </span>
      ),
    };
    t1r1c6 = {
      Header: ({ value }) => <b>{messages['passportNumber']}</b>,
      accessor: 'passport_id',
      width: 150,
      className: 'clickableItem',
    };

    if (customerSearchTerm.fiz_yur === 1) {
      t1columns.push(t1r1c1);
      t1columns.push(t1r1c2);
      t1columns.push(t1r1c3);
    } else {
      t1columns.push(t1r1c1);
      t1columns.push(t1r1c2);
      t1columns.push(t1r1c4);
      t1columns.push(t1r1c5);
      t1columns.push(t1r1c6);
    }

    return t1columns;
  };

  return (
    <div>
      <Table collapsing>
        {/* compact collapsing sortable id="customerF4SearchForm"> */}
        <Table.Body>
          <Table.Row>
            <Table.Cell>{messages['fizYur']}</Table.Cell>
            <Table.Cell>
              <Dropdown
                fluid
                selection
                options={options}
                value={customerSearchTerm.fiz_yur}
                onChange={(e, { value }) => onInputChange(value, 'fiz_yur')}
              />
            </Table.Cell>
            <Table.Cell />
            <Table.Cell>{messages['firstname']}</Table.Cell>
            <Table.Cell>
              <input
                type="text"
                className="form-control"
                value={customerSearchTerm.firstname}
                onChange={event =>
                  onInputChange(event.target.value, 'firstname')
                }
                disabled={disableFiz}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['iinBin']}</Table.Cell>
            <Table.Cell>
              <input
                type="text"
                className="form-control"
                value={customerSearchTerm.iin_bin}
                onChange={event => onInputChange(event.target.value, 'iin_bin')}
              />
            </Table.Cell>
            <Table.Cell />
            <Table.Cell>{messages['lastname']}</Table.Cell>
            <Table.Cell>
              <input
                type="text"
                className="form-control"
                value={customerSearchTerm.lastname}
                onChange={event =>
                  onInputChange(event.target.value, 'lastname')
                }
                disabled={disableFiz}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['name']}</Table.Cell>
            <Table.Cell>
              <input
                type="text"
                className="form-control"
                value={customerSearchTerm.name}
                onChange={event => onInputChange(event.target.value, 'name')}
                disabled={disableYur}
              />
            </Table.Cell>
            <Table.Cell />
            <Table.Cell>{messages['middlename']}</Table.Cell>
            <Table.Cell>
              <input
                type="text"
                className="form-control"
                value={customerSearchTerm.middlename}
                onChange={event =>
                  onInputChange(event.target.value, 'middlename')
                }
                disabled={disableFiz}
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
                value={customerSearchTerm.country_id}
                onChange={(e, { value }) => onInputChange(value, 'country_id')}
              />
            </Table.Cell>
            <Table.Cell>
              <Icon
                name="window close"
                onClick={() => onInputChange('', 'country_idRemove')}
                size="large"
                inverted
                className="clickableIcon"
                color="red"
              />
            </Table.Cell>
            <Table.Cell>{messages['dateOfBirth']}</Table.Cell>
            <Table.Cell>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" // timezone="UTC"
                selected={stringYYYYMMDDToMoment(
                  customerSearchTerm.birthdayMoment,
                )}
                onChange={event =>
                  onInputChange(momentToStringYYYYMMDD(event), 'birthday')
                }
                isClearable={!disableFiz}
                dateFormat="DD.MM.YYYY"
                disabled={disableFiz}
                locale={language}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell />
            <Table.Cell>
              <Button
                icon
                loading={isLoading}
                labelPosition="left"
                primary
                size="small"
                onClick={() => {
                  props.f4FetchCustomers(customerSearchTerm, bool =>
                    setIsLoading(bool),
                  );
                  setIsLoading(true);
                }}
              >
                <Icon name="search" size="large" />
                {messages['search']}
              </Button>
            </Table.Cell>
            <Table.Cell />
            <Table.Cell>{messages['passportNumber']}</Table.Cell>
            <Table.Cell>
              <input
                type="text"
                className="form-control"
                value={customerSearchTerm.passport_id}
                disabled={disableFiz}
                onChange={event =>
                  onInputChange(event.target.value, 'passport_id')
                }
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <ReactTable
        data={customers}
        columns={getColumns()}
        defaultPageSize={10}
        showPagination
        // style={{ height: '400px' }}
        className="-striped -highlight"
        loadingText={messages['loadingText']}
        noDataText={messages['noDataText']}
        previousText={messages['previousText']}
        nextText={messages['nextText']}
        rowsText={messages['rowsText']}
        pageText={messages['pageText']}
        ofText={messages['ofText']}
        showPageSizeOptions={false}
        getTrProps={(state, rowInfo, column) => {
          return {
            onClick: (e, handleOriginal) => {
              if (props.onCustomerSelect) {
                props.onCustomerSelect(rowInfo.original);
              }
              if (props.close) {
                props.close();
              }
            },
          };
        }}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    countries: state.f4.countryList,
    language: state.locales.lang,
    customers: state.f4.customers,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4ClearAnyObject,
  f4FetchCustomers,
})(injectIntl(CustomerSearchPage));
