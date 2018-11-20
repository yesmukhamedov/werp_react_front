import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { injectIntl } from 'react-intl';
import { searchTasks } from '../../actions/DeptTaskListAction';
import DeptTaskListSearchDisplay from './DeptTaskListSearchDisplay';
import { messages } from '../../../../../locales/defineMessages';

const selector = formValueSelector('deptTaskListSearchDisplay');

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
