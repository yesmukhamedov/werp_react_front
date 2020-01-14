import React, { useState, useEffect } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Grid,
  Input,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { injectIntl } from 'react-intl';
import './index.css';
import { Dropdown } from 'semantic-ui-react';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
require('moment/locale/ru');

const EditModal = props => {
  const language = localStorage.getItem('language');
  const [modalOpen, setModalOpen] = useState(false);
  const {
    countryList = [],
    companyOptions = [],
    intl: { messages },
    documents,
    onItemCancel,
    active,
  } = props;
  const [countries, setCountries] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [typeOfService, setTypeOfService] = useState([]);
  const [test, setTest] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [dateStart, setDateStart] = useState(moment());
  const [informations, setInformations] = useState({
    bukrs: '',
    bukrsId: 0,
    dateStart: `${dateStart.year()}-${dateStart.month()}-${dateStart.date()}`,
    fc: '',
    mc: '',
    office: '',
    master: '',
    operator: '',
    discount: '',
    total: '',
    countryId: 0,
    country: '',
    waers: '',
    serviceTypeId: 0,
    serviceType: '',
    typeOfSum: '',
  });

  useEffect(() => {
    f4FetchCountryList();
  }, []);
  console.log(props, 'props');
  useEffect(() => {
    let country = countryList.map(item => {
      return { key: item.countryId, text: item.country, value: item.country };
    });
    setCountries(country);
  }, [countryList]);

  const handleChange = (text, v) => {
    setInformations(prev => {
      const varTs = { ...prev };
      switch (text) {
        case 'bukrs':
          let g = companyOptions.find(({ value }) => value === v);
          varTs.bukrsId = v;
          varTs.bukrs = g.text;
          break;

        case 'serviceType':
          varTs.serviceType = v;
          break;

        case 'typeOfSum':
          varTs.typeOfSum = v;
          break;
      }
      return varTs;
    });
  };

  const onInputChange = (text, event) => {
    switch (text) {
      case 'fc':
        setInformations({
          ...informations,
          fc: parseFloat(event.target.value),
        });
        break;
      case 'mc':
        setInformations({
          ...informations,
          mc: parseFloat(event.target.value),
        });
        break;
      case 'office':
        setInformations({
          ...informations,
          office: parseFloat(event.target.value),
        });
        break;
      case 'master':
        setInformations({
          ...informations,
          master: parseFloat(event.target.value),
        });
        break;
      case 'operator':
        setInformations({
          ...informations,
          operator: parseFloat(event.target.value),
        });
        break;
      case 'discount':
        setInformations({
          ...informations,
          discount: parseFloat(event.target.value),
        });
      case 'total':
        setInformations({
          ...informations,
          total: parseFloat(event.target.value),
        });
        break;
    }
  };

  const onChangeDate = d => {
    setDateStart(d);
    setInformations({
      ...informations,
      dateStart: `${d.year()}-${d.month()}-${d.date()}`,
    });
  };

  const onhandleAdd = () => {
    setTest(true);
    const { bukrs, total, country } = informations;

    if (bukrs !== '' && total !== '' && country !== '') {
      setModalOpen(false);
      console.log(informations, 'infos');
      //fetchSmsetppPost(informations);
    }
  };

  const onhandleCancel = () => {
    onItemCancel();
    setTest(false);
    setInformations({
      bukrs: '',
      bukrsId: '',
      dateStart: `${dateStart.year()}-${dateStart.month()}-${dateStart.date()}`,
      fc: '',
      mc: '',
      office: '',
      master: '',
      operator: '',
      discount: '',
      total: '',
      countryId: 0,
      waers: '',
      serviceTypeId: 0,
      serviceType: '',
      typeOfSum: '',
      country: '',
    });
  };

  const onChangeCountryOptions = v => {
    const findCountry = countryOptions.find(({ value }) => value === v);
    const f = countryOptions.find(({ value }) => value === v);
    setInformations({
      ...informations,
      countryId: f.value,
      country: findCountry.text,
      waers: f.currency,
    });
  };

  return (
    <Modal open={modalOpen}>
      <Header content={messages['toEdit']} id="modalHeader" />

      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>{messages['bukrs']}</label>
              <Dropdown
                error={
                  test === true && informations.bukrs === '' ? true : false
                }
                clearable="true"
                search
                selection
                options={companyOptions}
                onChange={(e, { value }) => handleChange('bukrs', value)}
                placeholder={messages['bukrs']}
              />
            </Form.Field>
            <Form.Field required>
              <label>{messages['Task.StartDate']}</label>

              <div className="ui input">
                <DatePicker
                  className="date-auto-width"
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select" //timezone="UTC"
                  selected={dateStart}
                  onChange={date => onChangeDate(date)}
                  dateFormat="DD.MM.YYYY"
                  locale={language}
                  id="datePicker"
                />
                <i
                  aria-hidden="true"
                  className="calendar alternate outline big icon"
                  id="calendarIcon"
                ></i>
              </div>
            </Form.Field>

            <Form.Field required>
              <label>FC({messages['Table.Amount']})</label>
              <Input
                placeholder="Search..."
                type="number"
                onChange={e => onInputChange('fc', e)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>MC({messages['Table.Amount']})</label>
              <Input
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('mc', e)}
              />
            </Form.Field>

            <Form.Field required>
              <label>
                {messages['office']} ({messages['inTotal']})
              </label>
              <Input
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('office', e)}
              />
            </Form.Field>

            <Form.Field required>
              <label>
                {messages['master']} ({messages['inTotal']})
              </label>

              <Input
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('master', e)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>
                {messages['Operator']} ({messages['inTotal']})
              </label>

              <Input
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('operator', e)}
              />
            </Form.Field>
            <Form.Field required>
              <label>
                {messages['discount']} ({messages['inTotal']})
              </label>

              <Input
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('discount', e)}
              />
            </Form.Field>

            <Form.Field required>
              <label>{messages['totalAmount']}</label>
              <Input
                error={
                  test === true && informations.total === '' ? true : false
                }
                type="number"
                placeholder="Number..."
                onChange={e => onInputChange('total', e)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>{messages['country']}</label>
              <Dropdown
                error={
                  test === true && informations.country === '' ? true : false
                }
                clearable="true"
                search
                selection
                options={countryOptions}
                onChange={(e, { value }) => onChangeCountryOptions(value)}
                placeholder={messages['country']}
              />
            </Form.Field>

            <Form.Field required>
              <label>{messages['waers']}</label>
              <Header as="h4">{informations.waers}</Header>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>{messages['typeOfService']}</label>

              <Dropdown
                placeholder="State"
                clearable="true"
                selection
                options={typeOfService}
                onChange={(e, { value }) => handleChange('serviceType', value)}
                placeholder={messages['typeOfService']}
                search
              />
            </Form.Field>

            <Form.Field required>
              <label>{messages['typeOfAmount']}</label>
              <Dropdown
                placeholder={messages['typeOfAmount']}
                search
                selection
                onChange={(e, { value }) => handleChange('typeOfSum', value)}
                options={[
                  { key: 1, text: '%', value: '%' },
                  { key: 2, text: 'n', value: 'n' },
                ]}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button inverted color="red" onClick={onhandleCancel}>
          <Icon name="remove" /> {messages['cancel']}
        </Button>
        <Button inverted color="blue" onClick={onhandleAdd}>
          <Icon name="checkmark" /> {messages['save']}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
})(injectIntl(EditModal));
