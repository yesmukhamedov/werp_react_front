import moment from 'moment';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { editRecipient } from '../../../actions/DeptTaskListAction';
import { fetchTaskById } from '../../../../../../../crm/callCenter/mainoperation/task/actions/TaskAction';
import RecipientEditDisplay from './RecipientEditDisplay';

const selector = formValueSelector('deptTaskListSearchDisplay');

function mapStateToProps(state) {
  const company = selector(state, 'company');
  const initialData = {
    recipient: state.deptTaskList.taskDetails && state.deptTaskList.taskDetails.bukrs,
  };
  if (state.deptTaskList.taskDetails && state.deptTaskList.taskDetails.estimatedAt) {
    initialData.expectedEndDate = moment(state.deptTaskList.taskDetails.estimatedAt, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD')
  }
  return {
    company,
    companyOptions: state.userInfo.companyOptions,
    initialValues: initialData,
  };
}

const RecipientEditContainer =
  connect(mapStateToProps, { editRecipient, fetchTaskById })(RecipientEditDisplay);

export default RecipientEditContainer;

