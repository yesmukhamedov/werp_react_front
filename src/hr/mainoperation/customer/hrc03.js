import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import CustomerForm from './customerForm';
import { Container, Header } from 'semantic-ui-react';
import queryString from 'query-string';
import { fetchDynObjHr } from '../../hr_action';

const Hrc03 = props => {
  const {
    customer,
    intl: { messages },
  } = props;

  //componentDidMount
  useEffect(() => {
    const url = props.location.search;
    const params = queryString.parse(url);
    if (params.customerId && params.customerId > 0) {
      const searchParameters = {
        customerId: params.customerId,
        trans: 'HRC03',
      };
      props.fetchDynObjHr('hr/customer/fetch_customer', searchParameters);
    }

    //unmount
    return () => {};
  }, []);

  const onCustomerChange = (value, stateFieldName) => {
    //empty => do nothing
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
        {messages['transNameHrc03']}{' '}
      </Header>
      <CustomerForm
        trans="HRC03"
        customer={customer}
        onInputChange={onCustomerChange}
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
  },
)(injectIntl(Hrc03));
