import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { moneyFormat } from '../../../utils/helpers';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';
import { fetchFaiaWorkAccList, clearAnyObject } from '../../fa_action';

class WorkAccList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bukrs !== undefined && nextProps.bukrs !== this.props.bukrs) {
      this.props.clearAnyObject('CLEAR_WORK_ACCOUNTABLE_LIST');
    }
    if (nextProps.brnch !== undefined && nextProps.brnch !== this.props.brnch) {
      this.setState({ loading: true });
      this.props.fetchFaiaWorkAccList(nextProps.bukrs, nextProps.brnch, () =>
        this.setState({ loading: false }),
      );
    }
  }
  componentWillUnmount() {
    this.props.clearAnyObject('CLEAR_WORK_ACCOUNTABLE_LIST');
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { workAccountableList, show } = this.props;
    const { loading } = this.state;

    if (!workAccountableList || show === false) {
      return '';
    }

    const columns = [];

    const col01 = {
      Header: ({ value }) => <b>{formatMessage(messages.lastname)}</b>,
      accessor: 'lastname',
    };

    const col02 = {
      Header: ({ value }) => <b>{formatMessage(messages.firstname)}</b>,
      accessor: 'firstname',
    };

    const col03 = {
      Header: ({ value }) => <b>{formatMessage(messages.middlename)}</b>,
      accessor: 'middlename',
    };

    const col04 = {
      Header: ({ value }) => <b>{formatMessage(messages.waers)}</b>,
      accessor: 'waers',
      width: 100,
    };
    const col05 = {
      Header: ({ value }) => <b>{formatMessage(messages.amount)}</b>,
      accessor: 'summa',
      Cell: ({ value }) => <span>{moneyFormat(value)}</span>,
    };

    columns.push(col01);
    columns.push(col02);
    columns.push(col03);
    columns.push(col04);
    columns.push(col05);

    return (
      <Segment padded size="small" loading={loading}>
        <ReactTable
          data={workAccountableList}
          columns={columns}
          showPagination={workAccountableList.length > 10}
          className="-striped -highlight"
          pageSize={10}
          loadingText={formatMessage(messages.loadingText)}
          noDataText={formatMessage(messages.noDataText)}
          previousText={formatMessage(messages.previousText)}
          nextText={formatMessage(messages.nextText)}
          rowsText={formatMessage(messages.rowsText)}
          pageText={formatMessage(messages.pageText)}
          ofText={formatMessage(messages.ofText)}
        />
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    workAccountableList: state.fa.workAccountableList,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchFaiaWorkAccList,
    clearAnyObject,
  },
)(injectIntl(WorkAccList));
