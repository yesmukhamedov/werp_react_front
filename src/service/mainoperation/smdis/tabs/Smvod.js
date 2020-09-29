import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import TableSmvod from './tables/TableSmvod';
import { fetchSmvodList } from '../smdisAction';
const Smvod = props => {
  const { smvod = {}, clickSmvodRow } = props;

  return (
    <Container fluid>
      <TableSmvod
        data={smvod.listData}
        pageSize={smvod.length ? smvod.length : 20}
        footerData={smvod.listSum}
        clickSmvodRow={clickSmvodRow}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    smvod: state.smdisReducer.smvod,
  };
}

export default connect(mapStateToProps, {
  fetchSmvodList,
})(injectIntl(Smvod));
