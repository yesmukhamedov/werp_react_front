/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Label } from 'semantic-ui-react';
import _ from 'lodash';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDMY, formatDMYMS, extractLFP } from '../../../../../../utils/helpers';
import { outCallStatusColorMap } from '../../../../../../utils/constants';

class ContractListTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: undefined,
    };
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
    const columns = [
      {
        Header: 'SN договор',
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
      },
      {
        Header: 'Дата договора',
        accessor: 'contractDate',
        Cell: (props) => {
          const { contractDate } = props.original;
          return formatDMY(contractDate);
        },
        maxWidth: 110,
      },
      {
        Header: 'ФИО',
        accessor: 'customer',
        Cell: (props) => {
          const { customer } = props.original;
          return (
            <div>
              {customer.lastName} {customer.firstName} {customer.patronymic}
            </div>
          );
        },
        // maxWidth: 270,
      },
      {
        Header: 'Филиал',
        accessor: 'companyBranchName',
        maxWidth: 160,
      },
      {
        Header: 'Продукт',
        accessor: 'productName',
        maxWidth: 170,
      },
      {
        Header: 'ФИО Диллера',
        accessor: 'dealer',
        Cell: (props) => {
          const { dealer } = props.original;
          return (
            <div>
              {dealer && extractLFP(dealer)}
            </div>
          );
        },
        // maxWidth: 270,
      },
      {
        Header: 'Состояние',
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
        maxWidth: 170,
      },
      // {
      //   Header: 'Последнее примечание',
      //   accessor: 'lastNote',
      //   maxWidth: 160,
      // },
      {
        Header: 'Обновлено',
        accessor: 'modifiedAt',
        Cell: (props) => {
          const { modifiedAt } = props.original;
          return formatDMYMS(modifiedAt);
        },
        maxWidth: 160,
      },
      {
        Header: 'Оператор',
        accessor: 'operator.id',
        id: 'opr',
        // maxWidth: 270,
        Cell: (props) => {
          const { operator } = props.original;
          return (
            <div>
              {operator && extractLFP(operator)}
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
            <option value="0">Все</option>
            {options}
           </select>),
      },
    ];
    return (<ReactTable
      loading={this.props.loading}
      data={this.props.result}
      columns={columns}
      pageSizeOptions={[10, 20, 30, 50]}
      defaultPageSize={10}
      defaultSorted={[
        {
          id: 'contractDate',
          desc: true,
        },
      ]}
      previousText="Предыдущий"
      nextText="Следующий"
      loadingText="Загружается..."
      noDataText="Нет записей"
      pageText="Страница"
      ofText="из"
      rowsText="записей"
      className="-highlight"
      getTrProps={(state, rowInfo) => ({
        onClick: () => {
          this.setState({ ...this.state, selectedIdx: rowInfo.index });
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
    />);
  }
}

ContractListTableComponent.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
};

export default ContractListTableComponent;
