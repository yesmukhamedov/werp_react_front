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
    id: 'Form.CompanyError',
    defaultMessage: 'Select company',
  },
  branch: {
    id: 'Form.Branch',
    defaultMessage: 'Branch',
  },
  branchError: {
    id: 'Form.BranchError',
    defaultMessage: 'Select branch',
  },
  status: {
    id: 'Form.Status',
    defaultMessage: 'Status',
  },
  statusError: {
    id: 'Form.StatusError',
    defaultMessage: 'Select status',
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
    id: 'Form.DepartmentError',
    defaultMessage: 'Select deparment',
  },
  type: {
    id: 'Form.Type',
    defaultMessage: 'Type',
  },
  typeError: {
    id: 'Form.TypeError',
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
