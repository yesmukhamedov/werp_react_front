import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { defineMessages, injectIntl } from 'react-intl';
import { searchTasks } from '../../actions/DeptTaskListAction';
import DeptTaskListSearchDisplay from './DeptTaskListSearchDisplay';

const selector = formValueSelector('deptTaskListSearchDisplay');

export const messages = defineMessages({
  taskList: {
    id: 'Form.TaskListLabel',
    defaultMessage: 'Task list',
  },
  company: {
    id: 'Form.Company',
    defaultMessage: 'Company',
  },
  companyError: {
    id: 'Form.Company.Error',
    defaultMessage: 'Select company',
  },
  branch: {
    id: 'Form.Branch',
    defaultMessage: 'Branch',
  },
  branchError: {
    id: 'Form.Branch.Error',
    defaultMessage: 'Select branch',
  },
  endDateFrom: {
    id: 'Form.endDateFrom',
    defaultMessage: 'End date from',
  },
  endDateTo: {
    id: 'Form.endDateTo',
    defaultMessage: 'End date to',
  },
  department: {
    id: 'Form.Department',
    defaultMessage: 'Department',
  },
  departmentError: {
    id: 'Form.Department.Error',
    defaultMessage: 'Select deparment',
  },
  type: {
    id: 'Form.Type',
    defaultMessage: 'Type',
  },
  typeError: {
    id: 'Form.Type.Error',
    defaultMessage: 'Select type',
  },
  startDateFrom: {
    id: 'Form.StartDateFrom',
    defaultMessage: 'Start date from',
  },
  startDateTo: {
    id: 'Form.StartDateTo',
    defaultMessage: 'Start date to',
  },
  search: {
    id: 'Form.Search',
    defaultMessage: 'Search',
  },
  reset: {
    id: 'Form.Reset',
    defaultMessage: 'Reset',
  },
  allOption: {
    id: 'Form.All.Option',
    defaultMessage: 'All',
  },
});

function mapStateToProps(state) {
  const company = selector(state, 'company');
  return {
    company,
    messages,
    directories: state.deptTaskList.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
  };
}

const DeptTaskListSearchContainer =
  connect(mapStateToProps, { searchTasks })(injectIntl(DeptTaskListSearchDisplay));

export default DeptTaskListSearchContainer;
