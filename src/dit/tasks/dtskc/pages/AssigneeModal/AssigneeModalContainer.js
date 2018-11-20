import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { groupBy } from 'lodash';
import AssigneeModal from './AssigneeModal';
import {
  toggleAssigneeModal,
  addAssigneeGroup,
  addAssigneePerson,
} from '../../actions';


const selector = formValueSelector('DtskcForm');

const mapStateToProps = (state) => {
  const selectedCompany = selector(state, 'company');
  const branchOptsNormalized = (selectedCompany ? state.userInfo.branchOptionsNormalized[selectedCompany] : {});
  const branchOpts = (selectedCompany ? state.userInfo.branchOptionsAll[selectedCompany] : {});
  const managerOpts = groupBy(state.dtskcTransaction.dtskc.reference.managerOptions, 'departmentId');
  return {
    selectedCompany,
    branchOpts,
    branchOptsNormalized,
    managerOpts,
    modalOpen: state.dtskcTransaction.dtskc.assigneeModal,
    deptOpts: state.dtskcTransaction.dtskc.reference.deptOptions,
    groupOpts: state.dtskcTransaction.dtskc.reference.groupOptions,
    lang: state.locales.lang,
  };
};

export default connect(
  mapStateToProps,
  {
    toggleAssigneeModal,
    addAssigneeGroup,
    addAssigneePerson,
  },
)(AssigneeModal);
