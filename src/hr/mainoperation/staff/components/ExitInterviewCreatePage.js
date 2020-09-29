import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Container, Divider, Header, Button, Segment } from 'semantic-ui-react';

import { connect } from 'react-redux';
import {
  blankExitInterview,
  saveExitInterview,
} from '../actions/hrStaffAction';
import ExitInterviewForm from './forms/ExitInterviewForm';
import StaffF4Modal from '../../../../reference/f4/staff/staffF4Modal';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import { fetchLeaveReasons } from '../../../../reference/mainoperation/actions/referenceAction';

class ExitInterviewCreatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffListModalOpened: false,
      model: {
        new: true,
      },
      leaveReasons: [],
      sendingData: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStaffSelect = this.handleStaffSelect.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchLeaveReasons({ mode: 'options' }).then(({ data }) => {
      this.setState({
        ...this.state,
        leaveReasons: data,
      });
    });
  }

  handleStaffSelect(staff) {
    this.props
      .blankExitInterview(staff['staffId'])
      .then(({ data }) => {
        this.setState({
          ...this.state,
          model: data,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  submitForm() {
    const model = Object.assign({}, this.state.model);
    this.props.saveExitInterview(model);
  }

  handleDate(name, o) {
    let model = Object.assign({}, this.state.model);
    if (o) {
      model['callDate'] = moment(o).format('DD.MM.YYYY');
    } else {
      model['callDate'] = null;
    }

    this.setState({
      ...this.state,
      model: model,
    });
  }

  handleChange(e, o) {
    const { name, value } = o;
    let model = Object.assign({}, this.state.model);
    model[name] = value;

    this.setState({
      ...this.state,
      model: model,
    });
  }

  prepareFeedbackOptions = () => {
    let out = [];
    out.push({
      key: null,
      value: null,
      text: 'Не выбрано',
    });

    out.push({
      key: 'GOOD',
      value: 'GOOD',
      text: 'Хорошо',
    });

    out.push({
      key: 'NORMAL',
      value: 'NORMAL',
      text: 'Нормально',
    });

    out.push({
      key: 'BAD',
      value: 'BAD',
      text: 'Плохо',
    });

    return out;
  };

  render() {
    const { messages, locale } = this.props.intl;
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
          <Header as="h3" block floated="left">
            Опросник при увольнении Добавление
          </Header>
        </Segment>
        <Divider />

        <ExitInterviewForm
          feedbackOptions={this.prepareFeedbackOptions()}
          handleChange={this.handleChange}
          reasonOptions={this.state.leaveReasons}
          handleDate={this.handleDate}
          model={this.state.model}
          openStaffListModal={() =>
            this.setState({ staffListModalOpened: true })
          }
        />

        <StaffF4Modal
          open={this.state.staffListModalOpened}
          messages={messages}
          closeModal={() => this.setState({ staffListModalOpened: false })}
          onStaffSelect={item => this.handleStaffSelect(item)}
          trans={'hr_doc_create_1'}
          branchOptions={this.props.branchOptionsAll}
          companyOptions={this.props.companyOptions}
          bukrsDisabledParent={false}
        />

        <Divider />
        <br />
        <Button
          onClick={this.submitForm}
          className={this.state.sendingData ? 'loading' : ''}
          color="teal"
        >
          Сохранить
        </Button>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentStaffs: state.hrStaff.currentStaffs,
    meta: state.hrStaff.meta,
    companyOptions: state.userInfo.companyOptions,
    branchOptionsAll: state.userInfo.branchOptionsAll,
  };
}

export default connect(mapStateToProps, {
  blankExitInterview,
  fetchLeaveReasons,
  saveExitInterview,
})(injectIntl(ExitInterviewCreatePage));
