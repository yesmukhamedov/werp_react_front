/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import OperatorEditModal from '../OperatorEdit/OperatorEditModal';
import { formatDMY, formatDMYMS, constructFullName } from '../../../../../../../utils/helpers';
import { outCallStatusColorMap } from '../../../../../../../utils/constants';

class ContractListTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: undefined,
      modalOpen: false,
      contractId: undefined,
      contractNumber: undefined,
      operatorId: undefined,
    };

    this.handleEditModal = this.handleEditModal.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleEditModal() {
    this.setState({
      modalOpen: true,
    });
  }

  handleModalClose() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    let options;
    if (this.props.result) {
      let visited = {};
      const opers = this.props.result.map(item => item.operator);
      visited = _.mapKeys(opers, 'id');
      options = Object.values(visited).map((operator) => {
        if (operator) {
          return (<option value={operator.id} key={operator.id}>
            {operator.lastName} {operator.firstName}
                  </option>);
        }
      });
    }
    const { formatMessage } = this.props.intl;
    const { messages } = this.props;
    const columns = [
      {
        Header: '#',
        accessor: 'timestamp',
        Cell: (props) => {
          const { index } = props;
          return <div>{index + 1}</div>;
        },
        maxWidth: 50,
      },
      {
        Header: formatMessage(messages.snContract),
        accessor: 'contractNumber',
        maxWidth: 100,
        filterable: true,
        Cell: (props) => {
          const { contractNumber } = props.original;
          return (
            <Link target="_blank" to={`/crm/callcenter/ccasoc/${contractNumber}`}>
              {contractNumber}
            </Link>
          );
        },
        Footer: (
          <span>
            <strong>{formatMessage(messages.total)}:</strong>{' '}
            {_.size(this.props.result)}
          </span>
        ),
      },
      {
        Header: formatMessage(messages.contractDate),
        accessor: 'contractDate',
        Cell: (props) => {
          const { contractDate } = props.original;
          return formatDMY(contractDate);
        },
        maxWidth: 110,
      },
      {
        Header: formatMessage(messages.fio),
        accessor: 'customer.lastName',
        Cell: (props) => {
          const { customer } = props.original;
          return (
            <div>
              {customer && customer.lastName} {customer && customer.firstName} {customer && customer.patronymic}
            </div>
          );
        },
        // maxWidth: 270,
      },
      {
        Header: formatMessage(messages.branch),
        accessor: 'companyBranchName',
        maxWidth: 160,
      },
      {
        Header: formatMessage(messages.product),
        accessor: 'productName',
        maxWidth: 170,
      },
      {
        Header: formatMessage(messages.dealerFio),
        accessor: 'dealer.lastName',
        Cell: (props) => {
          const { dealer } = props.original;
          return (
            <div>
              {dealer && constructFullName(dealer)}
            </div>
          );
        },
        // maxWidth: 270,
      },
      {
        Header: formatMessage(messages.status),
        accessor: 'status.id',
        Cell: (props) => {
          const { status } = props.original;
          return (
            <div>
              <Label
                color={outCallStatusColorMap[status.id]}
                size="mini"
              >
                {status[this.props.lang]}
              </Label>
            </div>
          );
        },
        maxWidth: 160,
      },
      // {
      //   Header: 'Последнее примечание',
      //   accessor: 'lastNote',
      //   maxWidth: 160,
      // },
      {
        Header: formatMessage(messages.modified),
        accessor: 'modifiedAt',
        Cell: (props) => {
          const { modifiedAt } = props.original;
          return formatDMYMS(modifiedAt);
        },
        maxWidth: 160,
      },
      {
        Header: formatMessage(messages.operator),
        accessor: 'operator.id',
        id: 'opr',
        maxWidth: 270,
        Cell: (props) => {
          const { operator } = props.original;
          return (
            <div>
              {operator && constructFullName(operator)}
            </div>
          );
        },
        filterable: true,
        filterMethod: (filter, row) => {
          if (filter.value === '0') {
            return true;
          }
          return String(row[filter.id]) === filter.value;
        },
        Filter: ({ filter, onChange }) =>
          (<select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : '0'}
          >
            <option value="0">{formatMessage(messages.all)}</option>
            {options}
           </select>),
      },
      {
        accessor: 'contractNumber',
        maxWidth: 60,
        Cell: () => (
          <div style={{ textAlign: 'center' }}>
            <Icon link name="edit" size="large" color="black" onClick={this.handleEditModal} />
          </div>),
      },
    ];
    return (
      <div>
        <ReactTable
          loading={this.props.loading}
          data={this.props.result}
          columns={columns}
          pageSizeOptions={[10, 20, 30, 50]}
          defaultPageSize={10}
          previousText={formatMessage(messages.previousText)}
          nextText={formatMessage(messages.nextText)}
          loadingText={formatMessage(messages.loadingText)}
          noDataText={formatMessage(messages.noDataText)}
          pageText={formatMessage(messages.pageText)}
          ofText={formatMessage(messages.ofText)}
          rowsText={formatMessage(messages.rowsText)}
          className="-highlight"
          getTrProps={(state, rowInfo) => ({
            onClick: () => {
              this.setState({
                selectedIdx: rowInfo.index,
                contractNumber: rowInfo.original.contractNumber,
                contractId: rowInfo.original.id,
                operatorId: rowInfo.original.operator && rowInfo.original.operator.id,
              });
            },
            style: {
              background: (rowInfo === undefined ? '' : (this.state.selectedIdx === rowInfo.index ? 'rgba(241,250,229, 1)' : '')),
            },
          })}
          getTheadProps={() => ({
            style: {
              background: 'rgba(227,232,238, 1)',
            },
          })}
        />
        <OperatorEditModal
          modalOpen={this.state.modalOpen}
          handleClose={this.handleModalClose}
          {...this.state}
        />
      </div>
    );
  }
}

ContractListTableComponent.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
};

export default ContractListTableComponent;
