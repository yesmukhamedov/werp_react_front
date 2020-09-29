import { connect } from 'react-redux';
import {
  // defineMessages,
  injectIntl,
} from 'react-intl';
import DeptTaskListTableDisplay from './DeptTaskListTableDisplay';
import { messages } from '../../../../../locales/defineMessages';

function mapStateToProps(state) {
  return {
    messages,
    result: state.deptTaskList.result,
    lang: state.locales.lang,
  };
}

const DeptTaskListTableContainer = connect(mapStateToProps)(
  injectIntl(DeptTaskListTableDisplay),
);

export default DeptTaskListTableContainer;
