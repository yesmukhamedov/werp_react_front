import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Label } from 'semantic-ui-react';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import { outCallStatusColorMap } from '../../../../../../utils/constants';


class TaskMonitorTableDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: undefined,
    };
  }

  render() {
    const { lang } = this.props;
    const columns = [
      {
        Header: 'Филиал',
        accessor: 'branch',
        Cell: (props) => {
          const { recipient } = props.original;
          return (
            <div>
              {recipient.branch.value}
            </div>
          );
        },
      },
      {
        Header: 'Отдел',
        accessor: 'department',
        Cell: (props) => {
          const { recipient } = props.original;
          return (
            <div>
              {recipient.department.value}
            </div>
          );
        },
      },
      {
        Header: 'Тип',
        accessor: 'type',
      },
      {
        Header: 'Статус',
        accessor: 'status.id',
        Cell: (props) => {
          const { status } = props.original;
          return (
            <div>
              <Label
                color={outCallStatusColorMap[status.id]}
                size="mini"
              >
                {status[lang]}
              </Label>
            </div>
          );
        },
      },
      {
        Header: 'Количество',
        accessor: 'amount',
      },
    ];
    return (<ReactTable
      loading={this.props.loading}
      data={this.props.result}
      columns={columns}
      pageSizeOptions={[10, 20, 30, 50]}
      defaultPageSize={10}
      // defaultSorted={[
      //   {
      //     id: 'amount',
      //     desc: true,
      //   },
      // ]}
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

TaskMonitorTableDisplay.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
};

export default TaskMonitorTableDisplay;
