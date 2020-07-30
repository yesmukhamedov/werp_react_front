import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  //defineMessages,
  injectIntl,
} from 'react-intl';
import ContractListSearchDisplay from './ContractListSearchDisplay';
import { searchContracts } from '../../actions/ContractListAction';
import { messages } from '../../../../../../locales/defineMessages';

const selector = formValueSelector('contractListSearchDisplay');

function mapStateToProps(state) {
  const company = selector(state, 'company');
  return {
    company,
    messages,
    directories: state.contractList.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

const ContractListSearchContainer = connect(mapStateToProps, {
  searchContracts,
})(injectIntl(ContractListSearchDisplay));

export default ContractListSearchContainer;
