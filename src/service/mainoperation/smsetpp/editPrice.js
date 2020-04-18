import React, { useState, useEffect } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Input,
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
import { fetchSmsetpp, fetchSmsetppPut } from '../../serviceAction';
import {
  stringYYYYMMDDToMoment,
  handleFocus,
  moneyInputHanler,
  moneyFormat,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import { doGet } from '../../../utils/apiActions';

require('moment/locale/ru');
require('moment/locale/tr');

const EditModal = props => {
  const language = localStorage.getItem('language');
  const {
    premium = [],
    countryList = [],
    companyOptions = [],
    intl: { messages },
    row,
    fetchSmsetppPut,
    fetchSmsetpp,
    param,
    serviceType = [],
  } = props;
  const [countryOptions, setCountryOptions] = useState([]);
  const [typeOfService, setTypeOfService] = useState([]);
  const [test, setTest] = useState(false);
  const [premiumPriceTypeId, setPremiumPriceTypeId] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [informations, setInformations] = useState(null);

  const onClickEdit = () => {
    doGet(`smsetpp/${row.id}`).then(({ data }) => {
      setInformations(data.data);
    });
    setModalOpen(true);
  };

  useEffect(() => {
    let country = countryList.map(
      item => {
        return {
          key: item.countryId,
          text: item.country,
          value: item.countryId,
          currency: item.currency,
          currencyid: item.currencyId,
        };
      },
      [countryList],
    );
    setCountryOptions(country);
  }, [countryList]);

  useEffect(() => {
    const premiumPrice = premium.map(item => {
      return {
        key: parseInt(item.id, 10),
        text: item.name,
        value: parseInt(item.id, 10),
      };
    });
    setPremiumPriceTypeId(premiumPrice);
  }, [premium]);

  useEffect(() => {
    let service = serviceType.map(item => {
      return {
        key: parseInt(item.id, 10),
        text: item.name,
        value: parseInt(item.id, 10),
      };
    });
    setTypeOfService(service);
  }, [serviceType]);

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
      setInformations({
        ...informations,
        waers: waer.currency,
        countryId: v,
      });
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
          varTs.total = parseFloat(
            varTs.office + varTs.master + varTs.operator - varTs.discount,
          );
          break;
        case 'master':
          varTs.master = t;
          varTs.total = parseFloat(
            varTs.office + varTs.master + varTs.operator - varTs.discount,
          );
          break;
        case 'operator':
          varTs.operator = t;
          varTs.total = parseFloat(
            varTs.office + varTs.master + varTs.operator - varTs.discount,
          );
          break;
        case 'discount':
          varTs.discount = t;
          varTs.total = parseFloat(
            varTs.office + varTs.master + varTs.operator - varTs.discount,
          );
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
      fetchSmsetppPut({ ...informations }, () => {
        fetchSmsetpp(param);
      });
    }
  };

  const onhandleCancel = () => {
    setModalOpen(false);
    setTest(false);
    setInformations(null);
  };

  return (
    <Modal
      open={modalOpen}
      trigger={
        <Button color="blue" inverted icon="edit" onClick={onClickEdit} />
      }
    >
      <Header content={messages['toEdit']} id="modalHeader" />
      <Modal.Content>
        {informations === null ? null : (
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                selection
                label={messages['bukrs']}
                control={Select}
                options={companyOptions}
                onChange={(e, { value }) => handleChange('bukrs', value)}
                placeholder={messages['bukrs']}
                value={informations.bukrs}
                error={
                  test === true && informations.bukrs === '' ? true : false
                }
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
                    selected={stringYYYYMMDDToMoment(informations.dateStart)}
                    onChange={date =>
                      onChangeDate(momentToStringYYYYMMDD(date))
                    }
                    dateFormat="DD.MM.YYYY"
                    value={informations.dateStart}
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
                control={Input}
                label={`MC(${messages['Table.Amount']})`}
                placeholder="Number..."
                value={moneyFormat(informations.mc)}
                onFocus={handleFocus}
                onChange={e => onInputChange('mc', e)}
              />

              <Form.Field
                control={Input}
                label={`${messages['office']}(${messages['inTotal']})`}
                placeholder="Number..."
                value={moneyFormat(informations.office)}
                onFocus={handleFocus}
                onChange={e => onInputChange('office', e)}
              />

              <Form.Field
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
                control={Input}
                label={`${messages['Operator']} (${messages['inTotal']})`}
                placeholder="Number..."
                value={moneyFormat(informations.operator)}
                onFocus={handleFocus}
                onChange={e => onInputChange('operator', e)}
              />

              <Form.Field
                control={Input}
                label={`${messages['discount']} (${messages['inTotal']})`}
                placeholder="Number..."
                value={moneyFormat(informations.discount)}
                onFocus={handleFocus}
                onChange={e => onInputChange('discount', e)}
              />

              <Form.Input
                label={messages['totalAmount']}
                placeholder="Number..."
                readOnly
                onFocus={handleFocus}
                value={moneyFormat(informations.total)}
                onChange={e => onInputChange('total', e)}
                error={test === true && informations.total === 0 ? true : false}
                required
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                selection
                control={Select}
                options={countryOptions}
                value={informations.countryId}
                label={messages['country']}
                placeholder={messages['country']}
                onChange={(e, { value }) => handleChange('country', value)}
                error={
                  test === true && informations.countryId === 0 ? true : false
                }
                required
              />

              <Form.Field>
                <label>{messages['waers']}</label>
                <Header as="h4">{informations.waers}</Header>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>{messages['typeOfService']}</label>

                <Dropdown
                  placeholder="State"
                  clearable="true"
                  selection
                  value={informations.serviceTypeId}
                  options={typeOfService}
                  onChange={(e, { value }) =>
                    handleChange('serviceType', value)
                  }
                  placeholder={messages['typeOfService']}
                />
              </Form.Field>

              <Form.Field>
                <label>{messages['typeOfAmount']}</label>
                <Dropdown
                  placeholder={messages['typeOfAmount']}
                  selection
                  value={informations.premiumPriceTypeId}
                  onChange={(e, { value }) => handleChange('typeOfSum', value)}
                  options={premiumPriceTypeId}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        )}
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
    premium: state.serviceReducer.dynamicObject.premiumPriceTypeId,
    data: state.serviceReducer.dynamicObject,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    serviceType: state.serviceReducer.dynamicObject.type,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  fetchSmsetppPut,
  fetchSmsetpp,
})(injectIntl(EditModal));
