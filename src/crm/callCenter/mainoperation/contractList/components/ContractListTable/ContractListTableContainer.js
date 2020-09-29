import { connect } from 'react-redux';
import {
  //defineMessages,
  injectIntl,
} from 'react-intl';
import ContractListTableComponent from './ContractListTableComponent';
import { messages } from '../../../../../../locales/defineMessages';

function mapStateToProps(state) {
  return {
    messages,
    result:
      state.contractList.result && Object.values(state.contractList.result),
    lang: state.locales.lang,
  };
}

const ContractListTableContainer = connect(mapStateToProps)(
  injectIntl(ContractListTableComponent),
);

export default ContractListTableContainer;
