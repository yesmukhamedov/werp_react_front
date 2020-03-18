import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Segment } from 'semantic-ui-react';
import TableSmvod from './tables/TableSmvod';
import { fetchSmvodList } from '../smdisAction';
const Smvod = props => {
  const { smvod = {}, fetchSmvodList } = props;
  console.log('smvod', smvod);
  const emptyParam = {
    branchId: 61,
    categoryId: 2,
    dateAt: '2020-03-01',
  };

  const [param, setParam] = useState({ ...emptyParam });

  useEffect(() => {
    fetchSmvodList({ ...param });
  }, []);

  return (
    <Container fluid>
      <TableSmvod data={smvod.listData} footerData={smvod.listSum} />
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
