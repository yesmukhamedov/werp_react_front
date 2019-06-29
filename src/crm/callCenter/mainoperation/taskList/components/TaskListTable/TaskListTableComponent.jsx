/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDMYMS } from '../../../../../../utils/helpers';
import { LinkToMmcvNewTab } from '../../../../../../utils/outlink';

class TaskListTableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: undefined,
    };
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { lang, messages } = this.props;
    const columns = [
      {
        Header: '#',
        accessor: 'id',
        maxWidth: 50,
        Cell: props => {
          const { id } = props.original;
          return (
            <Link target="_blank" to={`/dit/task/dtskedit/${id}`}>
              {id}
            </Link>
          );
        },
      },
      {
        Header: formatMessage(messages.snContract),
        accessor: 'contractNumber',
        maxWidth: 100,
        Cell: props => {
          const { contractNumber } = props.original;
          return <LinkToMmcvNewTab contractNumber={contractNumber} />;
        },
      },
      {
        Header: formatMessage(messages.status),
        accessor: 'status.id',
        maxWidth: 120,
        Cell: props => {
          const { status } = props.original;
          return <div>{status[lang]}</div>;
        },
      },
      {
        Header: formatMessage(messages.priority),
        accessor: 'priority',
        maxWidth: 120,
        Cell: props => {
          const { priority } = props.original;
          return <div>{priority[lang]}</div>;
        },
      },
      {
        Header: formatMessage(messages.title),
        accessor: 'title',
        maxWidth: 380,
        Cell: props => {
          const { title, id } = props.original;
          return (
            <Link target="_blank" to={`/dit/task/dtskedit/${id}`}>
              {title}
            </Link>
          );
        },
      },
      {
        Header: formatMessage(messages.recipient),
        accessor: 'recipient',
        maxWidth: 290,
        Cell: props => {
          const { recipient } = props.original;
          return (
            <div>
              {recipient.branch && recipient.branch.value}/
              {recipient.department && recipient.department.value}/
              {recipient.position && recipient.position.value}
            </div>
          );
        },
      },
      {
        Header: formatMessage(messages.modified),
        accessor: 'modifiedAt',
        maxWidth: 125,
        Cell: props => {
          const { modifiedAt } = props.original;
          return formatDMYMS(modifiedAt);
        },
      },
    ];
    return (
      <ReactTable
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
            this.setState({ ...this.state, selectedIdx: rowInfo.index });
          },
          style: {
            background:
              rowInfo === undefined
                ? ''
                : this.state.selectedIdx === rowInfo.index
                ? 'rgba(241,250,229, 1)'
                : '',
          },
        })}
        getTheadProps={() => ({
          style: {
            background: 'rgba(227,232,238, 1)',
          },
        })}
      />
    );
  }
}

TaskListTableComponent.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
};

export default TaskListTableComponent;
