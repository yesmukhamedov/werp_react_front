import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  fetchSingleStaff,
  createStaff,
  toggleStaffListModal,
  fetchAllCurrentStaffs,
  fetchBlankStaff,
  updateStaff,
} from '../actions/hrStaffAction';
import {
  f4FetchCountryList,
  f4FetchStateList,
  f4FetchCityList,
  f4FetchCityregList,
  f4FetchSubCompanies,
} from '../../../../reference/f4/f4_action';
import StaffAddressForm from './forms/StaffAddressForm';
import StaffListModal from './StaffListModal';
import SalaryListModal from '../../salary/components/SalaryListModal';
import StaffForm from './forms/StaffForm';
import {
  toggleSalaryListModal,
  fetchCurrentSalaries,
} from '../../salary/actions/hrSalaryAction';

class StaffUpdatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localStaff: {},
      staffListModalOpened: false,
    };

    this.handleAddressData = this.handleAddressData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onScoutSelected = this.onScoutSelected.bind(this);
    this.removeScout = this.removeScout.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  componentWillMount() {
    const id = parseInt(this.props.match.params.id, 10);
    if (id > 0) {
      this.props.fetchSingleStaff(id);
    } else {
      this.props.fetchBlankStaff();
    }
    this.props.f4FetchCountryList();
    this.props.f4FetchStateList();
    this.props.f4FetchCityList();
    this.props.f4FetchCityregList();
    //this.props.fetchAllCurrentStaffs({});
    this.props.f4FetchSubCompanies();
  }

  componentDidMount() {
    this.props.fetchCurrentSalaries();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.staff.id !== this.state.localStaff.id) {
      const localStaff = Object.assign({}, nextProps.staff);
      this.setState({
        ...this.state,
        localStaff,
      });
    }
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

  handleAddressData(type, data) {
    const localStaff = Object.assign({}, this.state.localStaff);
    if (!localStaff.addresses) {
      return;
    }

    const addresses = localStaff.addresses;
    let selectedAddress = null;
    let index = -1;
    for (const k in addresses) {
      if (addresses[k].type === type) {
        selectedAddress = addresses[k];
        index = k;
        break;
      }
    }

    if (index < 0) {
      return;
    }

    const { name, value } = data;
    switch (name) {
      case 'countryId':
      case 'stateId':
      case 'cityId':
      case 'regId':
        selectedAddress[name] = value;
        break;

      case 'microdistrict':
      case 'village':
      case 'avenue':
      case 'street':
      case 'apNumber':
      case 'flatNumber':
        selectedAddress[name] = value;
        break;
      default: {
      }
    }

    addresses[index] = selectedAddress;
    localStaff.addresses = addresses;

    this.setState({
      ...this.state,
      localStaff,
    });
  }

  handleChange(e, data) {
    const localStaff = Object.assign({}, this.state.localStaff);
    const { name, value } = data;
    if (localStaff.hasOwnProperty(name)) {
      localStaff[name] = value;
    }

    this.setState({
      ...this.state,
      localStaff,
    });
  }

  handleDate(fName, o) {
    const localStaff = Object.assign({}, this.state.localStaff);
    if (localStaff.hasOwnProperty(fName)) {
      if (o) {
        localStaff[fName] = o.valueOf();
      } else {
        localStaff[fName] = null;
      }
    }
    this.setState({
      ...this.state,
      localStaff,
    });
  }

  submitForm() {
    const localStaff = Object.assign({}, this.state.localStaff);
    if (localStaff.id && localStaff.id > 0) {
      this.props.updateStaff(localStaff);
    } else {
      this.props.createStaff(localStaff);
    }
  }

  onScoutSelected(o) {
    const localStaff = Object.assign({}, this.state.localStaff);
    localStaff.tsStaffId = o.staffId;
    localStaff.tsStaffName = o.staffName;

    this.setState({
      ...this.state,
      localStaff,
    });
    this.props.toggleSalaryListModal(false);
  }

  removeScout() {
    const { localStaff } = this.state;
    localStaff.tsStaffId = 0;
    localStaff.tsStaffName = '';
    this.setState({
      ...this.state,
      localStaff,
    });
  }

  onClickScoutBtn() {}

  renderForm() {
    const { localStaff } = this.state;
    const addresses = localStaff.addresses || [];
    return (
      <div>
        <StaffForm
          staff={localStaff}
          handleChange={this.handleChange}
          handleDate={this.handleDate}
          removeScout={this.removeScout}
          onClickScoutBtn={() => this.props.toggleSalaryListModal(true)}
        />
        <br />
        <Form>
          {addresses.map((address, idx) => (
            <div key={address.type} className="ui segments">
              <div className="ui segment">
                <h3>{address.typeName}</h3>
              </div>
              <div className="ui secondary segment">
                <StaffAddressForm
                  countryOptions={this.getCountryOptions()}
                  stateOptions={this.getStateOptions(address.countryId || 0)}
                  cityOptions={this.getCityOptions(address.stateId || 0)}
                  regionOptions={this.getRegionOptions(address.cityId || 0)}
                  handleChange={this.handleAddressData}
                  address={address}
                />
              </div>
            </div>
          ))}
        </Form>
        <br />
        <Button
          onClick={this.submitForm}
          className={this.state.sendingData ? 'loading' : ''}
          color="teal"
        >
          Сохранить
        </Button>
      </div>
    );
  }

  render() {
    const id = parseInt(this.props.match.params.id, 10);
    return (
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <h2>
          {id && id > 0
            ? 'Редактирование сотрудника'
            : 'Добавление нового сотрудника'}
        </h2>
        {this.renderForm()}
        <SalaryListModal onSelect={this.onScoutSelected} />
      </Container>
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
  };
}

export default connect(
  mapStateToProps,
  {
    fetchSingleStaff,
    f4FetchCountryList,
    f4FetchStateList,
    f4FetchCityList,
    f4FetchCityregList,
    createStaff,
    toggleStaffListModal,
    fetchAllCurrentStaffs,
    fetchBlankStaff,
    updateStaff,
    f4FetchSubCompanies,
    toggleSalaryListModal,
    fetchCurrentSalaries,
  },
)(StaffUpdatePage);
