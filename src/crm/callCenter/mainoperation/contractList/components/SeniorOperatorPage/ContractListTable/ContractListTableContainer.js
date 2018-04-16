import { connect } from 'react-redux';
import ContractListTableComponent from './ContractListTableComponent';

function mapStateToProps(state) {
  return {
    result: state.contractList.result && Object.values(state.contractList.result),
    lang: state.locales.lang,
  };
}

const ContractListTableContainer = connect(mapStateToProps)(ContractListTableComponent);

export default ContractListTableContainer;
