import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import CustomerSearchPage from './customerSearchPage';

const CustomerF4 = props => {
  const {
    intl: { messages },
  } = props;

  const close = () => {
    props.onCloseCustomerF4(false);
  };

  return (
    <Modal
      open={props.open}
      closeOnEscape={false}
      dimmer={'inverted'}
      onClose={close}
    >
      <Modal.Header>
        <Icon name="filter" size="big" />
        {messages['customer']}
      </Modal.Header>
      <Modal.Content>
        <CustomerSearchPage
          onCustomerSelect={props.onCustomerSelect}
          close={() => close()}
        />
      </Modal.Content>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {},
)(injectIntl(CustomerF4));
