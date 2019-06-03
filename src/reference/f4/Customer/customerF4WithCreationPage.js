import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Icon, Tab } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import CustomerF4Page from './customerF4Page';
import Hrc01 from '../../../hr/mainoperation/customer/hrc01';

const CustomerF4WithCreationPage = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    intl: { messages },
  } = props;

  function close() {
    props.onCloseCustomerF4(false);
  }

  const panes = [
    {
      menuItem: { key: 'search', icon: 'users', content: messages['search'] },
      render: () => (
        <Tab.Pane>
          <CustomerF4Page
            onCustomerSelect={props.onCustomerSelect}
            close={() => close()}
          />{' '}
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'create', icon: 'edit', content: messages['create'] },
      render: () => (
        <Tab.Pane>
          <Hrc01 />
        </Tab.Pane>
      ),
    },
  ];

  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

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
)(injectIntl(CustomerF4WithCreationPage));
