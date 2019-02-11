import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Container, Segment, Divider } from 'semantic-ui-react';

import { fetchItems, fetchMeta, clearState } from '../actions/crmReportAction';
import { f4FetchBusinessAreaList } from '../../../../reference/f4/f4_action';
import { REP_SALE_DEMO_ID, REP_DEMO_ID, REP_DEMO_RECO_ID } from '../crmRepUtil';
import RepSearch from './search/RepSearch';
import RepTable from './table/RepTable';
import CrmRepDemoSalePage from './CrmRepDemoSalePage';
import CrmRepDemoPage from './CrmRepDemoPage';
import CrmRepDemoRecoPage from './CrmRepDemoRecoPage';

class CrmReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {},
      currentId: parseInt(this.props.match.params.id, 10),
    };
  }

  componentWillMount() {
    // console.log('will mount repPage')
    const id = parseInt(this.props.match.params.id, 10);
    this.props.fetchMeta(id);
    this.props.f4FetchBusinessAreaList();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('rec',nextProps)
    if (
      nextProps.match &&
      nextProps.match.params &&
      nextProps.match.params.id !== this.state.currentId
    ) {
      const currId = nextProps.match.params.id;
      this.props.clearState();
      if (currId) {
        this.props.fetchMeta(currId);
        this.setState({
          ...this.state,
          currentId: currId,
          search: {},
        });
      }
    }
  }

  renderContent = id => {
    if (REP_SALE_DEMO_ID === id) {
      return <CrmRepDemoSalePage />;
    } else if (REP_DEMO_ID === id) {
      return <CrmRepDemoPage />;
    } else if (REP_DEMO_RECO_ID === id) {
      return <CrmRepDemoRecoPage />;
    }
  };

  render() {
    const { meta } = this.props;
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
        <Segment clearing>
          <Header as="h2" floated="left">
            {this.props.meta.title}
          </Header>
        </Segment>
        <Divider />
        {this.renderContent(meta['id'])}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    meta: state.crmReportReducer.meta,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchItems,
    fetchMeta,
    f4FetchBusinessAreaList,
    clearState,
  },
)(CrmReportPage);
