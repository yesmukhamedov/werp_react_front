import { connect } from 'react-redux';
import DeptTaskListTableDisplay from './DeptTaskListTableDisplay';

function mapStateToProps(state) {
  return {
    result: state.deptTaskList.result,
    lang: state.locales.lang,
  };
}

const DeptTaskListTableContainer = connect(mapStateToProps)(DeptTaskListTableDisplay);

export default DeptTaskListTableContainer;
