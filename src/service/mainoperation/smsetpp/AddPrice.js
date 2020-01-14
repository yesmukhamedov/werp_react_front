import React, { useState, useEffect } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Input,
  Divider,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import './index.css';
import { Dropdown } from 'semantic-ui-react';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { injectIntl } from 'react-intl';
import { fetchSmsetppType, fetchSmsetppPost } from '../../serviceAction';

import {
  stringYYYYMMDDToMoment,
  handleFocus,
  moneyFormat,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';

require('moment/locale/ru');
require('moment/locale/tr');

const AddPrice = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data,
    fetchSmsetppType,
    fetchSmsetppPost,
    countryList = [],
    companyOptions = [],
    intl: { messages },
  } = props;
  const language = localStorage.getItem('language');
  const [typeOfService, setTypeOfService] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [test, setTest] = useState(false);
  const [dateStart, setDateStart] = useState(moment());
  const [informations, setInformations] = useState({
    bukrs: '',
    dateStart: momentToStringYYYYMMDD(dateStart),
    fc: '',
    mc: '',
    office: '',
    master: '',
    operator: '',
    discount: '',
    total: '',
    countryId: '',
    waers: '',
    serviceTypeId: '',
    typeOfSum: '',
  });

  useEffect(() => {
    fetchSmsetppType();
  }, []);

  useEffect(() => {
    let service = data.type.map(item => {
      return { key: item.id, text: item.nameEn, value: item.id };
    });
    setTypeOfService(service);
  }, [data.type]);

  useEffect(() => {
    let country = countryList.map(item => {
      return {
        key: item.countryId,
        text: item.country,
        value: item.countryId,
        currency: item.currency,
      };
    });

    setCountryOptions(country);
  }, [countryList]);

  const handleChange = (text, v) => {
    setInformations(prev => {
      const varTs = { ...prev };
      switch (text) {
        case 'bukrs':
          let g = companyOptions.find(({ value }) => value === v);
          varTs.bukrs = g.text;
          break;

        case 'serviceType':
          let g2 = typeOfService.find(({ value }) => value === v);
          varTs.serviceTypeId = g2.text;
          break;

        case 'typeOfSum':
          let type;
          if (v === '%') {
            type = 'Percentage';
          } else if (v === 'n') {
            type = 'Number';
          }
          varTs.typeOfSum = type;
          break;
        case 'country':
          let g3 = countryOptions.find(({ value }) => value === v);
          varTs.countryId = g3.text;
          varTs.waers = g3.currency;
        default:
          return varTs;
      }
      return varTs;
    });
  };

  const onChangeDate = d => {
    setDateStart(stringYYYYMMDDToMoment(d));
    setInformations({
      ...informations,
      dateStart: d,
    });
  };

  const onhandleAdd = () => {
    setTest(true);
    const { bukrs, total, countryId } = informations;

    if (bukrs !== '' && total !== '' && countryId !== '') {
      setModalOpen(false);
      console.log(informations, 'infos');
      //fetchSmsetppPost(informations);
      setDateStart(moment());
    }
  };

  const onhandleCancel = () => {
    setDateStart(moment());
    setModalOpen(false);
    setTest(false);
    setInformations({
      bukrs: '',
      dateStart: momentToStringYYYYMMDD(dateStart),
      fc: '',
      mc: '',
      office: '',
      master: '',
      operator: '',
      discount: '',
      total: '',
      countryId: '',
      waers: '',
      serviceTypeId: '',
      typeOfSum: '',
      country: '',
    });
  };

  const onInputChange = (text, event) => {
    console.log(text, event.target.value);
    const t = parseFloat(event.target.value);
    setInformations(prev => {
      const varTs = { ...prev };
      switch (text) {
        case 'fc':
          varTs.fc = t;
          break;
        case 'mc':
          varTs.mc = t;
          break;
        case 'office':
          varTs.office = t;
          break;
        case 'master':
          varTs.master = t;
          break;
        case 'operator':
          varTs.operator = t;
          break;
        case 'discount':
          varTs.discount = t;
          break;
        case 'total':
          varTs.total = t;
        default:
          return varTs;
      }
      return varTs;
    });
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
      open={modalOpen}
    >
      <Header content={messages['toAdd']} id="modalHeader" />

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
                  selected={stringYYYYMMDDToMoment(dateStart)}
                  onChange={date => onChangeDate(momentToStringYYYYMMDD(date))}
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
                value={moneyFormat(informations.fc)}
                onFocus={handleFocus}
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
                  test === true && informations.countryId === '' ? true : false
                }
                clearable="true"
                search
                selection
                options={countryOptions}
                onChange={(e, { value }) => handleChange('country', value)}
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
          <Icon name="checkmark" /> {messages['BTN__ADD']}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    data: state.serviceReducer.data,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
  };
};

export default connect(mapStateToProps, {
  fetchSmsetppType,
  fetchSmsetppPost,
  f4FetchCountryList,
})(injectIntl(AddPrice));
