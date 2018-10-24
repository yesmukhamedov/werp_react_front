import { connect } from 'react-redux';
import * as actions from '../../actions/ContractListAction';
import ContractListPageComponent from './ContractListPageComponent';

function mapStateToProps(state) {
  return {
    lang: state.locales.lang,
  };
}

const ContractListPageContainer = connect(mapStateToProps, actions)(ContractListPageComponent);

export default ContractListPageContainer;
