import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Modal, Input, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import './index.css';
import { Dropdown } from 'semantic-ui-react';
import {
  f4FetchCountryList,
  f4FetchCurrencyList,
} from '../../../reference/f4/f4_action';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { fetchSmsetppType, fetchSmsetppPost } from './../../serviceAction';
require('moment/locale/ru');
require('moment/locale/tr');

const ModalPrice = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data,
    fetchSmsetppType,
    fetchSmsetppPost,
    currencyOptions = [],
    countryList = [],
    companyOptions = [],
    intl: { messages },
    f4FetchCurrencyList,
  } = props;
  const language = localStorage.getItem('language');
  const [typeOfService, setTypeOfService] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [test, setTest] = useState(false);
  const [informations, setInformations] = useState({
    bukrs: '',
    dateStart: moment() /*`${startDate.date()}.${startDate.month()}.${startDate.year()}`*/,
    fc: 0,
    mc: 0,
    office: 0,
    master: 0,
    operator: 0,
    discount: 0,
    total: 0,
    countryId: 0,
    waers: 'string',
    serviceTypeId: 0,
    typeOfSum: '',
  });

  useEffect(() => {
    fetchSmsetppType();
    f4FetchCurrencyList('');
  }, []);

  useEffect(() => {
    let service = data.type.map(item => {
      return { key: item.id, text: item.nameEn, value: item.id };
    });
    setTypeOfService(service);
  }, [data.type]);

  useEffect(() => {
    let country = countryList.map(item => {
      return { key: item.countryId, text: item.country, value: item.countryId };
    });

    setCountryOptions(country);
  }, [countryList]);

  const handleChange = (text, value) => {
    if (text === 'companies') {
      setInformations({ ...informations, bukrs: value });
    }
    if (text === 'countries') {
      setInformations({ ...informations, countryId: value });
    }
    if (text === 'typeOfSum') {
      setInformations({ ...informations, typeOfSum: value });
    }
    if (text === 'typeOfService') {
      setInformations({ ...informations, serviceTypeId: value });
    }
  };

  const onChangeDate = d => {
    setInformations({
      ...informations,
      dateStart: d,
    });
  };

  const onhandleAdd = () => {
    setTest(true);
    const {
      bukrs,
      fc,
      mc,
      office,
      master,
      operator,
      discount,
      total,
      countryId,
      serviceTypeId,
      typeOfSum,
    } = informations;

    if (
      bukrs !== '' &&
      fc !== 0 &&
      mc !== 0 &&
      office !== 0 &&
      master !== 0 &&
      operator !== 0 &&
      discount !== 0 &&
      total !== 0 &&
      countryId !== '' &&
      serviceTypeId !== '' &&
      typeOfSum !== ''
    ) {
      setModalOpen(false);
      fetchSmsetppPost(informations);
    }
  };

  const onhandleCancel = () => {
    setModalOpen(false);
    setTest(false);
    setInformations({
      bukrs: '',
      dateStart: moment() /*`${startDate.date()}.${startDate.month()}.${startDate.year()}`*/,
      fc: 0,
      mc: 0,
      office: 0,
      master: 0,
      operator: 0,
      discount: 0,
      total: 0,
      countryId: 0,
      waers: 'string',
      serviceTypeId: 0,
      typeOfSum: '',
    });
  };

  const onInputChange = (text, event) => {
    switch (text) {
      case 'fc':
        setInformations({ ...informations, fc: parseInt(event.target.value) });
        break;
      case 'mc':
        setInformations({ ...informations, mc: parseInt(event.target.value) });
        break;
      case 'office':
        setInformations({
          ...informations,
          office: parseInt(event.target.value),
        });
        break;
      case 'master':
        setInformations({
          ...informations,
          master: parseInt(event.target.value),
        });
        break;
      case 'operator':
        setInformations({
          ...informations,
          operator: parseInt(event.target.value),
        });
        break;
      case 'discount':
        setInformations({
          ...informations,
          discount: parseInt(event.target.value),
        });
        break;
      case 'total':
        setInformations({
          ...informations,
          total: parseInt(event.target.value),
        });
        break;
      default:
        return informations;
    }
  };

  return (
    <Modal
      trigger={
        <button
          className="ui green button"
          id="addPrice"
          onClick={() => setModalOpen(true)}
        >
          <i aria-hidden="true" className="add square icon"></i>{' '}
          {messages['toAdd']}
        </button>
      }
      size="small"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <Header content={messages['toAdd']} id="modalHeader" />
      <Modal.Content>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['bukrs']}</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown
                error={
                  test === true && informations.bukrs === '' ? true : false
                }
                clearable="true"
                search
                selection
                options={companyOptions}
                onChange={(e, { value }) => handleChange('companies', value)}
                placeholder={messages['bukrs']}
              />
            </Grid.Column>
          </Grid.Row>

          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['Task.StartDate']}</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5} id="inputDate">
              <div className="ui input">
                <DatePicker
                  className="date-auto-width"
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select" //timezone="UTC"
                  selected={informations.dateStart}
                  onChange={date => onChangeDate(date)}
                  dateFormat="DD.MM.YYYY"
                  locale={language}
                />
                <i
                  aria-hidden="true"
                  className="calendar alternate outline big icon"
                  id="calendarIcon"
                ></i>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3 id="fcCount">FC({messages['Table.Amount']})</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={test === true && informations.fc === 0 ? true : false}
                placeholder="Search..."
                type="number"
                onChange={e => onInputChange('fc', e)}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>MC({messages['Table.Amount']})</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={test === true && informations.mc === 0 ? true : false}
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('mc', e)}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>
                {messages['office']} ({messages['inTotal']})
              </h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.office === 0 ? true : false
                }
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('office', e)}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>
                {messages['master']} ({messages['inTotal']})
              </h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.master === 0 ? true : false
                }
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('master', e)}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>
                {messages['Operator']} ({messages['inTotal']})
              </h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.operator === 0 ? true : false
                }
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('operator', e)}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>
                {messages['discount']} ({messages['inTotal']})
              </h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.discount === 0 ? true : false
                }
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('discount', e)}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['totalAmount']}</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={test === true && informations.total === 0 ? true : false}
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('total', e)}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['country']}</h3>
            </Grid.Column>

            <Grid.Column floated="right" width={5}>
              <Dropdown
                error={
                  test === true && informations.countryId === '' ? true : false
                }
                clearable="true"
                search
                selection
                options={countryOptions}
                onChange={(e, { value }) => handleChange('countries', value)}
                placeholder={messages['country']}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['waers']}</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown
                placeholder={messages['waers']}
                search
                clearable="true"
                selection
                options={currencyOptions}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['typeOfService']}</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown
                placeholder="State"
                clearable="true"
                selection
                options={typeOfService}
                onChange={(e, { value }) =>
                  handleChange('typeOfService', value)
                }
                placeholder={messages['typeOfService']}
                search
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['typeOfAmount']}</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown
                error={
                  test === true && informations.typeOfSum === '' ? true : false
                }
                placeholder={messages['typeOfAmount']}
                search
                selection
                onChange={(e, { value }) => handleChange('typeOfSum', value)}
                options={[
                  { key: 1, text: '%', value: '%' },
                  { key: 2, text: 'n', value: 'n' },
                ]}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button inverted color="red" onClick={onhandleCancel}>
          <Icon name="remove" /> {messages['Button.No']}
        </Button>
        <Button inverted color="blue" onClick={onhandleAdd}>
          <Icon name="checkmark" /> {messages['BTN__ADD']}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  console.log(state, 'state');
  return {
    data: state.serviceReducer.data,
    currencyOptions: state.f4.currencyOptions,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
  };
};

export default connect(mapStateToProps, {
  fetchSmsetppType,
  fetchSmsetppPost,
  f4FetchCurrencyList,
  f4FetchCountryList,
})(injectIntl(ModalPrice));
