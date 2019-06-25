import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { doAction } from '../actions/logisticsActions';

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
