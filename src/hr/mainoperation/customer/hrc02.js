import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import CustomerForm from './customerForm';
import { Container, Header } from 'semantic-ui-react';
import queryString from 'query-string';
import { fetchDynObjHr, changeDynObjHr, saveHrc02 } from '../../hr_action';
import OutputErrors from '../../../general/error/outputErrors';

const Hrc02 = props => {
  const { customer } = props;

  //componentDidMount
  useEffect(() => {
    const url = props.location.search;
    const params = queryString.parse(url);
    if (params.customerId && params.customerId > 0) {
      const searchParameters = {
        customerId: params.customerId,
        trans: 'HRC02',
      };
      props.fetchDynObjHr('hr/customer/fetch_customer', searchParameters);
    }

    //unmount
    return () => {};
  }, []);

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    intl: { messages },
  } = props;

  const onCustomerChange = (value, stateFieldName) => {
    const waCustomer = { ...customer };

    if (stateFieldName === 'fizYur') {
      waCustomer.fizYur = value;
    } else if (stateFieldName === 'birthday') {
      waCustomer.birthday = value;
      // waCustomer.birthday = value
      //   ? moment(value).format('YYYY-MM-DD')
      //   : null;
    } else if (stateFieldName === 'iinBin') waCustomer.iinBin = value;
    else if (stateFieldName === 'name') waCustomer.name = value;
    else if (stateFieldName === 'firstname') waCustomer.firstname = value;
    else if (stateFieldName === 'lastname') waCustomer.lastname = value;
    else if (stateFieldName === 'middlename') waCustomer.middlename = value;
    else if (stateFieldName === 'passportId') waCustomer.passportId = value;
    else if (stateFieldName === 'passportIssuedBy')
      waCustomer.passportIssuedBy = value;
    else if (stateFieldName === 'passportDateOfIssue') {
      waCustomer.passportDateOfIssue = value;
      // waCustomer.passportDateOfIssue = value
      //   ? moment(value).format('YYYY-MM-DD')
      //   : null;
    } else if (stateFieldName === 'countryId') waCustomer.countryId = value;
    else if (stateFieldName === 'director') waCustomer.director = value;
    else if (stateFieldName === 'accountant') waCustomer.accountant = value;

    props.changeDynObjHr({ customer: waCustomer });
  };

  const onSave = cus => {
    // props.saveHrc01('hr/customer/new_customer',{customer:cus},{trans:'HRC01'});
    setIsLoading(true);
    let errors = [];
    errors = validate(cus);
    if (errors === null || errors === undefined || errors.length === 0) {
      props.saveHrc02(
        'hr/customer/update_customer',
        { customer },
        { trans: 'HRC02' },
        bool => setIsLoading(bool),
      );
    } else {
      setIsLoading(false);
    }
    setErrors(errors);
  };

  const validate = cus => {
    // getter
    // console.log(localStorage.getItem('language'),'error');
    // console.log(cus,'cus');

    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    const errors = [];

    const {
      fizYur,
      iinBin,
      firstname,
      lastname,
      birthday,
      countryId,
      passportId,
      passportIssuedBy,
      passportDateOfIssue,
      name,
      director,
    } = cus;
    if (fizYur === null || fizYur === undefined || !fizYur) {
      errors.push(errorTable[`142${language}`]);
    }

    if (iinBin === null || iinBin === undefined || iinBin.length === 0) {
      errors.push(errorTable[`143${language}`]);
    }

    if (fizYur === 2) {
      if (
        firstname === null ||
        firstname === undefined ||
        firstname.length === 0
      ) {
        errors.push(errorTable[`144${language}`]);
      }
      if (
        lastname === null ||
        lastname === undefined ||
        lastname.length === 0
      ) {
        errors.push(errorTable[`145${language}`]);
      }
      if (
        birthday === null ||
        birthday === undefined ||
        birthday.length === 0
      ) {
        errors.push(errorTable[`146${language}`]);
      }
      if (
        countryId === null ||
        countryId === undefined ||
        countryId.length === 0
      ) {
        errors.push(errorTable[`147${language}`]);
      }
      if (
        passportId === null ||
        passportId === undefined ||
        passportId.length === 0
      ) {
        errors.push(errorTable[`148${language}`]);
      }
      if (
        passportIssuedBy === null ||
        passportIssuedBy === undefined ||
        passportIssuedBy.length === 0
      ) {
        errors.push(errorTable[`149${language}`]);
      }
      if (
        passportDateOfIssue === null ||
        passportDateOfIssue === undefined ||
        passportDateOfIssue.length === 0
      ) {
        errors.push(errorTable[`150${language}`]);
      }
    } else {
      if (name === null || name === undefined || name.length === 0) {
        errors.push(errorTable[`151${language}`]);
      }
      if (
        director === null ||
        director === undefined ||
        director.length === 0
      ) {
        errors.push(errorTable[`152${language}`]);
      }
      if (
        countryId === null ||
        countryId === undefined ||
        countryId.length === 0
      ) {
        errors.push(errorTable[`147${language}`]);
      }
    }

    return errors;
  };

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
      <Header as="h2" block>
        {' '}
        {messages['transNameHrc02']}{' '}
      </Header>
      <OutputErrors errors={errors} />
      <CustomerForm
        trans="HRC02"
        customer={customer}
        onInputChange={onCustomerChange}
        isLoading={isLoading}
        onSave={onSave}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  // console.log(state, 'state');
  return {
    customer: state.hr.dynamicObject.customer,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDynObjHr,
    changeDynObjHr,
    saveHrc02,
  },
)(injectIntl(Hrc02));
