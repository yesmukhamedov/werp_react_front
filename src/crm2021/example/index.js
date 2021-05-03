import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { fetchExample } from './exampleAction';

const Example = props => {
  const { exampleData } = props;

  useEffect(() => {
    props.fetchExample();
    console.log('PROPS', props);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div>Example</div>;
};

function mapStateToProps(state) {
  return {
    exampleData: state.exampleReducer.exampleData,
  };
}

export default connect(mapStateToProps, {
  fetchExample,
})(injectIntl(Example));
