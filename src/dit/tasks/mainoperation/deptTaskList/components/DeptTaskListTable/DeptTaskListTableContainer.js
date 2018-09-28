import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import DeptTaskListTableDisplay from './DeptTaskListTableDisplay';

export const messages = defineMessages({
  branch: {
    id: 'Table.Branch',
    defaultMessage: 'Branch',
  },
  department: {
    id: 'Table.Department',
    defaultMessage: 'Department',
  },
  type: {
    id: 'Table.Type',
    defaultMessage: 'Type',
  },
  title: {
    id: 'Table.Title',
    defaultMessage: 'Title',
  },
  status: {
    id: 'Table.Status',
    defaultMessage: 'Status',
  },
  createdAt: {
    id: 'Table.createdAt',
    defaultMessage: 'Created at',
  },
  estimatedAt: {
    id: 'Table.estimatedAt',
    defaultMessage: 'Estimated at',
  },
  author: {
    id: 'Table.Author',
    defaultMessage: 'Author',
  },
  recipient: {
    id: 'Table.Recipient',
    defaultMessage: 'Recipient',
  },
});

function mapStateToProps(state) {
  return {
    messages,
    result: state.deptTaskList.result,
    lang: state.locales.lang,
  };
}

const DeptTaskListTableContainer = connect(mapStateToProps)(injectIntl(DeptTaskListTableDisplay));

export default DeptTaskListTableContainer;
