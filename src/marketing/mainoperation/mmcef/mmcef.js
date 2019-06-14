//Marketing mainoperation contract edit finance
//mmcef
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const Mmcef = props => {
  return <div />;
};

function mapStateToProps(state) {
  // console.log(state, 'state');
  return {
    language: state.locales.lang,
  };
}

export default connect(
  mapStateToProps,
  {},
)(injectIntl(Mmcef));
