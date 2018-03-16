import { connect } from 'react-redux';
import * as actions from '../../actions/ContractListAction';
import ContractListPageComponent from './ContractListPageComponent';

const ContractListPageContainer = connect(null, actions)(ContractListPageComponent);

export default ContractListPageContainer;
