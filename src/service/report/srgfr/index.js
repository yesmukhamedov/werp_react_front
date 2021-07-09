import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Divider } from 'semantic-ui-react';
import Tabs from './components/Tabs';
import '../../service.css';
import { clearAll } from './srgfrAction';

const Srgfr = props => {
  const {
    intl: { messages },
  } = props;

  useEffect(() => {
    return () => {
      props.clearAll();
    };
  }, []);

  return (
    <Container
      fluid
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <h3>{messages['general_financial_report']}</h3>
      <Divider style={{ marginTop: 20, marginBottom: 20 }} />
      <Tabs />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptionsService: state.userInfo.branchOptionsService,
    serviceAppStatus: state.f4.serviceAppStatus,
    category: state.f4.category,
    srtbbList: state.srtbbReducer.srtbbList,
  };
}

export default connect(mapStateToProps, {
  clearAll,
})(injectIntl(Srgfr));
