import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import ContractListTableComponent from './ContractListTableComponent';
import { messages } from '../../../../../../dit/tasks/dtskl/components/DeptTaskListTable/DeptTaskListTableContainer';

export const msg = defineMessages({
  snContract: {
    id: 'Table.SnContract',
    defaultMessage: 'SN contract',
  },
  priority: {
    id: 'Table.Priority',
    defaultMessage: 'Priority',
  },
  modified: {
    id: 'Table.Modified',
    defaultMessage: 'Modified',
  },
  total: {
    id: 'Table.Total',
    defaultMessage: 'Total',
  },
  contractDate: {
    id: 'Table.ContractDate',
    defaultMessage: 'Contract date',
  },
  fio: {
    id: 'Table.Fio',
    defaultMessage: 'FIO',
  },
  product: {
    id: 'Table.Product',
    defaultMessage: 'Product',
  },
  dealerFio: {
    id: 'Table.DealerFio',
    defaultMessage: 'Dealer fio',
  },
  operator: {
    id: 'Table.Operator',
    defaultMessage: 'Operator',
  },
  all: {
    id: 'Table.All',
    defaultMessage: 'All',
  }
});

function mapStateToProps(state) {
  return {
    messages: Object.assign(messages, msg),
    result: state.contractList.result && Object.values(state.contractList.result),
    lang: state.locales.lang,
  };
}

const ContractListTableContainer = connect(mapStateToProps)(injectIntl(ContractListTableComponent));

export default ContractListTableContainer;
