import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import ContractListSearchDisplay from './ContractListSearchDisplay';
import { searchContracts } from '../../actions/ContractListAction';

const selector = formValueSelector('contractListSearchDisplay');

function mapStateToProps(state) {
  const company = selector(state, 'company');
  return {
    company,
    directories: state.contractList.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

const ContractListSearchContainer =
  connect(mapStateToProps, { searchContracts })(ContractListSearchDisplay);

export default ContractListSearchContainer;
