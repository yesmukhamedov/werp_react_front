import React, { Component } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  fetchSingleStaff,
  toggleStaffListModal,
  fetchAllCurrentStaffs,
  fetchBlankStaff,
  blankStaffExperience,
  fetchMaritalStatusOptions,
  saveStaff,
} from '../actions/hrStaffAction';
import {
  f4FetchCountryList,
  f4FetchStateList,
  f4FetchCityList,
  f4FetchCityregList,
  f4FetchSubCompanies,
  f4FetchCompanyOptions,
  f4FetchNationalityOptions,
  f4FetchAddrTypeOptions,
} from '../../../../reference/f4/f4_action';
import StaffAddressForm from './forms/StaffAddressForm';
import SubCompanyListModal from '../../../../reference/mainoperation/components/SubCompanyListModal';
import SalaryListModal from '../../salary/components/SalaryListModal';
import StaffForm from './forms/StaffForm';

import { toggleSalaryListModal } from '../../salary/actions/hrSalaryAction';

class StaffUpdatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localStaff: {},
      staffListModalOpened: false,
      subCompanyModalOpened: false,
      experienceBlanking: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onScoutSelected = this.onScoutSelected.bind(this);
    this.removeScout = this.removeScout.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.onSubCompanySelect = this.onSubCompanySelect.bind(this);
    this.removeSubCompany = this.removeSubCompany.bind(this);
    this.handleExperienceData = this.handleExperienceData.bind(this);
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
    this.props.f4FetchCompanyOptions();
    this.props.f4FetchNationalityOptions();
    this.props.fetchMaritalStatusOptions();
    this.props.f4FetchAddrTypeOptions();
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

  handleExperienceData(fieldName, fieldValue, index) {
    const localStaff = Object.assign({}, this.state.localStaff);
    let experiences = localStaff.experiences;
    let currentExp = experiences[index];
    if (fieldName === 'fromDate' || fieldName === 'toDate') {
      if (fieldValue) {
        currentExp[fieldName] = fieldValue.valueOf();
      } else {
        currentExp[fieldName] = null;
      }
    } else {
      currentExp[fieldName] = fieldValue;
    }

    experiences[index] = currentExp;
    localStaff.experiences = experiences;

    this.setState({
      ...this.state,
      localStaff,
    });
  }

  addExperienceRow = () => {
    this.setState({
      ...this.state,
      experienceBlanking: true,
    });

    let localStaff = Object.assign({}, this.state.localStaff);
    let exps = localStaff.experiences;
    this.props
      .blankStaffExperience()
      .then(({ data }) => {
        localStaff.experiences.push(data);
        this.setState({
          ...this.state,
          localStaff: localStaff,
          experienceBlanking: false,
        });
      })
      .catch(e => {
        alert('Error ' + e.toString());
      });
  };

  removeExperienceRow = idx => {
    let localStaff = Object.assign({}, this.state.localStaff);
    let exps2 = [];
    for (let k in localStaff.experiences) {
      if (parseInt(k) === parseInt(idx)) continue;

      exps2.push(localStaff.experiences[k]);
    }

    localStaff.experiences = exps2;

    this.setState({
      ...this.state,
      localStaff: localStaff,
    });
  };

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
    this.props.saveStaff(localStaff);
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
    let localStaff = Object.assign({}, this.state.localStaff);
    localStaff.tsStaffId = null;
    localStaff.tsStaffName = '';
    this.setState({
      ...this.state,
      localStaff,
    });
  }

  toggelSubCompanyModal = flag => {
    this.setState({
      ...this.state,
      subCompanyModalOpened: flag,
    });
  };

  onSubCompanySelect(subCompany) {
    let localStaff = Object.assign({}, this.state.localStaff);
    localStaff.subCompanyId = subCompany['id'];
    localStaff.subCompanyName = subCompany['nameRu'];

    this.setState({
      ...this.state,
      localStaff: localStaff,
      subCompanyModalOpened: false,
    });

    //this.toggelSubCompanyModal(false);
  }

  removeSubCompany() {
    let localStaff = Object.assign({}, this.state.localStaff);
    localStaff.subCompanyId = null;
    localStaff.subCompanyName = null;
    this.setState({
      ...this.state,
      localStaff,
    });
  }

  updateAddresses = addresses => {
    let localStaff = Object.assign({}, this.state.localStaff);
    localStaff.addresses = addresses;
    this.setState({
      ...this.state,
      localStaff,
    });
  };

  renderForm() {
    const { localStaff } = this.state;
    const addresses = localStaff.addresses || [];
    return (
      <div>
        <StaffForm
          updateAddresses={this.updateAddresses}
          handleExperienceData={this.handleExperienceData}
          experienceBlanking={this.state.experienceBlanking}
          addExperienceRow={this.addExperienceRow}
          removeExperienceRow={this.removeExperienceRow}
          staff={localStaff}
          handleChange={this.handleChange}
          handleDate={this.handleDate}
          removeScout={this.removeScout}
          onClickScoutBtn={() => this.props.toggleSalaryListModal(true)}
          onClickSubCompanyBtn={() => this.toggelSubCompanyModal(true)}
          removeSubCompany={this.removeSubCompany}
          nationalityOptions={this.props.nationalityOptions || []}
          maritalStatusOptions={this.props.maritalStatusOptions}
        />
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
        <SalaryListModal showAll onSelect={this.onScoutSelected} />
        <SubCompanyListModal
          onSelect={this.onSubCompanySelect}
          closeModal={() => this.toggelSubCompanyModal(false)}
          opened={this.state.subCompanyModalOpened}
          items={this.props.subCompanies}
        />
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
    nationalityOptions: state.f4.nationalityOptions,
    maritalStatusOptions: state.hrStaff.maritalStatusOptions,
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
    f4FetchCompanyOptions,
    saveStaff,
    toggleStaffListModal,
    fetchAllCurrentStaffs,
    fetchBlankStaff,
    f4FetchSubCompanies,
    toggleSalaryListModal,
    blankStaffExperience,
    f4FetchNationalityOptions,
    fetchMaritalStatusOptions,
    f4FetchAddrTypeOptions,
  },
)(StaffUpdatePage);
