import React, { Component } from 'react';
import { Modal, Form, Input, TextArea, Button } from 'semantic-ui-react';
import {
  fetchSingleReco,
  toggleRecoUpdateModal,
  updateReco,
} from '../actions/recoAction';
import { fetchGroupDealers } from '../../demo/actions/demoAction';
import { RECO_CATEGORIES } from '../../../crmUtil';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const callerIsDealer = [
  {
    key: 0,
    text: 'СЕКРЕТАРЬ',
    value: 0,
  },
  {
    key: 1,
    text: 'ДИЛЕР',
    value: 1,
  },
];

class RecoUpdateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localReco: {},
      results: [],
      errors: {
        responsibleId: false,
        clientName: false,
        callerIsDealer: false,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderUpdateForm = this.renderUpdateForm.bind(this);
    this.saveData = this.saveData.bind(this);
    this.validateData = this.validateData.bind(this);
  }

  componentWillMount() {
    this.props.fetchGroupDealers();
  }

  handleDate(p1, p2, p3) {
    console.log(p1, p2, p3);
  }

  renderUpdateForm(messages) {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            error={this.state.errors.clientName}
            onChange={(e, o) => this.handleChange('clientName', o)}
            value={this.state.localReco.clientName}
            control={Input}
            required
            label={messages['Form.ClientFullName']}
            placeholder={messages['Form.ClientFullName']}
          />
          <Form.Field
            onChange={(e, o) => this.handleChange('district', o)}
            value={this.state.localReco.district || ''}
            control={Input}
            label={messages['Form.Reco.District']}
            placeholder={messages['Form.Reco.District']}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field
            required
            onChange={(e, o) => this.handleChange('relative', o)}
            value={this.state.localReco.relative || ''}
            control={Input}
            label={messages['Form.Reco.Relative']}
            placeholder={messages['Form.Reco.Relative']}
          />
          <Form.Field />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Select
            error={this.state.errors.categoryId}
            value={this.state.localReco.categoryId}
            required
            fluid
            selection
            label={messages['Form.Category']}
            options={RECO_CATEGORIES}
            onChange={(e, v) => this.handleChange('categoryId', v)}
          />
          <Form.Select
            error={this.state.errors.callerIsDealer}
            value={this.state.localReco.callerIsDealer}
            required
            fluid
            selection
            label={messages['Form.Reco.CallerIs']}
            options={callerIsDealer}
            onChange={(e, v) => this.handleChange('callerIsDealer', v)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select
            error={this.state.errors.responsibleId}
            value={this.state.localReco.responsibleId}
            required
            fluid
            selection
            label={messages.dealer}
            options={this.props.dealers}
            onChange={(e, v) => this.handleChange('responsibleId', v)}
          />

          <Form.Field
            control={TextArea}
            onChange={(e, o) => this.handleChange('note', o)}
            label={messages['Table.Note']}
            placeholder={messages['Table.Note']}
            value={this.state.localReco.note || ''}
          />
        </Form.Group>
      </Form>
    );
  }

  handleChange(fieldName, o) {
    const localReco = Object.assign({}, this.state.localReco);
    const errors = Object.assign({}, this.state.errors);
    // console.log(o);
    switch (fieldName) {
      case 'clientName':
      case 'district':
      case 'note':
      case 'relative':
        if (o.required && (!o.value || o.value.trim().length === 0)) {
          errors[fieldName] = true;
        } else {
          errors[fieldName] = false;
        }
        localReco[fieldName] = o.value;
        break;

      case 'categoryId':
      case 'callerIsDealer':
      case 'responsibleId':
        localReco[fieldName] = o.value;
        if (o.required) {
          if (fieldName === 'callerIsDealer') {
            if (o.value !== 0 && o.value !== 1) {
              errors[fieldName] = true;
            } else {
              errors[fieldName] = false;
            }
          } else if (o.value === 0) {
            errors[fieldName] = true;
          } else {
            errors[fieldName] = false;
          }
        }
        break;

      default: {
      }
    }

    this.setState({
      ...this.state,
      localReco,
      errors,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reco !== this.state.reco) {
      const localReco = Object.assign({}, this.props.reco);
      this.setState({
        ...this.state,
        localReco,
      });
    }
  }

  validateData() {
    const { localReco, errors } = this.state;
    if (!localReco.clientName || localReco.clientName.length === 0) {
      errors.clientName = true;
    }
  }

  saveData() {
    this.validateData();
    let isValid = true;
    for (const k in this.state.errors) {
      if (this.state.errors[k]) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
    }
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <Modal size="small" open={this.props.updateModalOpened}>
        <Modal.Header>{messages['Crm.EditReco']}</Modal.Header>
        <Modal.Content>{this.renderUpdateForm(messages)}</Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => this.props.toggleRecoUpdateModal(false)}
          >
            {messages.cancel}
          </Button>
          <Button
            positive
            icon="checkmark"
            onClick={() => this.props.updateReco(this.state.localReco)}
            labelPosition="right"
            content={messages.save}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    reco: state.crmReco.reco,
    updateModalOpened: state.crmReco.updateModalOpened,
    dealers: state.crmDemo.dealers,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchSingleReco,
    toggleRecoUpdateModal,
    updateReco,
    fetchGroupDealers,
  },
)(injectIntl(RecoUpdateModal));
