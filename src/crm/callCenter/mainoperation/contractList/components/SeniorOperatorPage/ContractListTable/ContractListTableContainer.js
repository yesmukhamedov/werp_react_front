import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import ContractListTableComponent from './ContractListTableComponent';
import { messages } from '../../../../../../../dit/tasks/dtskl/components/DeptTaskListTable/DeptTaskListTableContainer';
import { msg } from '../../ContractListTable/ContractListTableContainer';

function mapStateToProps(state) {
  return {
    messages: Object.assign(messages, msg),
    result: state.contractList.result && Object.values(state.contractList.result),
    lang: state.locales.lang,
  };
}

const ContractListTableContainer = connect(mapStateToProps)(injectIntl(ContractListTableComponent));

export default ContractListTableContainer;
