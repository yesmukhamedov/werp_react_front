import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const Configuration = () => {
  return <>Configuration</>;
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, {})(injectIntl(Configuration));
