import React, { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';
import {
  fetchDemo,
  fetchDemoChildRecos,
  fetchReasons,
} from '../../demo/actions/demoAction';
import { fetchCallResults } from '../actions/recoAction';
import MiniRecoCard from '../components/MiniRecoCard';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

function RecosListPage(props) {
  const {
    intl: { messages },
    demo,
    items,
    callResults,
  } = props;

  // const [state, setState] = useState(props.fetchDemoChildRecos(parseInt(props.match.params.id, 10)));

  useEffect(() => {
    const id = parseInt(props.match.params.id, 10);
    props.fetchDemo(id);
    props.fetchDemoChildRecos(id);
    props.fetchCallResults();
    props.fetchReasons();
  }, []);

  if (!items) {
    return <h3>Нет данных!</h3>;
  }

  return (
    <Card.Group>
      {items.map(item => (
        <MiniRecoCard
          messages={messages}
          key={item.id}
          item={item}
          callResults={callResults}
        />
      ))}
    </Card.Group>
  );
}

function mapStateToProps(state) {
  return {
    demo: state.crmDemo2021.demo,
    items: state.crmDemo2021.childRecos,
    callResults: state.crmReco2021.callResults,
    reasons: state.crmDemo2021.reasons,
  };
}

export default connect(mapStateToProps, {
  fetchDemo,
  fetchDemoChildRecos,
  fetchCallResults,
  fetchReasons,
})(injectIntl(RecosListPage));
