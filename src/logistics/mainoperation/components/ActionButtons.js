import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Container,
  Icon,
  Segment,
  Divider,
  Tab,
  Loader,
  Menu,
  Dropdown,
  Button,
  Form,
  Grid,
  Table,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import {
  f4FetchCountryList,
  f4FetchDepartmentList,
  f4FetchBranchesByBukrs,
  f4ClearBranchesByBukrs,
} from '../../../reference/f4/f4_action';
import 'react-table/react-table.css';
import {
  blankWerksRequest,
  fetchMatnrs,
  blankWerksRequestItem,
  createWerksRequest,
  doAction,
} from '../actions/logisticsActions';
import EnumFormField from './fields/EnumFormField';
import MatnrsModalField from './fields/MatnrsModalField';
import MatnrsGridModal from './MatnrsGridModal';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
import _ from 'lodash';

class ActionButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleAction = this.handleAction.bind(this);
  }

  handleAction(action) {
    const { doctype, docId } = this.props;
    let model = {
      doctype: doctype,
      docId: docId,
      action: action,
    };
    this.props.doAction(model);
  }

  render() {
    const { actionButtons } = this.props;
    if (!actionButtons) {
      return '';
    }

    return (
      <div>
        {actionButtons.map(b => (
          <Button key={b.action} onClick={() => this.handleAction(b.action)}>
            {b.actionName}
          </Button>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {
    doAction,
  },
)(ActionButtons);
