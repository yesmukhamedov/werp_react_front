import React, { useState, useEffect } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Input,
  Form,
  Select,
  Grid,
  Table,
  Label,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import './index.css';
import { Dropdown } from 'semantic-ui-react';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { injectIntl } from 'react-intl';
import {
  fetchSmsetppType,
  fetchSmsetppPost,
  fetchSmsetpp,
  fetchSmsetppPremiumPriceType,
  fetchSmsetppHistory,
  fetchSmsetppGetProductList,
} from '../../serviceAction';
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
    premium = [],
    fetchSmsetppPost,
    countryList = [],
    companyOptions = [],
    intl: { messages },
    param,
    serviceType = [],
    serviceTypeOptions,
    productList = [],
    search = {},
    smsetppProductListAdd = [],
  } = props;

  const language = localStorage.getItem('language');
  const [typeOfService, setTypeOfService] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [test, setTest] = useState(false);
  const [dateStart, setDateStart] = useState(moment());
  const [premiumPriceTypeId, setPremiumPriceTypeId] = useState([]);
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
    countryId: null,
    waers: null,
    serviceTypeId: null,
    premiumPriceTypeId: 2,
    productId: 0,
  });

  useEffect(() => {
    const premiumPrice = premium.map(item => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
      };
    });
    setPremiumPriceTypeId(premiumPrice);
  }, [premium]);

  useEffect(() => {
    let filter = serviceType.filter(
      ({ name }) => name === 'Продажа картриджей' || name === 'Установка',
    );
    let service = filter.map(item => {
      return { key: item.id, text: item.name, value: item.id };
    });
    setTypeOfService(service);
  }, [serviceType]);

  useEffect(() => {
    let country = countryList.map(item => {
      return {
        key: item.countryId,
        text: item.country,
        value: item.countryId,
        currencyid: item.currencyId,
        currency: item.currency,
      };
    });
    setCountryOptions(country);
  }, [countryList]);

  const clearInformation = () => {
    setDateStart(moment());
    setViewWaer('');
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
      countryId: null,
      productId: null,
      waers: null,
      serviceTypeId: null,
      premiumPriceTypeId: 2,
    });
  };

  const handleChange = (text, v) => {
    setInformations(prev => {
      const varTs = { ...prev };
      switch (text) {
        case 'bukrs':
          varTs.bukrs = v;
          props.fetchSmsetppGetProductList({ bukrs: v });
          break;

        case 'serviceType':
          varTs.serviceTypeId = parseFloat(v);
          break;

        case 'typeOfSum':
          varTs.premiumPriceTypeId = parseFloat(v);
        case 'productId':
          if (v === 0) {
            varTs.productId = null;
          } else {
            varTs.productId = v;
          }
          break;
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
      setViewWaer(waer.currency);
    }
  };

  const productOpt = smsetppProductListAdd.map(item => {
    return {
      key: item.matnr,
      text: item.text45,
      value: item.matnr,
    };
  });

  const productOptions = [{ key: 66666, text: 'Все', value: 0 }, ...productOpt];

  const onChangeDate = d => {
    setDateStart(stringYYYYMMDDToMoment(d));
    setInformations({
      ...informations,
      dateStart: d,
    });
  };

  const onhandleAdd = () => {
    setTest(true);
    const { bukrs, country, dateStart, serviceTypeId } = informations;

    if (
      bukrs !== '' &&
      country !== '' &&
      dateStart !== '' &&
      serviceTypeId !== null
    ) {
      setTest(false);
      setModalOpen(false);
      fetchSmsetppPost(informations, () => {
        props.fetchSmsetpp(param);
        props.fetchSmsetppHistory(param);
      });
      clearInformation();
    }
  };

  const onhandleCancel = () => {
    setModalOpen(false);
    setTest(false);
    clearInformation();
  };

  const [statusServiceType, setStatusServiceType] = useState(true);

  useEffect(() => {
    if (informations.serviceTypeId === 1) {
      setStatusServiceType(false);
    } else {
      setStatusServiceType(true);
      setInformations({
        ...informations,
        fc: 0,
        mc: 0,
      });
    }
  }, [informations.serviceTypeId]);

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
        case 'total':
          varTs.total = t;
          varTs.office = parseFloat(
            varTs.total - (varTs.master + varTs.operator + varTs.discount),
          );
          break;

        case 'master':
          varTs.master = t;
          varTs.office = parseFloat(
            varTs.total - (varTs.master + varTs.operator + varTs.discount),
          );
          break;
        case 'operator':
          varTs.operator = t;
          varTs.office = parseFloat(
            varTs.total - (varTs.master + varTs.operator + varTs.discount),
          );
          break;
        case 'discount':
          varTs.discount = t;
          varTs.office = parseFloat(
            varTs.total - (varTs.master + varTs.operator + varTs.discount),
          );
          break;
        case 'office':
          varTs.office = t;
          break;

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
          color="green"
          floated="right"
          onClick={() => setModalOpen(true)}
        >
          <Icon name="plus" />
          {messages['toAdd']}
        </Button>
      }
      open={modalOpen}
    >
      <Header content={messages['toAdd']} id="modalHeader" />

      <Modal.Content>
        <Form>
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Form.Field
                    //value={search.bukrs}
                    selection
                    label={messages['bukrs']}
                    control={Select}
                    options={companyOptions}
                    onChange={(e, { value }) => handleChange('bukrs', value)}
                    placeholder={messages['bukrs']}
                    error={
                      test === true && informations.bukrs === '' ? true : false
                    }
                    required
                  />
                </Table.Cell>

                <Table.Cell>
                  <Form.Field>
                    <label>{messages['totalAmount']}</label>
                    <Input
                      label={{
                        basic: true,
                        content:
                          informations.waers === null ? '' : informations.waers,
                      }}
                      labelPosition="right"
                      placeholder="Number..."
                      onFocus={handleFocus}
                      onChange={e => onInputChange('total', e)}
                      value={moneyFormat(informations.total)}
                      error={test === true ? true : false}
                      required
                    ></Input>
                  </Form.Field>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Form.Field
                    selection
                    control={Select}
                    options={countryOptions}
                    label={messages['country']}
                    placeholder={messages['country']}
                    onChange={(e, { value }) => handleChange('country', value)}
                    error={
                      test === true && informations.countryId === null
                        ? true
                        : false
                    }
                    required
                  />
                </Table.Cell>

                <Table.Cell>
                  <Form.Field>
                    <label>{`${messages['master']} (${messages['inTotal']})`}</label>
                    <Input
                      label={{
                        basic: true,
                        content:
                          informations.waers === null ? '' : informations.waers,
                      }}
                      labelPosition="right"
                      placeholder="Number..."
                      value={moneyFormat(informations.master)}
                      onFocus={handleFocus}
                      onChange={e => onInputChange('master', e)}
                    />
                  </Form.Field>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <label>{messages['TBL_H__PRODUCT']}</label>
                  <Dropdown
                    fluid
                    selection
                    value={
                      informations.productId === null
                        ? 0
                        : informations.productId
                    }
                    options={productOptions}
                    onChange={(e, value) =>
                      handleChange('productId', value.value)
                    }
                  />
                </Table.Cell>

                <Table.Cell>
                  <Form.Field>
                    <label>{`${messages['Operator']} (${messages['inTotal']})`}</label>
                    <Input
                      label={{
                        basic: true,
                        content:
                          informations.waers === null ? '' : informations.waers,
                      }}
                      labelPosition="right"
                      placeholder="Number..."
                      value={moneyFormat(informations.operator)}
                      onFocus={handleFocus}
                      onChange={e => onInputChange('operator', e)}
                    />
                  </Form.Field>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Form.Field required>
                    <label>{messages['typeOfService']}</label>

                    <Dropdown
                      placeholder="State"
                      clearable="true"
                      selection
                      options={serviceTypeOptions}
                      onChange={(e, { value }) =>
                        handleChange('serviceType', value)
                      }
                      placeholder={messages['typeOfService']}
                      error={
                        test === true && informations.serviceTypeId === null
                          ? true
                          : false
                      }
                    />
                  </Form.Field>
                </Table.Cell>

                <Table.Cell>
                  <Form.Field>
                    <label>{`${messages['discount']} (${messages['inTotal']})`}</label>
                    <Input
                      label={{
                        basic: true,
                        content:
                          informations.waers === null ? '' : informations.waers,
                      }}
                      labelPosition="right"
                      placeholder="Number..."
                      value={moneyFormat(informations.discount)}
                      onFocus={handleFocus}
                      onChange={e => onInputChange('discount', e)}
                    />
                  </Form.Field>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Form.Field
                    disabled={statusServiceType}
                    control={Input}
                    label={`FC(${messages['Table.Amount']})`}
                    placeholder="Number..."
                    value={moneyFormat(informations.fc)}
                    onFocus={handleFocus}
                    onChange={e => onInputChange('fc', e)}
                  />
                </Table.Cell>

                <Table.Cell>
                  <Form.Field>
                    <label>{`${messages['office']}(${messages['inTotal']})`}</label>
                    <Input
                      label={{
                        basic: true,
                        content:
                          informations.waers === null ? '' : informations.waers,
                      }}
                      labelPosition="right"
                      placeholder="Number..."
                      value={informations.office}
                      onFocus={handleFocus}
                      onChange={e => onInputChange('office', e)}
                    />
                  </Form.Field>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Form.Field
                    disabled={statusServiceType}
                    control={Input}
                    label={`MC(${messages['Table.Amount']})`}
                    placeholder="Number..."
                    value={moneyFormat(informations.mc)}
                    onFocus={handleFocus}
                    onChange={e => onInputChange('mc', e)}
                  />
                </Table.Cell>

                <Table.Cell>
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
                        onChange={date =>
                          onChangeDate(momentToStringYYYYMMDD(date))
                        }
                        dateFormat="DD.MM.YYYY"
                        locale={language}
                        id="datePicker"
                      />
                    </Input>
                  </Form.Field>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Form.Field>
                    <label>{messages['typeOfAmount']}</label>
                    <Dropdown
                      placeholder={messages['typeOfAmount']}
                      selection
                      value={`${informations.premiumPriceTypeId}`}
                      onChange={(e, { value }) =>
                        handleChange('typeOfSum', value)
                      }
                      options={premiumPriceTypeId}
                    />
                  </Form.Field>
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
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
    premium: state.serviceReducer.dynamicObject.premiumPriceTypeId,
    data: state.serviceReducer.dynamicObject,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    serviceType: state.serviceReducer.dynamicObject.type,
    smsetppProductListAdd:
      state.serviceReducer.dynamicObject.smsetppProductList,
  };
};

export default connect(mapStateToProps, {
  fetchSmsetppType,
  fetchSmsetppPost,
  f4FetchCountryList,
  fetchSmsetpp,
  fetchSmsetppHistory,
  fetchSmsetppPremiumPriceType,
  fetchSmsetppGetProductList,
})(injectIntl(AddPrice));
