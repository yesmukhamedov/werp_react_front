import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import CustomerF4Page from './customerF4Page';

const CustomerF4 = props => {
  const {
    intl: { messages },
  } = props;

  function close() {
    props.onCloseCustomerF4(false);
  }

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
        <CustomerF4Page
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
