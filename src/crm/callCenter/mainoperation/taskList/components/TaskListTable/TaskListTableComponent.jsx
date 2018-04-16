/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDMYMS } from '../../../../../../utils/helpers';

class TaskListTableComponent extends Component {
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
        Header: '#',
        accessor: 'id',
        maxWidth: 50,
        Cell: (props) => {
          const { id } = props.original;
          return (
            <Link target="_blank" to={`/general/gtskedit/${id}`}>
              {id}
            </Link>
          );
        },
      },
      {
        Header: 'Статус',
        accessor: 'status.id',
        maxWidth: 120,
        Cell: (props) => {
          const { status } = props.original;
          return (
            <div>
              {status[lang]}
            </div>
          );
        },
      },
      {
        Header: 'Приоритет',
        accessor: 'priority',
        maxWidth: 120,
        Cell: (props) => {
          const { priority } = props.original;
          return (
            <div>
              {priority[lang]}
            </div>
          );
        },
      },
      {
        Header: 'Тема',
        accessor: 'title',
        maxWidth: 380,
        Cell: (props) => {
          const { title, id } = props.original;
          return (
            <Link target="_blank" to={`/general/gtskedit/${id}`}>
              {title}
            </Link>
          );
        },
      },
      {
        Header: 'Назначена',
        accessor: 'recipient',
        maxWidth: 290,
        Cell: (props) => {
          const { recipient } = props.original;
          return (
            <div>
              {recipient.branch.value}/{recipient.department.value}/{recipient.position.value}
            </div>
          );
        },
      },
      {
        Header: 'Обновлено',
        accessor: 'modifiedAt',
        maxWidth: 140,
        Cell: (props) => {
          const { modifiedAt } = props.original;
          return formatDMYMS(modifiedAt);
        },
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
          id: 'modifiedAt',
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

TaskListTableComponent.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
};

export default TaskListTableComponent;
