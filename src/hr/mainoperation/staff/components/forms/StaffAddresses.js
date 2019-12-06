import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Header } from 'semantic-ui-react';
import StaffAddressForm from './StaffAddressForm';
import {
  f4FetchCountryList,
  f4FetchStateList,
  f4FetchCityList,
  f4FetchCityregList,
} from '../../../../../reference/f4/f4_action';

class StaffAddresses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: [],
    };

    this.handleAddressData = this.handleAddressData.bind(this);
  }

  handleAddressData(idx, data) {
    let addresses = [...this.props.addresses];
    let selectedAddress = addresses[idx] || {};

    const { name, value } = data;
    selectedAddress[name] = value;
    addresses[idx] = selectedAddress;
    this.props.updateAddresses(addresses);

    this.setState({
      ...this.state,
      addresses: addresses,
    });
  }

  blank = () => {
    let { addresses, customerId } = this.props;
    addresses.push({
      customerId: customerId,
    });

    this.props.updateAddresses(addresses);

    this.setState({
      ...this.state,
      addresses: addresses,
    });
  };

  getCountryOptions() {
    if (!this.props.countryList) {
      return [];
    }

    const { countryList } = this.props;
    const out = countryList.map(c => ({
      key: parseInt(c.countryId, 10),
      text: c.country,
      value: parseInt(c.countryId, 10),
    }));

    return out;
  }

  getStateOptions(countryId) {
    if (!this.props.stateList) {
      return [];
    }

    const { stateList } = this.props;

    const map = [];
    for (const k in stateList) {
      if (stateList[k].countryid === countryId) {
        map.push({
          key: stateList[k].idstate,
          text: stateList[k].statename,
          value: stateList[k].idstate,
        });
      }
    }

    return map;
  }

  getCityOptions(stateId) {
    if (!this.props.cityList) {
      return [];
    }

    const { cityList } = this.props;
    const map = [];
    for (const k in cityList) {
      if (cityList[k].stateid === stateId) {
        map.push({
          key: cityList[k].idcity,
          text: cityList[k].name,
          value: cityList[k].idcity,
        });
      }
    }

    return map;
  }

  getRegionOptions(cityId) {
    if (!this.props.cityregList) {
      return [];
    }

    const { cityregList } = this.props;

    const map = [];
    for (const k in cityregList) {
      if (cityregList[k].city_id === cityId) {
        map.push({
          key: cityregList[k].idcityreg,
          value: cityregList[k].idcityreg,
          text: cityregList[k].regname,
        });
      }
    }

    return map;
  }

  render() {
    let { addresses, addressTypeOptions } = this.props;

    return (
      <div className="ui segments">
        <Segment clearing>
          <Header as="h3" floated="left">
            Адреса сотрудника
          </Header>
          <Button
            loading={this.props.experienceBlanking}
            onClick={this.blank}
            floated={'right'}
            style={{ marginRight: '3px' }}
            icon={'plus'}
            size={'small'}
          />
        </Segment>
        <div className="ui secondary segment">
          {(addresses || []).map((address, idx) => {
            return (
              <div key={idx} className="ui segments">
                <div className="ui segment">
                  <h3>{address.typeName}</h3>
                </div>
                <div className="ui secondary segment">
                  <StaffAddressForm
                    addressTypeOptions={addressTypeOptions}
                    index={idx}
                    countryOptions={this.getCountryOptions()}
                    stateOptions={this.getStateOptions(address.countryId || 0)}
                    cityOptions={this.getCityOptions(address.stateId || 0)}
                    regionOptions={this.getRegionOptions(address.cityId || 0)}
                    handleChange={this.handleAddressData}
                    address={address}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    staff: state.hrStaff.staff,
    staffFormErrors: state.hrStaff.staffFormErrors,
    staffListModalOpened: state.hrStaff.staffListModalOpened,
    allStaffs: state.hrStaff.allCurrentStaffs,
    countryList: state.f4.countryList,
    stateList: state.f4.stateList,
    cityList: state.f4.cityList,
    cityregList: state.f4.cityregList,
    subCompanies: state.f4.subCompanies,
    nationalityOptions: state.f4.nationalityOptions,
    maritalStatusOptions: state.hrStaff.maritalStatusOptions,
    addressTypeOptions: state.f4.addressTypeOptions,
  };
}

export default connect(mapStateToProps, {
  f4FetchCountryList,
  f4FetchStateList,
  f4FetchCityList,
  f4FetchCityregList,
})(StaffAddresses);
