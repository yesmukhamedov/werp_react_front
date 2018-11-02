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
  loadingText: {
    id: 'Table.Loading',
    defaultMessage: "Loading..."
  },
  noDataText: {
    id: 'Table.NoData',
    defaultMessage: "No rows found"
  },
  previousText : {
    id: 'Table.Previous',
    defaultMessage: "Previous"
  },
  nextText: {
    id: 'Table.Next',
    defaultMessage: "Next"
  },
  rowsText: {
    id: 'Table.Rows',
    defaultMessage: "rows"
  },
  pageText: {
    id: 'Table.Page',
    defaultMessage: "Page"
  },
  ofText: {
    id: 'Table.Of',
    defaultMessage: "of"
  }
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
