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
  const [companies, setCompanies] = useState([]);
  const [dateStart, setDateStart] = useState(moment());
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
    countryId: '',
    waersId: '',
    premiumPriceTypeId: '',
    typeOfSum: '',
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
          varTs.waersId = g3.currency;
        default:
          return varTs;
      }
      return varTs;
    });
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

  const onChangeDate = d => {
    setDateStart(stringYYYYMMDDToMoment(d));
    setInformations({
      ...informations,
      dateStart: d,
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
      countryId: '',
      waersId: '',
      premiumPriceTypeId: '',
      typeOfSum: '',
    });
  };

  console.log(documents);

  const onModalOpen = () => {
    if (
      documents.premiumPriceTypeId === 'Percentage' ||
      documents.premiumPriceTypeId === 'Процент' ||
      documents.premiumPriceTypeId === 'Yüzdesi'
    ) {
      setInformations({ ...informations, premiumPriceTypeId: 1 });
    } else {
      setInformations({ ...informations, premiumPriceTypeId: 2 });
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
            <Form.Field required>
              <label>{messages['bukrs']}</label>
              <Dropdown
                error={
                  test === true && informations.bukrs === '' ? true : false
                }
                clearable="true"
                defaultValue={informations.bukrs}
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
                defaultValue={informations.countryId}
                selection
                options={countryOptions}
                onChange={(e, { value }) => handleChange('country', value)}
                placeholder={messages['country']}
              />
            </Form.Field>

            <Form.Field required>
              <label>{messages['waers']}</label>
              <Header as="h4">{informations.waersId}</Header>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>{messages['typeOfService']}</label>

              <Dropdown
                placeholder="State"
                clearable="true"
                defaultValue={informations.serviceTypeId}
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
                defaultValue={informations.premiumPriceTypeId}
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
    data: state.serviceReducer.data,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
})(injectIntl(EditModal));
