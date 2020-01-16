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
  moneyInputHanler,
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
  const [viewWaer, setViewWaer] = useState('');
  const [informations, setInformations] = useState({
    bukrs: '',
    dateStart: momentToStringYYYYMMDD(dateStart),
    fc: 0,
    mc: 0,
    office: 0,
    master: 0,
    operator: 0,
    discount: 0,
    total: 0,
    countryId: 0,
    waersId: 0,
    serviceTypeId: 0,
    typeOfSum: 0,
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

  const clearInformation = () => {
    setInformations({
      bukrs: '',
      dateStart: momentToStringYYYYMMDD(dateStart),
      fc: 0,
      mc: 0,
      office: 0,
      master: 0,
      operator: 0,
      discount: 0,
      total: 0,
      countryId: 0,
      waersId: 0,
      serviceTypeId: 0,
      typeOfSum: 0,
    });
  };

  const handleChange = (text, v) => {
    setInformations(prev => {
      const varTs = { ...prev };
      switch (text) {
        case 'bukrs':
          varTs.bukrs = v;
          break;

        case 'serviceType':
          varTs.serviceTypeId = parseFloat(v);
          break;

        case 'typeOfSum':
          varTs.typeOfSum = parseFloat(v);
        default:
          return varTs;
      }
      return varTs;
    });
    if (text === 'country') {
      const waer = countryOptions.find(({ value }) => value === v);
      setInformations({ ...informations, countryId: parseFloat(v) });
      setInformations({ ...informations, waersId: parseFloat(v) });
      setViewWaer(waer.currency);
    }
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

    if (bukrs !== '' && total !== 0 && countryId !== '') {
      setTest(false);
      setModalOpen(false);
      console.log(informations, 'infos');
      /*const y = {
        bukrs: 'AURA',
        countryId: 1,
        dateStart: '2020-01-14',
        discount: 1,
        fc: 1,
        id: 80,
        master: 1,
        mc: 1,
        office: 1,
        operator: 1,
        premiumPriceTypeId: 1,
        serviceTypeId: 1,
        total: 1,
        waersId: 1,
      };
      fetchSmsetppPost(y);*/
      setDateStart(moment());
      clearInformation();
    }
  };

  const onhandleCancel = () => {
    setDateStart(moment());
    setModalOpen(false);
    setTest(false);
    clearInformation();
  };

  const onInputChange = (text, event) => {
    const f = moneyInputHanler(event.target.value);
    const t = parseFloat(f);
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
        <Button
          inverted
          color="blue"
          onClick={() => setModalOpen(true)}
          floated="right"
        >
          {messages['toAdd']}
        </Button>
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
                onChange={e => onInputChange('fc', e)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>MC({messages['Table.Amount']})</label>
              <Input
                value={moneyFormat(informations.mc)}
                onFocus={handleFocus}
                placeholder="Number..."
                onChange={e => onInputChange('mc', e)}
              />
            </Form.Field>

            <Form.Field required>
              <label>
                {messages['office']} ({messages['inTotal']})
              </label>
              <Input
                value={moneyFormat(informations.office)}
                onFocus={handleFocus}
                placeholder="Number..."
                onChange={e => onInputChange('office', e)}
              />
            </Form.Field>

            <Form.Field required>
              <label>
                {messages['master']} ({messages['inTotal']})
              </label>

              <Input
                value={moneyFormat(informations.master)}
                onFocus={handleFocus}
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
                value={moneyFormat(informations.operator)}
                onFocus={handleFocus}
                placeholder="Number..."
                onChange={e => onInputChange('operator', e)}
              />
            </Form.Field>
            <Form.Field required>
              <label>
                {messages['discount']} ({messages['inTotal']})
              </label>

              <Input
                value={moneyFormat(informations.discount)}
                onFocus={handleFocus}
                placeholder="Number..."
                onChange={e => onInputChange('discount', e)}
              />
            </Form.Field>

            <Form.Field required>
              <label>{messages['totalAmount']}</label>
              <Input
                error={test === true && informations.total === 0 ? true : false}
                onFocus={handleFocus}
                value={moneyFormat(informations.total)}
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
              <Header as="h4">{viewWaer}</Header>
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
                  { key: 1, text: '%', value: 1 },
                  { key: 0, text: 'n', value: 0 },
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
