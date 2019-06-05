import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Icon, Tab } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import AddressSearchPage from './addressSearchPage';
import Rfadd01 from './rfadd01';

const AddressF4WithCreationPage = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);
  const {
    intl: { messages },
  } = props;

  function close() {
    props.onCloseAddressF4(false);
  }

  const panes = [
    {
      menuItem: { key: 'search', icon: 'users', content: messages['search'] },
      render: () => (
        <Tab.Pane>
          <AddressSearchPage
            onAddressSelect={props.onAddressSelect}
            customerId={props.customerId}
            close={() => close()}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'create', icon: 'edit', content: messages['create'] },
      render: () => (
        <Tab.Pane>
          <Rfadd01
            customerId={props.customerId}
            customerName={props.customerName}
          />
        </Tab.Pane>
      ),
    },
  ];

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
        <Tab
          menu={{ attached: false, tabular: false }}
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
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
)(injectIntl(AddressF4WithCreationPage));
