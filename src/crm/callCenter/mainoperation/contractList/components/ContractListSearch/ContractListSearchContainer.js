import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { defineMessages, injectIntl } from 'react-intl';
import ContractListSearchDisplay from './ContractListSearchDisplay';
import { searchContracts } from '../../actions/ContractListAction';
import { messages } from '../../../../../../dit/tasks/dtskl/components/DeptTaskListSearch/DeptTaskListSearchContainer';

const selector = formValueSelector('contractListSearchDisplay');

export const msg = defineMessages({
  state: {
    id: 'Form.State',
    defaultMessage: 'State',
  },
  dateFrom: {
    id: 'Form.DateFrom',
    defaultMessage: 'From',
  },
  dateTo: {
    id: 'Form.DateTo',
    defaultMessage: 'To',
  },
  dateError: {
    id: 'Form.DateError',
    defaultMessage: 'Select date',
  },
});

function mapStateToProps(state) {
  const company = selector(state, 'company');
  return {
    company,
    messages: Object.assign(msg, messages),
    directories: state.contractList.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

const ContractListSearchContainer =
  connect(mapStateToProps, { searchContracts })(injectIntl(ContractListSearchDisplay));

export default ContractListSearchContainer;
