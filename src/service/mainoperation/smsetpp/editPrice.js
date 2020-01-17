import React, { useState, useEffect } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Input,
  Divider,
  Form,
  Select,
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

const EditModal = props => {
  const language = localStorage.getItem('language');
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data,
    countryList = [],
    companyOptions = [],
    intl: { messages },
    documents,
  } = props;
  const [countries, setCountries] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [typeOfService, setTypeOfService] = useState([]);
  const [test, setTest] = useState(false);
  const [viewWaer, setViewWaer] = useState('');
  const [dateStart, setDateStart] = useState(
    moment(stringYYYYMMDDToMoment(documents.dateStart)),
  );
  const [informations, setInformations] = useState({
    bukrs: '',
    dateStart: momentToStringYYYYMMDD(dateStart),
    fc: documents.fc,
    mc: documents.mc,
    office: documents.office,
    master: documents.master,
    operator: documents.operator,
    discount: documents.discount,
    total: documents.total,
    countryId: 0,
    waersId: 0,
    serviceTypeId: 0,
    premiumPriceTypeId: 0,
  });

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

  useEffect(() => {
    let service = data.type.map(item => {
      return { key: item.id, text: item.nameEn, value: item.id };
    });
    setTypeOfService(service);
  }, [data.type]);

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
          varTs.premiumPriceTypeId = parseFloat(v);
        default:
          return varTs;
      }
      return varTs;
    });
    if (text === 'country') {
      const waer = countryOptions.find(({ value }) => value === v);
      setInformations({ ...informations, waersId: v, countryId: v });
      setViewWaer(waer.currency);
    }
  };

  const onInputChange = (text, event) => {
    const f = moneyInputHanler(event.target.value, 2);
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

  const onChangeDate = d => {
    setDateStart(stringYYYYMMDDToMoment(d));
    setInformations({
      ...informations,
      dateStart: d,
    });
  };

  const onhandleAdd = () => {
    setTest(true);
    const { bukrs, total, countryId, dateStart } = informations;

    if (bukrs !== '' && total !== 0 && countryId !== 0 && dateStart !== '') {
      setTest(false);
      setModalOpen(false);
      console.log(informations, 'infos');
      //fetchSmsetppPost(informations);
    }
  };

  const onhandleCancel = () => {
    setModalOpen(false);
    setTest(false);
    setInformations({
      bukrs: '',
      dateStart: momentToStringYYYYMMDD(dateStart),
      fc: documents.fc,
      mc: documents.mc,
      office: documents.office,
      master: documents.master,
      operator: documents.operator,
      discount: documents.discount,
      total: documents.total,
      countryId: 0,
      waersId: 0,
      serviceTypeId: 0,
      premiumPriceTypeId: 0,
    });
  };

  const onModalOpen = () => {
    console.log(documents.dateStart);
    if (
      documents.premiumPriceTypeId === 'Percentage' ||
      documents.premiumPriceTypeId === 'Процент' ||
      documents.premiumPriceTypeId === 'Yüzdesi'
    ) {
      console.log('object');
      setInformations({ ...informations, premiumPriceTypeId: 1 });
    } else {
      console.log('object2');
      setInformations({ ...informations, premiumPriceTypeId: 0 });
    }

    const bukr = companyOptions.find(({ text }) => text === documents.bukrs);
    const countr = countryOptions.find(
      ({ text }) => text === documents.countryId,
    );
    const serviceType = typeOfService.find(
      ({ text }) => text === documents.serviceTypeId,
    );
    setInformations({
      ...informations,
      bukrs: bukr.value,
      countryId: countr.value,
      serviceTypeId: serviceType.value,
      waersId: countr.currency,
    });
    setModalOpen(true);
  };

  return (
    <Modal
      trigger={
        <Button icon inverted color="blue" onClick={onModalOpen}>
          <Icon name="edit"></Icon>
        </Button>
      }
      open={modalOpen}
    >
      <Header content={messages['toEdit']} id="modalHeader" />

      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              selection
              label={messages['bukrs']}
              control={Select}
              options={companyOptions}
              onChange={(e, { value }) => handleChange('bukrs', value)}
              placeholder={messages['bukrs']}
              defaultValue={informations.bukrs}
              error={test === true && informations.bukrs === '' ? true : false}
              required
            />

            <Form.Field required>
              <label>{messages['Task.StartDate']}</label>
              <Input>
                <DatePicker
                  className="date-auto-width"
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
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
              </Input>
            </Form.Field>

            <Form.Field
              required
              control={Input}
              label={`FC(${messages['Table.Amount']})`}
              placeholder="Number..."
              value={moneyFormat(informations.fc)}
              onFocus={handleFocus}
              onChange={e => onInputChange('fc', e)}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              required
              control={Input}
              label={`MC(${messages['Table.Amount']})`}
              placeholder="Number..."
              value={moneyFormat(informations.mc)}
              onFocus={handleFocus}
              onChange={e => onInputChange('mc', e)}
            />

            <Form.Field
              required
              control={Input}
              label={`${messages['office']}(${messages['inTotal']})`}
              placeholder="Number..."
              value={moneyFormat(informations.office)}
              onFocus={handleFocus}
              onChange={e => onInputChange('office', e)}
            />

            <Form.Field
              required
              control={Input}
              label={`${messages['master']} (${messages['inTotal']})`}
              placeholder="Number..."
              value={moneyFormat(informations.master)}
              onFocus={handleFocus}
              onChange={e => onInputChange('master', e)}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              required
              control={Input}
              label={`${messages['Operator']} (${messages['inTotal']})`}
              placeholder="Number..."
              value={moneyFormat(informations.operator)}
              onFocus={handleFocus}
              onChange={e => onInputChange('operator', e)}
            />

            <Form.Field
              required
              control={Input}
              label={`${messages['discount']} (${messages['inTotal']})`}
              placeholder="Number..."
              value={moneyFormat(informations.discount)}
              onFocus={handleFocus}
              onChange={e => onInputChange('discount', e)}
            />

            <Form.Field
              required
              control={Input}
              label={messages['totalAmount']}
              placeholder="Number..."
              onFocus={handleFocus}
              value={moneyFormat(informations.total)}
              onChange={e => onInputChange('total', e)}
              error={test === true && informations.total === 0 ? true : false}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              selection
              control={Select}
              options={countryOptions}
              defaultValue={informations.countryId}
              label={messages['country']}
              placeholder={messages['country']}
              onChange={(e, { value }) => handleChange('country', value)}
              error={
                test === true && informations.countryId === 0 ? true : false
              }
              required
            />

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
                defaultValue={informations.serviceTypeId}
                options={typeOfService}
                onChange={(e, { value }) => handleChange('serviceType', value)}
                placeholder={messages['typeOfService']}
              />
            </Form.Field>

            <Form.Field required>
              <label>{messages['typeOfAmount']}</label>
              <Dropdown
                placeholder={messages['typeOfAmount']}
                selection
                defaultValue={informations.premiumPriceTypeId}
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
  f4FetchCountryList,
})(injectIntl(EditModal));
