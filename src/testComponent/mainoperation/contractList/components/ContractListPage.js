import { connect } from 'react-redux';
import * as actions from '../actions/ContractListAction';
import ContractListPageComponent from '../components/ContractListPageDisplay';

function mapStateToProps(state) {
  return {
    directories: state.contractList.directories,
  };
}

const ContractListPageContainer = connect(mapStateToProps, actions)(ContractListPageComponent);

export default ContractListPageContainer;
