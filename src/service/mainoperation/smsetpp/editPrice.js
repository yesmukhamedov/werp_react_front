import React, { useState, useEffect } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Input,
  Form,
  Select,
  Table,
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
  fetchSmsetpp,
  fetchSmsetppPut,
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
    serviceTypeOptions,
    productList = [],
    getProduct,
    smsetppProductList = [],
  } = props;

  const [countryOptions, setCountryOptions] = useState([]);
  const [typeOfService, setTypeOfService] = useState([]);
  const [test, setTest] = useState(false);
  const [premiumPriceTypeId, setPremiumPriceTypeId] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [informations, setInformations] = useState({});

  const onClickEdit = () => {
    setModalOpen(true);
    doGet(`smsetpp/${row.id}`).then(({ data }) => {
      setInformations(data.data);
    });
  };

  useEffect(() => {
    let country = countryList.map(item => {
      return {
        key: item.countryId,
        text: item.country,
        value: item.countryId,
        currency: item.currency,
        currencyid: item.currencyId,
      };
    });
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
    let filter = serviceType.filter(
      ({ name }) => name === 'Продажа картриджей' || name === 'Установка',
    );
    let service = filter.map(item => {
      return {
        key: parseInt(item.id),
        text: item.name,
        value: parseInt(item.id),
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
          props.fetchSmsetppGetProductList(v);
          break;

        case 'serviceType':
          varTs.serviceTypeId = parseFloat(v);
          break;
        case 'productId':
          varTs.productId = v;
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
        props.fetchSmsetppHistory(param);
      });
    }
  };

  const onhandleCancel = () => {
    setModalOpen(false);
    setTest(false);
    setInformations(null);
  };

  const productOptions = productList.map(item => {
    return {
      key: item.matnr,
      text: item.name,
      value: item.matnr,
    };
  });

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
            <Table celled>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Form.Field
                      selection
                      label={messages['bukrs']}
                      control={Select}
                      options={companyOptions}
                      onChange={(e, { value }) => handleChange('bukrs', value)}
                      placeholder={messages['bukrs']}
                      value={informations.bukrs}
                      error={
                        test === true && informations.bukrs === ''
                          ? true
                          : false
                      }
                      required
                    />
                  </Table.Cell>

                  <Table.Cell>
                    <Form.Input
                      label={messages['totalAmount']}
                      placeholder="Number..."
                      //readOnly
                      onFocus={handleFocus}
                      value={moneyFormat(informations.total)}
                      onChange={e => onInputChange('total', e)}
                      error={
                        test === true && informations.total === 0 ? true : false
                      }
                      required
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Form.Field
                      selection
                      control={Select}
                      options={countryOptions}
                      value={informations.countryId}
                      label={messages['country']}
                      placeholder={messages['country']}
                      onChange={(e, { value }) =>
                        handleChange('country', value)
                      }
                      error={
                        test === true && informations.countryId === 0
                          ? true
                          : false
                      }
                      required
                    />
                  </Table.Cell>

                  <Table.Cell>
                    <Form.Field
                      control={Input}
                      label={`${messages['master']} (${messages['inTotal']})`}
                      placeholder="Number..."
                      value={moneyFormat(informations.master)}
                      onFocus={handleFocus}
                      onChange={e => onInputChange('master', e)}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <label>{messages['TBL_H__PRODUCT']}</label>
                    <Dropdown
                      fluid
                      selection
                      value={informations.productId}
                      options={productOptions}
                      onChange={(e, value) =>
                        handleChange('productId', value.value)
                      }
                    />
                  </Table.Cell>

                  <Table.Cell>
                    <Form.Field
                      control={Input}
                      label={`${messages['Operator']} (${messages['inTotal']})`}
                      placeholder="Number..."
                      value={moneyFormat(informations.operator)}
                      onFocus={handleFocus}
                      onChange={e => onInputChange('operator', e)}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Form.Field>
                      <label>{messages['typeOfService']}</label>

                      <Dropdown
                        placeholder="State"
                        clearable="true"
                        selection
                        value={informations.serviceTypeId}
                        options={serviceTypeOptions}
                        onChange={(e, { value }) =>
                          handleChange('serviceType', value)
                        }
                        placeholder={messages['typeOfService']}
                      />
                    </Form.Field>
                  </Table.Cell>

                  <Table.Cell>
                    <Form.Field
                      control={Input}
                      label={`${messages['discount']} (${messages['inTotal']})`}
                      placeholder="Number..."
                      value={moneyFormat(informations.discount)}
                      onFocus={handleFocus}
                      onChange={e => onInputChange('discount', e)}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Form.Field
                      control={Input}
                      label={`FC(${messages['Table.Amount']})`}
                      placeholder="Number..."
                      value={moneyFormat(informations.fc)}
                      onFocus={handleFocus}
                      onChange={e => onInputChange('fc', e)}
                    />
                  </Table.Cell>

                  <Table.Cell>
                    <Form.Field
                      control={Input}
                      label={`${messages['office']}(${messages['inTotal']})`}
                      placeholder="Number..."
                      readOnly
                      value={moneyFormat(informations.office)}
                      onFocus={handleFocus}
                      onChange={e => onInputChange('office', e)}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Form.Field
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
                          selected={stringYYYYMMDDToMoment(
                            informations.dateStart,
                          )}
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
                    </Form.Field>{' '}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Form.Field>
                      <label>{messages['typeOfAmount']}</label>
                      <Dropdown
                        placeholder={messages['typeOfAmount']}
                        selection
                        value={informations.premiumPriceTypeId}
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
    smsetppProductList: state.serviceReducer.dynamicObject.smsetppProductList,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  fetchSmsetppPut,
  fetchSmsetpp,
  fetchSmsetppHistory,
  fetchSmsetppGetProductList,
})(injectIntl(EditModal));
