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
        Header: 'Номер',
        accessor: 'id',
        maxWidth: 100,
      },
      {
        Header: 'Статус',
        accessor: 'status',
        maxWidth: 160,
      },
      {
        Header: 'Приоритет',
        accessor: 'priority',
        maxWidth: 160,
      },
      {
        Header: 'Тема',
        accessor: 'title',
        maxWidth: 160,
      },
      {
        Header: 'Назначена',
        accessor: 'recipient',
        Cell: (props) => {
          const { recipient } = props.original;
          return (
            <div>
              {recipient.branch}/{recipient.department}/{recipient.position}
            </div>
          );
        },
        maxWidth: 270,
      },
      {
        Header: 'Обновлено',
        accessor: 'modifiedAt',
        Cell: (props) => {
          const { modifiedAt } = props.original;
          return moment(modifiedAt, 'YYYY-MM-DDTHH:mm:ssZ').utc().format('DD.MM.YYYY, hh:mm:ss');
        },
        maxWidth: 160,
      },
      {

        Cell: (props) => {
          const { id } = props.original;
          return (
            <div style={{ textAlign: 'center' }}>
              <Link target="_blank" to={`/newIssue/${id}`}>
                <Icon name="eye" size="large" color="black" />
              </Link>
            </div>);
        },
        maxWidth: 60,
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
