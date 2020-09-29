import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Header, Button, Icon } from 'semantic-ui-react';
import {
  f4FetchCountryList,
  f4ClearAnyObject,
  f4FetchAddrTypeOptions,
  f4FetchStateList,
  f4FetchCityList,
  f4FetchCityregList,
  saveRfadd01,
} from '../f4_action';

import OutputErrors from '../../../general/error/outputErrors';
import './address.css';

const Rfadd01 = props => {
  const emptyAddress = {
    addrType: '',
    countryId: '',
    stateId: '',
    cityId: '',
    regId: '',
    postalCode: '',
    microdistrict: '',
    village: '',
    avenue: '',
    street: '',
    ap_number: '',
    ap_drob: '',
    flat_number: '',
  };
  const [address, setAddress] = useState({ ...emptyAddress });
  const [countryOptions, setCountryOptions] = useState([]);
  const [addressTypeOptions, setAddressTypeOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const {
    countries,
    addressTypes,
    stateList,
    cityList,
    regionList,
    intl: { messages },
    customerId,
    customerName,
  } = props;

  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');

  //componentDidMount
  useEffect(() => {
    if (!countries || countries.length === 0) props.f4FetchCountryList();
    if (!addressTypes || addressTypes.length === 0)
      props.f4FetchAddrTypeOptions();
    if (!stateList || stateList.length === 0) props.f4FetchStateList();
    if (!cityList || cityList.length === 0) props.f4FetchCityList();
    if (!regionList || regionList.length === 0) props.f4FetchCityregList();
    //unmount
    return () => {};
  }, []);

  //componentWillRecieveProps
  useEffect(() => {
    //getting all countries and assigning to state
    let waCountryList = countries
      .sort((a, b) => (a.country > b.country ? 1 : -1))
      .map(item => (
        <option value={item.countryId} key={item.countryId}>
          {item.country}
        </option>
      ));
    setCountryOptions(waCountryList);
  }, [countries]);

  //componentWillRecieveProps
  useEffect(() => {
    //getting all address types and assigning to state
    let waAddressTypeList = addressTypes.map(item => (
      <option {...item}>{item.text}</option>
    ));
    setAddressTypeOptions(waAddressTypeList);
  }, [addressTypes]);

  const stateOptions = () => {
    let waStateOptions = stateList
      .filter(item => item.countryid == address.countryId)
      .sort((a, b) => (a.statename > b.statename ? 1 : -1))
      .map(item => (
        <option value={item.idstate} key={item.idstate}>
          {item.statename}
        </option>
      ));
    return waStateOptions;
  };
  const cityOptions = () => {
    let waCityOptions = cityList
      .filter(item => item.stateid == address.stateId)
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map(item => (
        <option value={item.idcity} key={item.idcity}>
          {item.name}
        </option>
      ));
    return waCityOptions;
  };
  const regionOptions = () => {
    let waRegionOptions = regionList
      .filter(item => item.city_id == address.cityId)
      .sort((a, b) => (a.regname > b.regname ? 1 : -1))
      .map(item => (
        <option value={item.idcityreg} key={item.idcityreg}>
          {item.regname}
        </option>
      ));
    return waRegionOptions;
  };

  const onSave = () => {
    // props.saveHrc01('hr/customer/new_customer',{customer:cus},{trans:'HRC01'});
    setIsLoading(true);
    let errors = [];
    errors = validate();

    if (errors === null || errors === undefined || errors.length === 0) {
      props.saveRfadd01(
        'reference/address/new_address',
        { address },
        { trans: 'RFADD01', customerId },
        bool => setIsLoading(bool),
        () => setAddress(emptyAddress),
      );
    } else setIsLoading(false);

    setErrors(errors);
  };

  const validate = () => {
    const errors = [];

    const {
      addrType,
      countryId,
      stateId,
      cityId,
      microdistrict,
      village,
      avenue,
      street,
      ap_number,
    } = address;

    if (
      customerId === null ||
      customerId === undefined ||
      !customerId ||
      addrType === null ||
      !['1', '2', '3', '4'].includes(addrType) ||
      countryId === null ||
      countryId === undefined ||
      !countryId ||
      stateId === null ||
      stateId === undefined ||
      !stateId ||
      cityId === null ||
      cityId === undefined ||
      !cityId ||
      ap_number === null ||
      ap_number === undefined ||
      ap_number.replace(/\s/g, '').length === 0
    ) {
      errors.push(errorTable[`20${language}`]);
      return errors;
    }

    if (
      (microdistrict === null ||
        microdistrict === undefined ||
        microdistrict.replace(/\s/g, '').length === 0) &&
      (village === null ||
        village === undefined ||
        village.replace(/\s/g, '').length === 0) &&
      (avenue === null ||
        avenue === undefined ||
        avenue.replace(/\s/g, '').length === 0) &&
      (street === null ||
        street === undefined ||
        street.replace(/\s/g, '').length === 0)
    ) {
      errors.push(errorTable[`20${language}`]);
      return errors;
    }

    return errors;
  };

  const onInputChange = (value, stateFieldName) => {
    const waAddress = Object.assign({}, address);
    if (stateFieldName === 'countryId') {
      waAddress.stateId = '';
      waAddress.cityId = '';
      waAddress.regId = '';
    } else if (stateFieldName === 'stateId') {
      waAddress.cityId = '';
      waAddress.regId = '';
    } else if (stateFieldName === 'cityId') {
      waAddress.regId = '';
    }
    waAddress[stateFieldName] = value;
    setAddress(waAddress);
  };

  return (
    <div>
      <Header as="h2" block>
        {' '}
        {messages['transNameRfadd01']}{' '}
      </Header>
      <OutputErrors errors={errors} />
      <table>
        <tbody>
          <tr>
            <td>{messages['customer']}</td>
            <td>
              {customerName ? (
                <span className="reqOneTxt">{customerName}</span>
              ) : (
                <span className="reqTxt">{errorTable[`9${language}`]}</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {messages['addrType']} <span className="reqTxt">*</span>
            </td>
            <td>
              <select
                value={address.addrType}
                onChange={event =>
                  onInputChange(event.target.value, 'addrType')
                }
                className="clickableItem"
              >
                <option value="" key={'0at'}>
                  {messages['addrType']}
                </option>
                {addressTypeOptions}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              {messages['country']} <span className="reqTxt">*</span>
            </td>
            <td>
              <select
                value={address.countryId}
                onChange={event =>
                  onInputChange(event.target.value, 'countryId')
                }
                className="clickableItem"
              >
                <option value="" key={'0cnid'}>
                  {messages['country']}
                </option>
                {countryOptions}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              {messages['state']} <span className="reqTxt">*</span>
            </td>
            <td>
              <select
                value={address.stateId}
                onChange={event => onInputChange(event.target.value, 'stateId')}
                className="clickableItem"
              >
                <option value="" key={'0stid'}>
                  {messages['state']}
                </option>
                {stateOptions()}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              {messages['city']} <span className="reqTxt">*</span>
            </td>
            <td>
              <select
                value={address.cityId}
                onChange={event => onInputChange(event.target.value, 'cityId')}
                className="clickableItem"
              >
                <option value="" key={'0cyid'}>
                  {messages['city']}
                </option>
                {cityOptions()}
              </select>
            </td>
          </tr>
          <tr>
            <td>{messages['region']}</td>
            <td>
              <select
                value={address.regId}
                onChange={event => onInputChange(event.target.value, 'regId')}
                className="clickableItem"
              >
                <option value="" key={'0rgid'}>
                  {messages['region']}
                </option>
                {regionOptions()}
              </select>
            </td>
          </tr>
          <tr>
            <td>{messages['postalCode']}</td>
            <td>
              <input
                value={address.postalCode}
                onChange={event =>
                  onInputChange(event.target.value, 'postalCode')
                }
                autoComplete="off"
                maxLength="20"
                size="25"
              />
            </td>
          </tr>
          <tr>
            <td>
              {messages['microdistrict']} <span className="reqOneTxt">*</span>
            </td>
            <td>
              <input
                value={address.microdistrict}
                onChange={event =>
                  onInputChange(event.target.value, 'microdistrict')
                }
                autoComplete="off"
                maxLength="30"
                size="25"
              />
            </td>
          </tr>
          <tr>
            <td>
              {messages['village']} <span className="reqOneTxt">*</span>
            </td>
            <td>
              <input
                value={address.village}
                onChange={event => onInputChange(event.target.value, 'village')}
                autoComplete="off"
                maxLength="30"
                size="25"
              />
            </td>
          </tr>
          <tr>
            <td>
              {messages['avenue']} <span className="reqOneTxt">*</span>
            </td>
            <td>
              <input
                value={address.avenue}
                onChange={event => onInputChange(event.target.value, 'avenue')}
                autoComplete="off"
                maxLength="30"
                size="25"
              />
            </td>
          </tr>
          <tr>
            <td>
              {messages['street']} <span className="reqOneTxt">*</span>
            </td>
            <td>
              <input
                value={address.street}
                onChange={event => onInputChange(event.target.value, 'street')}
                autoComplete="off"
                maxLength="30"
                size="25"
              />
            </td>
          </tr>
          <tr>
            <td>
              {messages['apartment']} <span className="reqTxt">*</span>
            </td>
            <td>
              <input
                value={address.ap_number}
                onChange={event =>
                  onInputChange(event.target.value, 'ap_number')
                }
                autoComplete="off"
                maxLength="5"
                size="3"
              />{' '}
              /
              <input
                value={address.ap_drob}
                onChange={event => onInputChange(event.target.value, 'ap_drob')}
                autoComplete="off"
                maxLength="5"
                size="3"
              />
            </td>
          </tr>
          <tr>
            <td>{messages['flat_number']}</td>
            <td>
              <input
                value={address.flat_number}
                onChange={event =>
                  onInputChange(event.target.value, 'flat_number')
                }
                autoComplete="off"
                maxLength="5"
                size="3"
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <span className="infoTxt reqTxt">
                {messages['fieldsReqToFill']}
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <span className="infoTxt reqOneTxt">
                {messages['fieldsReqToFillAtLeastOne']}
              </span>
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <Button
                icon
                loading={isLoading}
                labelPosition="left"
                primary
                size="small"
                onClick={onSave}
              >
                <Icon name="save" size="large" />
                {messages['save']}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

function mapStateToProps(state) {
  // console.log(state,'state');
  return {
    countries: state.f4.countryList,
    addressTypes: state.f4.addressTypeOptions,
    stateList: state.f4.stateList,
    cityList: state.f4.cityList,
    regionList: state.f4.cityregList,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4ClearAnyObject,
  f4FetchAddrTypeOptions,
  f4FetchStateList,
  f4FetchCityList,
  f4FetchCityregList,
  saveRfadd01,
})(injectIntl(Rfadd01));
