//Marketing mainoperation contract edit contact details
//mmcecd
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const Mmcecd = props => {
  return <div />;
};

function mapStateToProps(state) {
  // console.log(state, 'state');
  return {
    language: state.locales.lang,
    contractTypeList: state.f4.contractTypeList,
    branches: state.f4.branches,
  };
}

export default connect(
  mapStateToProps,
  {
    modifyLoader,

    //reference
    f4FetchConTypeList,
    f4FetchBranches,
    f4ClearAnyObject,
  },
)(injectIntl(Mmcecd));
