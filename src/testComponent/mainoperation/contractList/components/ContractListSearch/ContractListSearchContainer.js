import { connect } from 'react-redux';
import ContractListSearchDisplay from './ContractListSearchDisplay';

function mapStateToProps(state) {
  return {
    directories: state.contractList.directories,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

const ContractListSearchContainer = connect(mapStateToProps)(ContractListSearchDisplay);

export default ContractListSearchContainer;
