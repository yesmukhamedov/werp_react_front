import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from '../actions/DeptTaskListAction';
import DeptTaskListDisplay from './DeptTaskListDisplay';

function mapStateToProps(state) {
  return {
    lang: state.locales.lang,
    size: state.deptTaskList.size,
  };
}

const DeptTaskListContainer = connect(mapStateToProps, actions)(injectIntl(DeptTaskListDisplay));

export default DeptTaskListContainer;
