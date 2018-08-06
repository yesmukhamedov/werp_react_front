import moment from 'moment';
import { connect } from 'react-redux';
import { editRecipient, fetchTaskById } from '../../../actions/DeptTaskListAction';
import RecipientEditDisplay from './RecipientEditDisplay';

function mapStateToProps(state) {
  const initialData = {};
  let assigneeOpts;
  const details = state.deptTaskList.assigneeDetails;
  if (details) {
    assigneeOpts = details.assigneeOptions;
    initialData.expectedEndDate = details.expectedEndDate && moment(details.expectedEndDate, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD');
    initialData.recipient = details.recipient && details.recipient.id;
  }
  return {
    assigneeOptions: assigneeOpts,
    initialValues: initialData,
  };
}

const RecipientEditContainer =
  connect(mapStateToProps, { editRecipient, fetchTaskById })(RecipientEditDisplay);

export default RecipientEditContainer;

