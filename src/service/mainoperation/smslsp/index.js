import React, { Fragment } from 'react';
import { Segment, Header, Divider, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const Smslsp = props => {
  const {
    intl: { messages },
    companyOptions,
  } = props;

  return (
    <Fragment>
      <Segment>
        <Divider hidden></Divider>
        <Header as="h2">{messages['List_of_employees']}</Header>
        <Divider hidden />
        <Dropdown
          selection
          options={companyOptions}
          placeholder="Choose an option"
        />
      </Segment>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    companyOptions: state.userInfo.companyOptions,
  };
};

export default connect(mapStateToProps, {})(injectIntl(Smslsp));
