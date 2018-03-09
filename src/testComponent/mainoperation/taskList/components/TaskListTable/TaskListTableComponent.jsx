/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class TaskListTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: undefined,
    };
  }

  render() {
    const columns = [
      {
        Header: '#',
        accessor: 'id',
        maxWidth: 50,
        Cell: (props) => {
          const { id } = props.original;
          return (
            <Link target="_blank" to={`/task/${id}`}>
              {id}
            </Link>
          );
        },
      },
      {
        Header: 'Статус',
        accessor: 'status',
        maxWidth: 120,
      },
      {
        Header: 'Приоритет',
        accessor: 'priority',
        maxWidth: 120,
      },
      {
        Header: 'Тема',
        accessor: 'title',
        maxWidth: 380,
        Cell: (props) => {
          const { title, id } = props.original;
          return (
            <Link target="_blank" to={`/task/${id}`}>
              {title}
            </Link>
          );
        },
      },
      {
        Header: 'Назначена',
        accessor: 'recipient',
        maxWidth: 270,
        Cell: (props) => {
          const { recipient } = props.original;
          return (
            <div>
              {recipient.branch}/{recipient.department}/{recipient.position}
            </div>
          );
        },
      },
      {
        Header: 'Обновлено',
        accessor: 'modifiedAt',
        maxWidth: 160,
        Cell: (props) => {
          const { modifiedAt } = props.original;
          return moment(modifiedAt, 'YYYY-MM-DDTHH:mm:ssZ').utc().format('DD.MM.YYYY, hh:mm:ss');
        },
      },
    ];
    return (<ReactTable
      loading={this.props.loading}
      data={this.props.result}
      columns={columns}
      pageSizeOptions={[10, 20, 30, 50]}
      defaultPageSize={10}
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

TaskListTableComponent.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
};

export default TaskListTableComponent;
