import React, { Component } from 'react';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
// import TaskInfoWrapper from './TaskInfo/TaskInfoWrapper';
import TaskHistoryDisplay from './TaskHistory/TaskHistoryDisplay';
import TaskApproverContainer from './TaskApprover/TaskApproverContainer';

class TaskPageDisplay extends Component {
  componentWillMount() {
    const { id: taskId } = this.props.match.params;
    if (taskId) {
      this.props.fetchTaskById(taskId);
      this.props.getTaskDirectories(this.props.lang);
    }
  }

  componentWillUnmount() {
    this.props.clearTaskStore();
  }

  render() {
    const {
      taskDetails,
      attachment,
      TaskInfoWrapper,
      toggleModal,
      modalAttachment,
      addUpload,
      deleteUpload,
      intl,
    } = this.props;
    const { messages } = intl;
    if (taskDetails) {
      const showApprovalPanel = (taskDetails.approved === 0) ? true : false;
      return (
        <Container
          // fluid
          style={{
            marginTop: '2em',
            marginBottom: '2em',
            paddingLeft: '2em',
            paddingRight: '2em',
          }}
        >
          {showApprovalPanel &&  <TaskApproverContainer {...taskDetails}/>}
          <TaskInfoWrapper
            lang={this.props.lang}
            {...taskDetails}
            attachment={attachment}
            toggleModal={toggleModal}
            modalAttachment={modalAttachment}
            addUpload={addUpload}
            deleteUpload={deleteUpload}
            uploadable
          />
          <TaskHistoryDisplay {...taskDetails} messages={messages} />
        </Container>
      );
    }
    return (
      <Dimmer active>
        <Loader indeterminate>Fetching task details...</Loader>
      </Dimmer>
    );
  }
}

TaskPageDisplay.propTypes = {
  TaskInfoWrapper: PropTypes.func.isRequired,
  getTaskDirectories: PropTypes.func.isRequired,
  fetchTaskById: PropTypes.func.isRequired,
  clearTaskStore: PropTypes.func.isRequired,
  taskDetails: PropTypes.object,
  lang: PropTypes.string,
};

export default injectIntl(TaskPageDisplay);
