import React from 'react';
import { connect } from 'react-redux';
import { Modal, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import AddressSearchPage from './addressSearchPage';

const AddressF4 = props => {
  const {
    intl: { messages },
  } = props;

  const close = () => {
    props.onCloseAddressF4(false);
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
        {messages['address']}
      </Modal.Header>
      <Modal.Content>
        <AddressSearchPage
          onAddressSelect={props.onAddressSelect}
          customerId={props.customerId}
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
)(injectIntl(AddressF4));
