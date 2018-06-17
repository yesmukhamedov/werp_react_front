import { connect } from 'react-redux';
import * as actions from '../actions/DeptTaskListAction';
import DeptTaskListDisplay from './DeptTaskListDisplay';

function mapStateToProps(state) {
  return {
    lang: state.locales.lang,
  };
}

const DeptTaskListContainer = connect(mapStateToProps, actions)(DeptTaskListDisplay);

export default DeptTaskListContainer;
